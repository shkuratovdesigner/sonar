"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * "Everything you do with money. All in one place." — Mercury homepage section.
 *
 * Source of truth: docs/design-references/sections/02-everything-bento.png (index 1).
 * It is a DARK section (#171721, `dark-neutral-theme` / `bg-background-default`) with a
 * two-column, full-viewport-height layout:
 *   - Left: heading + an interactive accordion of 4 product categories (first open) + "Launch demo".
 *   - Right: a large dark demo card that bleeds off the right viewport edge, holding a floating
 *     "Accounts" product mockup, with subsequent demo screens (the flow_*.mp4 videos) peeking up
 *     from below the fold.
 *
 * The extraction tree for index 1 was shallow (the live demo content is rendered dynamically),
 * so geometry/text were taken directly from the 2× screenshot.
 */

type Tab = {
  id: string;
  title: string;
  body?: React.ReactNode;
  /** Demo visual shown on the right when this tab is active. */
  video?: string;
};

const TABS: Tab[] = [
  {
    id: "banking",
    title: "Business banking & more",
    body: (
      <>
        Apply for free checking and savings accounts with zero minimums, earn up
        to 3.60% yield with Treasury by Mercury Advisory,
        <sup className="text-[0.7em] align-super">2</sup> and access loans
        <sup className="text-[0.7em] align-super">3</sup> to help you grow.
      </>
    ),
    // "Business banking" keeps the bespoke Accounts mockup (no matching asset exists locally).
  },
  {
    id: "cards",
    title: "Cards & expense management",
    body: (
      <>
        Issue unlimited virtual and physical cards, set spend limits, and capture
        receipts automatically — no more chasing expense reports.
      </>
    ),
    video: "/videos/flow_2.mp4",
  },
  {
    id: "payments",
    title: "Payments & invoicing",
    body: (
      <>
        Send and receive payments worldwide, automate bill pay, and get paid
        faster with branded invoices and reminders.
      </>
    ),
    video: "/videos/flow_3.mp4",
  },
  {
    id: "accounting",
    title: "Accounting",
    body: (
      <>
        Sync transactions to QuickBooks and NetSuite, reconcile in a click, and
        close the books with confidence.
      </>
    ),
    video: "/videos/flow_4.mp4",
  },
];

/** Decorative circular "seal" glyph used on each account row in the mockup. */
function SealIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth={1}
    >
      <circle cx="16" cy="16" r="11.5" opacity="0.9" />
      <circle cx="16" cy="16" r="8" opacity="0.7" />
      <circle cx="16" cy="16" r="4.5" opacity="0.55" />
      <path d="M16 4.5v23M4.5 16h23M8 8l16 16M24 8L8 24" opacity="0.45" />
    </svg>
  );
}

type Account = { name: string; dollars: string; cents: string };

const ACCOUNTS: Account[] = [
  { name: "Credit Card", dollars: "$12,505", cents: "87" },
  { name: "Treasury", dollars: "$200,000", cents: "87" },
  { name: "Ops / Payroll", dollars: "$2,023,267", cents: "12" },
  { name: "AP", dollars: "$226,767", cents: "82" },
  { name: "AR", dollars: "$5,431", cents: "32" },
];

/** The floating "Accounts" product panel shown for the Business-banking tab. */
function AccountsMockup() {
  return (
    <div className="w-full rounded-2xl border border-white/[0.06] bg-[#2b2c3c]/90 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <span className="text-[15px] text-white/85">Accounts</span>
        <div className="flex items-center gap-3 text-white/70">
          <span className="flex size-7 items-center justify-center rounded-full bg-white/[0.08] text-[16px] leading-none">
            +
          </span>
          <span className="text-[18px] leading-none tracking-[0.12em]">⋮</span>
        </div>
      </div>

      {/* account rows */}
      <ul className="px-5">
        {ACCOUNTS.map((a) => (
          <li
            key={a.name}
            className="flex items-center justify-between py-[9px]"
          >
            <span className="flex items-center gap-3">
              <SealIcon className="size-[22px] text-white/75" />
              <span className="text-[14px] text-white/85">{a.name}</span>
            </span>
            <span className="text-[14px] tabular-nums text-white/85">
              {a.dollars}
              <sup className="text-[0.65em] text-white/55">.{a.cents}</sup>
            </span>
          </li>
        ))}
        <li className="flex items-center gap-3 py-[9px]">
          <span className="flex size-[22px] items-center justify-center rounded-full bg-white/[0.08] text-[11px] text-white/60">
            +4
          </span>
          <span className="text-[14px] text-white/55">View all accounts</span>
        </li>
      </ul>

      {/* footer */}
      <div className="mt-1 flex items-center justify-between border-t border-white/[0.06] px-5 py-3.5">
        <span className="flex items-center gap-2.5">
          <span className="flex h-3.5 w-6 items-center rounded-full bg-brand px-0.5">
            <span className="size-2.5 rounded-full bg-white" />
          </span>
          <span className="text-[13px] text-white/70">
            3 auto transfer rules affect your accounts
          </span>
        </span>
        <span className="flex items-center gap-0.5 text-[13px] text-white/85">
          View
          <ArrowRightIcon className="size-3 -rotate-0" />
        </span>
      </div>
    </div>
  );
}

