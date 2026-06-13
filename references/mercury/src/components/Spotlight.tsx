import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Spotlight — section index 11 ("Mercury in the spotlight").
 *
 * Dark section (matches the screenshot + PAGE_TOPOLOGY: dark bg, white text):
 * a top divider line under the section title, then a row of three press cards.
 * Each card carries a publication wordmark image (3:2) over a headline and a
 * "Read more" link affordance — Fortune, WSJ, Fast Company, left to right.
 *
 * Layout mirrors the extraction (index 11): content ~1013px wide centered,
 * header padded 72px top with a 24px gap below its border, cards row margin-top
 * 40px, three cards each bg #1e1e2a, rounded-xl (12px), 32px padding, 32px gap.
 *
 * Press images come from public/asset-manifest.json (filenames containing
 * in-the-press-fortune / -wsj / -fast-co), 1320x880 = 3:2.
 */

type PressCard = {
  src: string;
  alt: string;
  publication: string;
  headline: string;
  href: string;
};

const CARDS: PressCard[] = [
  {
    src: "/images/1764097598-2025_fem_homepage_in-the-press-fortune_3x2.webp",
    alt: "Fortune",
    publication: "Fortune",
    headline:
      "$650M in annual revenue and profitability make Mercury a fintech to watch",
    href: "https://fortune.com/",
  },
  {
    src: "/images/1764097626-2025_fem_homepage_in-the-press-wsj_3x2-webp.webp",
    alt: "The Wall Street Journal",
    publication: "The Wall Street Journal",
    headline: "Mercury lands $300M Series C at a $3.5B valuation",
    href: "https://www.wsj.com/",
  },
  {
    src: "/images/1764097664-2025_fem_homepage_in-the-press-fast-co_3x2-webp.webp",
    alt: "Fast Company",
    publication: "Fast Company",
    headline: "Fast Company's Most Innovative Companies of 2025",
    href: "https://www.fastcompany.com/",
  },
];

function Card({ card }: { card: PressCard }) {
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${card.publication}: ${card.headline}`}
      className={cn(
        "group flex w-full flex-col gap-8 rounded-xl bg-ink p-8",
        "transition-colors duration-200 hover:bg-ink-soft",
      )}
    >
      {/* Publication wordmark image (3:2). Its own dark background matches the
          card surface so the plate reads as one continuous panel. */}
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={card.src}
          alt={card.alt}
          width={1320}
          height={880}
          sizes="(max-width: 640px) 100vw, 320px"
          className="h-auto w-full"
        />
      </div>

      {/* Text block: headline pinned to the top, link affordance to the bottom. */}
      <div className="flex flex-1 flex-col justify-between gap-8">
        <h3 className="font-display text-[21px] font-medium leading-[1.2] tracking-tight text-white text-balance md:text-[22px]">
          {card.headline}
        </h3>

        <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#ededf3]">
          Read more
          <ArrowUpRightIcon
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </a>
  );
}

export default function Spotlight() {
  return (
    <section className="w-full bg-surface-dark text-white">
      <div className="mx-auto w-full max-w-[1040px] px-6 pt-16 pb-20 md:px-10 md:pt-[72px] md:pb-28">
        {/* Header: divider line, then the section title. */}
        <div className="border-t border-line-dark pt-6">
          <h2 className="font-display text-[30px] font-medium leading-[1.1] tracking-tight text-white md:text-[34px]">
            Mercury in the spotlight
          </h2>
        </div>

        {/* Press cards row — three across on desktop, stacked on mobile. */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {CARDS.map((card) => (
            <Card key={card.publication} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
