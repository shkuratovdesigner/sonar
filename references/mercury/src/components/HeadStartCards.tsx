import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Section 04 — "Head Start" feature cards.
 * Dark section (#171721) with a left-aligned Arcadia Display headline above a
 * thin top rule, followed by a 2×2 grid of feature cards. Each card shows a
 * product mockup (3:2) on top, then a bold title, then a muted-light paragraph.
 * Two mockups (virtual-cards, invoicing) use the real local assets; the other
 * two ("Bill" + "Uploading") are faithfully recreated in markup because the
 * source images are not present in the local asset manifest.
 */

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M12 3.5c.4 3.4 1.6 4.6 5 5-3.4.4-4.6 1.6-5 5-.4-3.4-1.6-4.6-5-5 3.4-.4 4.6-1.6 5-5Z"
      fill="#8a7fe0"
    />
    <path
      d="M18.5 14.5c.2 1.5.7 2 2.2 2.2-1.5.2-2 .7-2.2 2.2-.2-1.5-.7-2-2.2-2.2 1.5-.2 2-.7 2.2-2.2Z"
      fill="#8a7fe0"
    />
  </svg>
);

/** Frame shared by every card image so real images and recreated mockups match. */
function MockupFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[3/2] w-full overflow-hidden rounded-2xl",
        "transition-transform duration-300 ease-out group-hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Floating white pill used inside the "Bill" mockup. */
function BillPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2",
        "text-[13px] font-medium text-[#33333d] shadow-[0_8px_24px_rgba(40,40,60,0.16)]",
        className,
      )}
    >
      <SparkleIcon className="size-3.5 shrink-0" />
      <span className="whitespace-nowrap">{children}</span>
    </div>
  );
}

function BillMockup() {
  return (
    <MockupFrame className="bg-[radial-gradient(120%_120%_at_50%_-10%,#f0eff0_0%,#e9e8e6_55%,#e6e6e9_100%)]">
      {/* Invoice document */}
      <div className="absolute inset-x-[14%] top-[16%] bottom-0 rounded-t-xl bg-[#faf9f7] px-6 pt-6 shadow-[0_12px_40px_rgba(40,40,60,0.10)]">
        <div className="flex items-start justify-between">
          <span className="font-display text-3xl leading-none text-[#9a9aa6]">
            Bill
          </span>
          <div className="space-y-0.5 text-right text-[8px] leading-tight text-[#b7b7c0]">
            <p className="text-[#9a9aa6]">Banca Cosmic</p>
            <p>1495 Sierra View St</p>
            <p>San Francisco, CA 94105</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-[8px] text-[#b7b7c0]">
          <span>Bill to</span>
          <span>Ship to</span>
          <span>Details</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-3 text-[8px] leading-relaxed text-[#cfcfd6]">
          <span>Barbara Black</span>
          <span>850 Mission St, Floor 4</span>
          <span>
            Invoice #<br />
            PO<br />
            Billed<br />
            Due
          </span>
        </div>

        <div className="mt-5 h-px w-full bg-[#ededf0]" />
        <div className="mt-3 grid grid-cols-4 gap-2 text-[8px] text-[#cfcfd6]">
          <span>QTY</span>
          <span>Description</span>
          <span>Price/Unit</span>
          <span className="text-right">Amount</span>
        </div>
      </div>

      {/* Floating annotation pills */}
      <BillPill className="left-[6%] top-[42%]">Landon Green</BillPill>
      <BillPill className="right-[5%] top-[27%]">CC-4307</BillPill>
      <BillPill className="bottom-[10%] right-[7%]">$4,874.75</BillPill>
    </MockupFrame>
  );
}

function UploadingMockup() {
  return (
    <MockupFrame className="bg-[radial-gradient(130%_120%_at_92%_50%,#d8d3ec_0%,#e7e6ea_42%,#eceae6_100%)]">
      {/* Upload progress pill */}
      <div className="absolute inset-x-[7%] top-1/2 flex -translate-y-1/2 items-center gap-3 rounded-full bg-white px-6 py-4 shadow-[0_16px_40px_rgba(40,40,60,0.14)]">
        <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-[3px] w-[1.5px] rounded-full bg-[#5266eb]"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-6px)`,
                opacity: 0.35 + (i / 8) * 0.65,
              }}
            />
          ))}
        </span>
        <span className="text-[17px] font-medium text-[#1e1e2a]">Uploading</span>
        <span className="text-[17px] font-medium text-[#9a9aa6]">1/3</span>
      </div>

      {/* Play control */}
      <span className="absolute bottom-[8%] left-[6%] flex size-7 items-center justify-center rounded-full bg-white/90 shadow-[0_4px_12px_rgba(40,40,60,0.12)]">
        <svg viewBox="0 0 24 24" className="size-3 translate-x-px fill-[#1e1e2a]">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </MockupFrame>
  );
}

type Card = {
  title: string;
  body: string;
  media: ReactNode;
};

const cards: Card[] = [
  {
    title: "Create cards in a couple of clicks",
    body: "Instantly spin up as many virtual cards as you need. Create cards for any purpose — ad spend, contractors, you name it.",
    media: (
      <MockupFrame>
        <Image
          src="/images/1764181747-2025_fem_homepage-virtual-cards_3x2.webp"
          alt="A virtual debit card labeled Active, Software, mastercard"
          fill
          sizes="(max-width: 768px) 100vw, 496px"
          className="object-cover"
        />
      </MockupFrame>
    ),
  },
  {
    title: "Watch bills pay themselves",
    body: "AI reads bills, populates details automatically, and remembers past recipients — so you can approve and pay in seconds.",
    media: <BillMockup />,
  },
  {
    title: "Get paid without a patchwork of tools",
    body: "Send manual and automatic invoices, accept flexible payment methods, and manage customer details right from your Mercury account.",
    media: (
      <MockupFrame>
        <Image
          src="/images/1764016774-2025_fem_homepage-invoicing_3x2.webp"
          alt="An invoicing form with invoice date, due date, and a repeat-invoice toggle"
          fill
          sizes="(max-width: 768px) 100vw, 496px"
          className="object-cover"
        />
      </MockupFrame>
    ),
  },
  {
    title: "Reconcile receipts without the runaround",
    body: "Email or upload receipts and we'll auto-attach them to the right card transaction. You don't lift a finger.",
    media: <UploadingMockup />,
  },
];

export default function HeadStartCards() {
  return (
    <section className="bg-surface-dark text-white">
      <div className="mx-auto w-full max-w-[1024px] px-6 pt-16 pb-20 md:px-8 md:pt-20 md:pb-28">
        {/* Heading with top rule */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="max-w-[20ch] font-display text-[28px] leading-[1.15] tracking-tight text-white md:text-[32px]">
            Banking&rsquo;s been a headache. Now, it&rsquo;s a head start.
          </h2>
        </div>

        {/* 2×2 feature grid */}
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {cards.map((card) => (
            <article key={card.title} className="group">
              {card.media}
              <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">
                {card.title}
              </h3>
              <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.55] text-white/65">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