export default function EverythingBento() {
  const [active, setActive] = useState(TABS[0].id);
  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section className="relative overflow-hidden bg-surface-dark pb-18 text-white lg:min-h-screen">
      {/* faint bottom vignette, matching the screenshot's lower gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black/30" />

      <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-y-14 px-6 py-20 md:px-10 lg:min-h-screen lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-x-16 lg:py-0">
        {/* ---------- Left column ---------- */}
        <div className="max-w-[460px]">
          <h2 className="font-display text-[28px] leading-[1.18] tracking-tight text-white md:text-[30px]">
            Everything you do with money.
            <br />
            All in one place.
          </h2>

          {/* accordion */}
          <div className="mt-12">
            {TABS.map((tab, i) => {
              const open = tab.id === active;
              return (
                <div
                  key={tab.id}
                  className={cn(
                    "border-t",
                    open ? "border-[#ededf3]" : "border-white/10",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActive(tab.id)}
                    aria-expanded={open}
                    className="group flex w-full items-start gap-3 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "mt-[7px] size-1.5 shrink-0 rounded-full transition-colors",
                        open ? "bg-[#9cb4e8]" : "bg-transparent",
                      )}
                    />
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block text-[15px] transition-colors",
                          open
                            ? "font-medium text-white"
                            : "text-white/65 group-hover:text-white/90",
                        )}
                      >
                        {tab.title}
                      </span>
                      <span
                        className={cn(
                          "grid transition-all duration-300 ease-out",
                          open
                            ? "mt-2 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-[360px] text-[15px] leading-[1.5] text-white/55">
                            {tab.body}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                  {/* close out last divider */}
                  {i === TABS.length - 1 && (
                    <div className="border-t border-white/10" />
                  )}
                </div>
              );
            })}

            <a
              href="#"
              className="mt-7 inline-block text-[15px] font-medium text-white underline decoration-white/40 underline-offset-[5px] transition-colors hover:decoration-white"
            >
              Launch demo
            </a>
          </div>
        </div>

        {/* ---------- Right demo column ---------- */}
        {/* Bleeds toward the right viewport edge on desktop, mirroring the screenshot. */}
        <div className="relative lg:-mr-10 lg:h-[640px] xl:-mr-24">
          <div className="relative h-full w-full rounded-[28px] bg-[#21212e] p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] lg:rounded-[32px] lg:p-9">
            {/* primary screen */}
            <div className="relative z-20 max-w-[440px]">
              {activeTab.video ? (
                <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20">
                  <video
                    key={activeTab.video}
                    src={activeTab.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/hero_end_frame_xl.30ad39be.jpg"
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>
              ) : (
                <AccountsMockup />
              )}
            </div>

            {/* subsequent demo screens peeking from below the fold */}
            <div className="pointer-events-none absolute inset-x-7 top-[78%] z-10 hidden gap-4 lg:flex lg:inset-x-9">
              <div className="h-48 w-[34%] overflow-hidden rounded-2xl bg-[#26273a]/70">
                <video
                  src="/videos/flow_1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/hero_end_frame_xl.30ad39be.jpg"
                  className="size-full object-cover opacity-50"
                />
              </div>
              <div className="h-48 flex-1 overflow-hidden rounded-2xl bg-[#26273a]/70">
                <video
                  src="/videos/flow_4.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/hero_end_frame_xl.30ad39be.jpg"
                  className="size-full object-cover opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
