// download-assets.mjs
// Downloads real assets (fonts, images, videos) listed in resources.json into public/.
// Node 22 built-ins only: global fetch, fs/promises. ES module.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const RESOURCES_JSON = resolve(
  PROJECT_ROOT,
  "../../.recon/mercury/research/resources.json"
);
const PUBLIC_DIR = resolve(PROJECT_ROOT, "public");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const TIMEOUT_MS = 30_000;
const BATCH_SIZE = 4;

// Tracking-pixel / analytics domains and paths to skip.
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
];

function shouldSkip(url) {
  const lower = url.toLowerCase();
  return SKIP_PATTERNS.some((p) => lower.includes(p));
}

// Robustly parse resources.json: read text -> JSON.parse -> if still a string, parse again.
async function loadResources() {
  const text = await readFile(RESOURCES_JSON, "utf8");
  let parsed = JSON.parse(text);
  if (typeof parsed === "string") {
    parsed = JSON.parse(parsed);
  }
  return parsed;
}

// Basename of a URL path, with query string stripped.
function urlBasename(url) {
  const u = new URL(url);
  const path = u.pathname;
  let base = path.split("/").filter(Boolean).pop() || "";
  // decode percent-encoding in the basename (e.g. %5B...%5D)
  try {
    base = decodeURIComponent(base);
  } catch {
    // keep as-is if it can't be decoded
  }
  return base;
}

const KNOWN_IMG_EXTS = new Set(["jpg", "jpeg", "png", "svg", "webp", "gif", "avif"]);

// Clean an image filename from a URL: strip query, ensure a sane extension.
function imageFilename(url) {
  let base = urlBasename(url);
  // Strip any residual query just in case basename logic missed it.
  base = base.split("?")[0].split("#")[0];

  const dot = base.lastIndexOf(".");
  const ext = dot >= 0 ? base.slice(dot + 1).toLowerCase() : "";

  if (!ext || !KNOWN_IMG_EXTS.has(ext)) {
    // No usable extension -> DatoCMS serves webp.
    const stem = dot >= 0 ? base.slice(0, dot) : base;
    base = `${stem || "image"}.webp`;
  }
  return base;
}

// Clean a generic basename (videos / fonts): strip query/hash, keep as-is.
function plainFilename(url) {
  let base = urlBasename(url);
  base = base.split("?")[0].split("#")[0];
  return base;
}

// Ensure a filename is unique within a Set; add numeric suffix on collision.
function dedupe(name, used) {
  if (!used.has(name)) {
    used.add(name);
    return name;
  }
  const dot = name.lastIndexOf(".");
  const stem = dot >= 0 ? name.slice(0, dot) : name;
  const ext = dot >= 0 ? name.slice(dot) : "";
  let i = 1;
  let candidate;
  do {
    candidate = `${stem}-${i}${ext}`;
    i += 1;
  } while (used.has(candidate));
  used.add(candidate);
  return candidate;
}

async function fetchOnce(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
      redirect: "follow",
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return buf;
  } finally {
    clearTimeout(timer);
  }
}

// Fetch with one retry, then log-and-continue (returns null on total failure).
async function fetchWithRetry(url) {
  try {
    return await fetchOnce(url);
  } catch (err1) {
    console.warn(`  retry: ${url} (${err1.message})`);
    try {
      return await fetchOnce(url);
    } catch (err2) {
      console.error(`  FAILED: ${url} (${err2.message})`);
      return null;
    }
  }
}

// Run async tasks in parallel batches of BATCH_SIZE.
async function runInBatches(items, worker) {
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(worker));
  }
}

async function main() {
  const resources = await loadResources();

  const fonts = Array.isArray(resources.fonts) ? resources.fonts : [];
  const imgs = Array.isArray(resources.imgs) ? resources.imgs : [];
  const media = Array.isArray(resources.media) ? resources.media : [];

  // Build the download plan: { url, dir, publicPath, filename }.
  const usedFonts = new Set();
  const usedImages = new Set();
  const usedVideos = new Set();

  const plan = [];

  for (const url of fonts) {
    if (shouldSkip(url)) continue;
    const filename = dedupe(plainFilename(url), usedFonts);
    plan.push({
      url,
      dir: resolve(PUBLIC_DIR, "fonts"),
      filename,
      publicPath: `/fonts/${filename}`,
    });
  }

  for (const url of imgs) {
    if (shouldSkip(url)) continue;
    const filename = dedupe(imageFilename(url), usedImages);
    plan.push({
      url,
      dir: resolve(PUBLIC_DIR, "images"),
      filename,
      publicPath: `/images/${filename}`,
    });
  }

  for (const url of media) {
    if (shouldSkip(url)) continue;
    const filename = dedupe(plainFilename(url), usedVideos);
    plan.push({
      url,
      dir: resolve(PUBLIC_DIR, "videos"),
      filename,
      publicPath: `/videos/${filename}`,
    });
  }

  // Pre-create target dirs.
  await Promise.all(
    ["fonts", "images", "videos"].map((d) =>
      mkdir(resolve(PUBLIC_DIR, d), { recursive: true })
    )
  );

  const manifest = {};
  const failed = [];

  console.log(`Planned ${plan.length} downloads (after skip filter).`);

  await runInBatches(plan, async (item) => {
    const buf = await fetchWithRetry(item.url);
    if (!buf) {
      failed.push(item.url);
      return;
    }
    const outPath = resolve(item.dir, item.filename);
    await writeFile(outPath, buf);
    manifest[item.url] = item.publicPath;
    console.log(`  ok: ${item.publicPath} (${buf.length} bytes)`);
  });

  manifest.failed = failed;

  const manifestPath = resolve(PUBLIC_DIR, "asset-manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

  const ok = Object.keys(manifest).length - 1; // minus the `failed` key
  console.log(
    `\nDone. ${ok} succeeded, ${failed.length} failed. Manifest: ${manifestPath}`
  );
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exitCode = 1;
});
