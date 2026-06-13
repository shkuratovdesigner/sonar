import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * OrderFooter — section index 12 (DARK).
 * Final order CTA (large flared-serif "Order now", amber pill, ship line, price,
 * a person holding the glowing DC-1) sitting above the site footer
 * (wordmark + link columns + "© 2026 • Daylight").
 *
 * Reconstructed from docs/research/sections-extract.json (index 12) + design refs.
 * Note: the original prefooter image (`prefooter-product.3c9ccd98.jpg`) is not in the
 * local manifest — using `product-reveal-color.webp` (a person holding the amber-glow
 * DC-1 on a near-white bg, which is exactly what `mix-blend-screen` over `bg-ink` wants).
 */

const linkCol1: { label: string; href: string }[] = [
  { label: "Shop", href: "#" },
  { label: "Kids", href: "#" },
  { label: "Accessories", href: "#" },
];

const linkCol2: { label: string; href: string }[] = [
  { label: "Our Mission", href: "#" },
  { label: "Reviews", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
];

const linkCol3: { label: string; href: string }[] = [
  { label: "Support", href: "#" },
  { label: "Warranty", href: "#" },
  { label: "Shipping & Returns", href: "#" },
  { label: "Contact Us", href: "#" },
];

const socialLinks: { label: string; href: string }[] = [
  { label: "Instagram", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "YouTube", href: "#" },
];

const legalLinks: { label: string; href: string }[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

function DaylightWordmark({ className }: { className?: string }) {
  // Recreation of the Daylight wordmark (ABC Arizona Flare flared serif, lowercase).
  return (
    <span
      className={cn(
        "font-serif lowercase leading-none text-paper select-none",
        className,
      )}
      style={{ fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.04em" }}
      aria-label="Daylight"
    >
      daylight
    </span>
  );
}

export default function OrderFooter() {
  return (
    <footer className="flex items-end bg-ink text-paper pb-8">
      <div className="flex w-full flex-col gap-20 lg:gap-28">
        {/* ---------- Order CTA ---------- */}
        <section className="relative font-serif text-paper">
          {/* person holding the glowing DC-1 — full-bleed, blends into the dark */}
          <Image
            src="/images/product-reveal-color.webp"
            alt="a person holding the product"
            width={1920}
            height={1080}
            priority={false}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[70%_0%] mix-blend-screen md:object-right"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-between gap-9 px-6 pt-16 pb-9 md:px-10 md:pt-[72px]">
            <div className="relative z-10 w-full">
              <h2
                className="font-serif font-light text-paper"
                style={{
                  fontSize: "clamp(56px, 6.4vw, 92px)",
                  lineHeight: "0.97",
                  letterSpacing: "-0.07em",
                }}
              >
                Order now
              </h2>

              <div className="mt-7 flex flex-col gap-5 font-sans sm:flex-row sm:items-center sm:gap-7">
                <a
                  href="#"
                  className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-amber px-6 font-medium tracking-normal text-ink transition-opacity hover:opacity-90"
                >
                  Order now
                </a>
                <span
                  className="font-sans text-base font-light tracking-normal text-paper/80"
                  style={{ letterSpacing: "0" }}
                >
                  Ships within 3-5 business days
                </span>
              </div>

              <p className="mt-6 font-sans text-lg font-light tracking-normal text-paper/70">
                <span className="text-paper">$729</span>
                <span className="mx-2 text-paper/40">·</span>
                Free shipping
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Footer ---------- */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-x-9 gap-y-14 px-6 pb-9 font-sans md:px-10 xl:flex-row">
          {/* left: wordmark + legal/social */}
          <div className="flex w-full flex-1 flex-col justify-between gap-y-8">
            <DaylightWordmark />

            <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 text-[12px] leading-tight tracking-normal text-paper opacity-70 xl:max-w-max">
              <span>© 2026 • Daylight</span>
              {legalLinks.map((l) => (
                <a key={l.label} href={l.href} className="hover:opacity-70">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* right: link columns */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 text-base font-light tracking-normal text-paper md:grid-cols-5 xl:max-w-[max(700px,37vw)]">
            <FooterColumn title="Products" links={linkCol1} />
            <FooterColumn
              title="Company"
              links={linkCol2}
              className="md:col-span-2"
            />
            <FooterColumn
              title="Help"
              links={linkCol3}
              className="text-cream md:col-span-2 md:max-xl:text-right"
              dim
            />
            <FooterColumn
              title="Follow"
              links={socialLinks}
              className="col-[1/3] md:col-[1/6]"
              row
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
  dim = false,
  row = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
  dim?: boolean;
  row?: boolean;
}) {
  return (
    <div className={cn(dim && "text-paper/50", className)}>
      <p className="font-extended text-xs uppercase tracking-wide text-paper/40">
        {title}
      </p>
      <ul
        className={cn(
          "mt-4 flex gap-3",
          row ? "flex-row flex-wrap gap-x-6" : "flex-col",
        )}
      >
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="transition-opacity hover:opacity-60"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
