type ProtectionCard = {
  title: string;
  body: string;
  visual: React.ReactNode;
};

/* Card 1 — "20x the usual coverage": a tall, glowing white bar (Mercury, $5M)
   towering over a short dark bar (industry standard, $250K). */
function CoverageVisual() {
  return (
    <div className="absolute inset-0 p-6">
      {/* Mercury label */}
      <div className="absolute left-6 top-6 text-[13px] leading-[1.3]">
        <div className="font-medium text-white/90">$5M</div>
        <div className="text-white/45">Mercury</div>
      </div>

      {/* Industry standard label */}
      <div className="absolute bottom-[26%] right-6 text-right text-[13px] leading-[1.3]">
        <div className="font-medium text-white/90">$250K</div>
        <div className="text-white/45">Industry standard</div>
      </div>

      {/* Tall Mercury bar */}
      <div
        className="absolute bottom-0 left-[16%] top-[24%] w-[34%] rounded-t-[20px] bg-white"
        style={{
          boxShadow:
            "0 0 60px 8px rgba(255,255,255,0.35), 0 0 120px 30px rgba(255,255,255,0.12)",
        }}
      />

      {/* Short industry bar */}
      <div className="absolute bottom-0 right-[14%] h-[8%] w-[30%] rounded-t-[12px] bg-white/15" />
    </div>
  );
}

/* Card 2 — "Next-level account security": concentric glowing rings with a
   padlock at the center. */
function SecurityVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Concentric rings */}
      <div className="absolute aspect-square w-[120%] rounded-full border border-white/[0.06]" />
      <div className="absolute aspect-square w-[88%] rounded-full border border-white/[0.08]" />
      <div
        className="absolute aspect-square w-[58%] rounded-full border border-white/10"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.10), rgba(255,255,255,0) 70%)",
        }}
      />
      {/* Lock */}
      <div
        className="relative flex h-[60px] w-[60px] items-center justify-center"
        style={{ filter: "drop-shadow(0 0 24px rgba(255,255,255,0.45))" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7 text-white"
          aria-hidden="true"
        >
          <path
            d="M7 10V7a5 5 0 0 1 10 0v3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x="4.5"
            y="10"
            width="15"
            height="10.5"
            rx="3"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

/* Card 3 — "Controls at your fingertips": three toggle pills, two off and one
   switched on (knob to the right, glowing). */
function ControlsVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-5 px-7">
      {/* Off toggle */}
      <div className="relative h-[44px] rounded-full bg-white/[0.06]">
        <div className="absolute left-[5px] top-1/2 h-[34px] w-[34px] -translate-y-1/2 rounded-full bg-white/15" />
      </div>
      {/* Off toggle */}
      <div className="relative h-[44px] rounded-full bg-white/[0.06]">
        <div className="absolute left-[5px] top-1/2 h-[34px] w-[34px] -translate-y-1/2 rounded-full bg-white/15" />
      </div>
      {/* On toggle */}
      <div
        className="relative h-[44px] rounded-full bg-white/[0.08]"
        style={{ boxShadow: "0 0 40px 4px rgba(255,255,255,0.18)" }}
      >
        <div
          className="absolute right-[5px] top-1/2 h-[34px] w-[34px] -translate-y-1/2 rounded-full bg-white"
          style={{ boxShadow: "0 0 28px 4px rgba(255,255,255,0.5)" }}
        />
      </div>
    </div>
  );
}

const CARDS: ProtectionCard[] = [
  {
    title: "20x the usual coverage",
    body: "Get up to $5M FDIC insurance through our partner banks and their sweep networks — that's 20x more than the industry standard.",
    visual: <CoverageVisual />,
  },
  {
    title: "Next-level account security",
    body: "Know your account is safe with tech-forward fraud and phishing protection, MFA verification, dark web monitoring, and more.",
    visual: <SecurityVisual />,
  },
  {
    title: "Controls at your fingertips",
    body: "Decide who can view, move, or debit funds — with approval flows, locks, and permissions that keep you fully in control.",
    visual: <ControlsVisual />,
  },
];

export default function Protection() {
  return (
    <section className="w-full bg-surface-dark text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        {/* Top divider + heading */}
        <div className="border-t border-white/10 pt-10 md:pt-14">
          <h2 className="max-w-[18ch] font-display text-[32px] font-medium leading-[1.05] tracking-tight text-white sm:text-[36px] md:text-[40px]">
            Standard protection stops short. Mercury goes further.
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-12 md:grid-cols-3">
          {CARDS.map((card) => (
            <div key={card.title} className="flex flex-col">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-surface-dark-2"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 90% at 50% 30%, rgba(255,255,255,0.05), rgba(255,255,255,0) 60%)",
                }}
              >
                {card.visual}
              </div>
              <h3 className="mt-5 text-[18px] font-medium leading-snug text-white">
                {card.title}
              </h3>
              <p className="mt-2 max-w-[36ch] text-[16px] leading-[1.5] text-[#9a9aa6]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
