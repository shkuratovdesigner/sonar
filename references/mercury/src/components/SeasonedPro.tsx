import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Section index 8 — "Run your business like a seasoned pro".
 * Dark section (#171721) with a top divider, a left-aligned display heading,
 * and a 2×2 grid of feature cards. Two cards are photographs (Total visibility,
 * Guidance); two are light-tinted UI mockups with a circular play affordance
 * (Automations, Team management). Stacks to a single column on mobile.
 */

const CARD_TINT = "#d7e5ec"; // light blue-gray plate behind the UI mockups

/** Small circular "play demo" button shown on the interactive mockup cards. */
function PlayButton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full border border-[#c5d4dc] bg-[#e6eef3]/80 backdrop-blur-sm",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="#2c2c3a">
        <path d="M8 5.5v13l11-6.5L8 5.5Z" />
      </svg>
    </div>
  );
}

/** Dark rounded-square glyph used as the leading icon on automation rows. */
function DiamondGlyph() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#2c2c3a]">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ffffff">
        <path d="M12 3.5 20.5 12 12 20.5 3.5 12 12 3.5Z" />
      </svg>
    </span>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#70707d]" fill="none">
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Wrapper that renders the 3:2 visual plate for a feature, then its caption. */
function Feature({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="relative w-full overflow-hidden rounded-2xl">
        {/* Fixed 3:2 box matches the captured card proportions (≈496×330). */}
        <div className="relative aspect-[3/2] w-full">{children}</div>
      </div>
      <div className="pt-5">
        <h3 className="text-[17px] font-medium leading-[1.4] text-white">
          {title}
        </h3>
        <p className="mt-1 max-w-[420px] text-[15px] leading-[1.5] text-muted-ink">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SeasonedPro() {
  return (
    <section className="w-full bg-surface-dark">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="border-t border-line-dark pt-6 pb-24 md:pb-28">
          <h2 className="font-display text-[2rem] font-normal leading-[1.12] tracking-tight text-white">
            Run your business like a seasoned pro
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-12 md:grid-cols-2">
            {/* 1 — Total visibility (photograph) */}
            <Feature
              title="Total visibility"
              description="Get a clear view of all available funds and money in and out, in one snapshot."
            >
              <Image
                src="/images/1764098544-2025_fem_homepage-total-visibility_3x2.webp"
                alt="A snapshot of available funds across accounts"
                fill
                sizes="(max-width: 768px) 100vw, 496px"
                className="object-cover"
              />
            </Feature>

            {/* 2 — Automations (UI mockup) */}
            <Feature
              title="Automations"
              description="Reduce busywork with automated transfers, approval flows, and AI-powered transaction categorization."
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: CARD_TINT }}
              >
                <div className="relative h-full w-full px-6 pt-7">
                  {/* Source account pill */}
                  <div className="inline-flex flex-col rounded-2xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
                    <span className="text-[15px] font-semibold text-[#1e1e2a]">
                      &lsquo;Ops / Payroll&rsquo;
                    </span>
                    <span className="mt-0.5 text-[13px] text-[#70707d]">
                      $2,023,267.12
                    </span>
                  </div>

                  {/* Connector + automation rules */}
                  <div className="relative mt-3 pl-7">
                    <span
                      className="absolute top-0 left-2.5 h-[calc(100%-28px)] w-px bg-[#cdd9e0]"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
                        <DiamondGlyph />
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-[14px] font-medium text-[#1e1e2a]">
                            Restore the balance of &lsquo;AP&rsquo; to $100,000
                          </span>
                          <span className="text-[12px] text-[#70707d]">
                            Next transfer: Tomorrow
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
                        <DiamondGlyph />
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-[14px] font-medium text-[#1e1e2a]">
                            Move all from &lsquo;AR&rsquo; to &lsquo;Ops /
                            Payroll&rsquo;
                          </span>
                          <span className="text-[12px] text-[#70707d]">
                            After each transaction
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <PlayButton className="absolute bottom-5 left-6" />
                </div>
              </div>
            </Feature>

            {/* 3 — Team management (UI mockup) */}
            <Feature
              title="Team management"
              description="Curb team spend with card limits, spend controls, and granular user permissions."
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: CARD_TINT }}
              >
                {/* Member detail panel, offset toward the bottom-right corner */}
                <div className="absolute top-9 right-0 bottom-0 left-16 overflow-hidden rounded-tl-2xl bg-white px-6 pt-6 shadow-[0_10px_30px_rgba(16,24,40,0.12)]">
                  <p className="text-[19px] font-medium text-[#1e1e2a]">
                    Amanda Huynh
                  </p>

                  <p className="mt-5 text-[12px] text-[#70707d]">Role</p>
                  <div className="mt-1.5 flex items-center justify-between rounded-lg border border-[#e4e6ee] px-3 py-2">
                    <span className="text-[14px] text-[#1e1e2a]">Admin</span>
                    <ChevronDown />
                  </div>

                  <p className="mt-5 text-[12px] text-[#70707d]">
                    Amanda will be able to
                  </p>
                  <ul className="mt-2.5 flex flex-col gap-2.5 text-[14px]">
                    <li className="flex items-center gap-2 text-[#1e1e2a]">
                      <CheckMark active /> Move money
                    </li>
                    <li className="flex items-center gap-2 text-[#1e1e2a]">
                      <CheckMark active /> View account balances and transactions
                    </li>
                    <li className="flex items-center gap-2 text-[#9a9aa6]">
                      <CheckMark /> Add team members and edit roles
                    </li>
                    <li className="flex items-center gap-2 text-[#c2c2cc]">
                      <CheckMark /> Manage security settings
                    </li>
                  </ul>
                </div>

                <PlayButton className="absolute bottom-5 left-6" />
              </div>
            </Feature>

            {/* 4 — Guidance (photograph) */}
            <Feature
              title="Guidance"
              description="Chat support for all customers, plus dedicated account management for those who qualify."
            >
              <Image
                src="/images/1764018322-2025_fem_homepage-guidance_3x2.webp"
                alt="Concentric rings representing always-on guidance"
                fill
                sizes="(max-width: 768px) 100vw, 496px"
                className="object-cover"
              />
            </Feature>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Checklist tick — indigo when the permission is granted, muted dot otherwise. */
function CheckMark({ active = false }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#5266eb]" fill="none">
        <path
          d="m3 8.5 3 3 7-7"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />;
}
