import Image from "next/image";
import { cn } from "@/lib/utils";

type DeepLink = {
  label: string;
  href: string;
  img: string;
  alt: string;
};

const links: DeepLink[] = [
  {
    label: "The Display",
    href: "#display",
    img: "/images/Comp_00084.webp",
    alt: "DC-1 resting on moss, showing its paper-like display",
  },
  {
    label: "Amber Glow",
    href: "#amber-glow",
    img: "/images/product-reveal-color-portrait.webp",
    alt: "DC-1 held in two hands, glowing amber in the dark",
  },
  {
    label: "Public Benefit Co.",
    href: "#public-benefit",
    img: "/images/leaf.jpg",
    alt: "A single leaf, fine veins lit against black",
  },
  {
    label: "Order DC-1",
    href: "#order",
    img: "/images/tree-3.jpg",
    alt: "Backlit silhouette of leaves and branches",
  },
];

export default function DiveDeeper() {
  return (
    <section
      className={cn(
        "relative z-[300] bg-ink font-serif text-paper",
        "py-[clamp(5rem,11vw,10.5rem)]",
      )}
    >
      <div className="container mx-auto w-full max-w-[1167px] px-6 md:px-10">
        {/* Small three-dot mark (matches the 48×12 svg in the source, 50% opacity) */}
        <svg
          width="48"
          height="12"
          viewBox="0 0 48 12"
          fill="none"
          aria-hidden="true"
          className="opacity-50"
        >
          <circle cx="6" cy="6" r="6" fill="currentColor" />
          <circle cx="24" cy="6" r="6" fill="currentColor" />
          <circle cx="42" cy="6" r="6" fill="currentColor" />
        </svg>

        <div className="mt-[clamp(2.5rem,5vw,3.75rem)] grid gap-x-[clamp(2.5rem,5vw,3.75rem)] gap-y-[clamp(2.5rem,4vw,3.5rem)] lg:grid-cols-[max-content_auto] lg:items-start">
          {/* Heading + sub-copy */}
          <div className="flex flex-col gap-[clamp(1.5rem,2.2vw,2.25rem)] lg:max-w-[18rem]">
            <h2 className="text-balance text-[clamp(2.5rem,5.4vw,3.75rem)] font-light leading-[0.97] tracking-[-0.03em]">
              Dive deeper
              <br />
              into Daylight
            </h2>
            <p className="max-w-[17em] text-balance font-sans text-[clamp(1.05rem,1.45vw,1.3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-paper/50">
              Dive deeper into every section on the site and find what you are
              looking for.
            </p>
          </div>

          {/* 4 link cards */}
          <div className="grid max-w-full grid-cols-2 items-stretch gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex flex-col gap-3"
              >
                <span className="relative block aspect-square w-full overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 transition-colors duration-300 group-hover:ring-white/25">
                  <Image
                    src={link.img}
                    alt={link.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, 180px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  {/* hover arrow chip */}
                  <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-paper opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 9.5 9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
                <span className="font-sans text-[0.95rem] font-light leading-tight tracking-[-0.01em] text-paper/80 transition-colors duration-200 group-hover:text-paper">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
