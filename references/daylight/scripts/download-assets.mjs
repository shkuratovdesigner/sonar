// Downloads real website assets (fonts + images) into public/ for the daylight clone.
// Node 22 built-ins only: global fetch, fs/promises. ES module.
//
// Run from inside references/daylight:
//   node scripts/download-assets.mjs

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const RESOURCES_PATH = join(
  PROJECT_ROOT,
  "..",
  "..",
  ".recon",
  "daylight",
  "research",
  "resources.json"
);
const FONTS_DIR = join(PROJECT_ROOT, "public", "fonts");
const IMAGES_DIR = join(PROJECT_ROOT, "public", "images");
const MANIFEST_PATH = join(PROJECT_ROOT, "public", "asset-manifest.json");

const EXTRA_FONTS = [
  // ABC Room weight 800 — may not be in the captured resource list.
  "https://daylightcomputer.com/_next/static/media/67cf96b09cf013ed-s.woff",
];

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const SKIP_PATTERNS = [
  "reddit",
  "rp.gif",
  "doubleclick",
  "google-analytics",
  "googletagmanager",
  "gtm",
  "/pixel",
  "/collect",
  "segment",
  "analytics",
  "vercel-insights",
  "va.vercel",
];

const BATCH_SIZE = 6;
const TIMEOUT_MS = 30_000;

// ---- robust parse: read text -> JSON.parse -> if still string, parse again ----
function robustParse(text) {
  let data = JSON.parse(text);
  if (typeof data === "string") data = JSON.parse(data);
  return data;
}

function shouldSkip(url) {
  const lower = url.toLowerCase();
  return SKIP_PATTERNS.some((p) => lower.includes(p));
}

// Clean a local filename from an image URL.
function imageFilename(url) {
  // image.mux.com animated webp with no useful basename -> handled by caller (mux-<n>).
  let path;
  try {
    path = new URL(url).pathname;
  } catch {
    path = url;
  }
  let name = basename(path); // strips query implicitly via pathname
  // Strip any stray query string just in case.
  name = name.split("?")[0];
  if (!name) name = "asset";
  return name;
}

// Reserve a unique filename in a Set, adding a numeric suffix on collision.
function uniqueName(name, used) {
  if (!used.has(name)) {
    used.add(name);
    return name;
  }
  const dot = name.lastIndexOf(".");
  const stem = dot === -1 ? name : name.slice(0, dot);
  const ext = dot === -1 ? "" : name.slice(dot);
  let i = 1;
  let candidate;
  do {
    candidate = `${stem}-${i}${ext}`;
    i++;
  } while (used.has(candidate));
  used.add(candidate);
  return candidate;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    return buf;
  } finally {
    clearTimeout(timer);
  }
}

// Download one asset (with one retry). Returns { ok, url, localPath?, bytes?, error? }.
async function downloadOne({ url, destDir, localName, publicPath }) {
  const destPath = join(destDir, localName);
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const buf = await fetchWithTimeout(url);
      await writeFile(destPath, buf);
      return { ok: true, url, localPath: publicPath, bytes: buf.length };
    } catch (err) {
      if (attempt === 0) {
        // brief pause before single retry
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }
      console.error(`FAIL  ${url}  -> ${err.message}`);
      return { ok: false, url, error: err.message };
    }
  }
}

async function runBatches(jobs) {
  const results = [];
  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE);
    const settled = await Promise.all(batch.map(downloadOne));
    for (const r of settled) {
      if (r.ok) console.log(`OK    ${r.localPath}  (${r.bytes} bytes)`);
      results.push(r);
    }
  }
  return results;
}

async function main() {
  await mkdir(FONTS_DIR, { recursive: true });
  await mkdir(IMAGES_DIR, { recursive: true });

  const text = await readFile(RESOURCES_PATH, "utf8");
  const data = robustParse(text);

  const fonts = Array.isArray(data.fonts) ? data.fonts : [];
  const imgs = Array.isArray(data.imgs) ? data.imgs : [];

  const manifest = {};
  const jobs = [];

  // ---- FONTS ----
  const fontNames = new Set();
  const fontUrls = [...new Set([...fonts, ...EXTRA_FONTS])];
  for (const url of fontUrls) {
    if (shouldSkip(url)) continue;
    let name;
    try {
      name = basename(new URL(url).pathname).split("?")[0];
    } catch {
      name = basename(url).split("?")[0];
    }
    if (!name) name = "font.woff";
    const localName = uniqueName(name, fontNames);
    jobs.push({
      url,
      destDir: FONTS_DIR,
      localName,
      publicPath: `/fonts/${localName}`,
    });
  }

  // ---- IMAGES ----
  const imageNames = new Set();
  let muxCounter = 0;
  const seenImgUrls = new Set();
  for (const url of imgs) {
    if (shouldSkip(url)) continue;
    if (seenImgUrls.has(url)) continue;
    seenImgUrls.add(url);

    let localName;
    if (url.includes("image.mux.com") && url.includes("animated.webp")) {
      muxCounter += 1;
      localName = uniqueName(`mux-${muxCounter}.webp`, imageNames);
    } else {
      localName = uniqueName(imageFilename(url), imageNames);
    }
    jobs.push({
      url,
      destDir: IMAGES_DIR,
      localName,
      publicPath: `/images/${localName}`,
    });
  }

  console.log(
    `Queued ${jobs.length} downloads (${fontUrls.length} font urls, ${imgs.length} image urls before skip/dedupe).`
  );

  const results = await runBatches(jobs);

  const failed = [];
  for (const r of results) {
    if (r.ok) manifest[r.url] = r.localPath;
    else failed.push(r.url);
  }

  const out = { ...manifest, failed };
  await writeFile(MANIFEST_PATH, JSON.stringify(out, null, 2));

  const okCount = results.filter((r) => r.ok).length;
  console.log(
    `\nDone. ${okCount} ok, ${failed.length} failed. Manifest -> public/asset-manifest.json`
  );
  if (failed.length) console.log("Failed URLs:\n" + failed.join("\n"));
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
