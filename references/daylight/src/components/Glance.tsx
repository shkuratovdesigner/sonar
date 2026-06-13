import { cn } from "@/lib/utils";

type Spec = {
  label: string;
  icon: React.ReactNode;
};

/* Thin-stroke, paper-colored line icons recreated in markup
   (the source uses inline SVGs that aren't available as local assets). */
const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-full w-full",
};

const specs: Spec[] = [
  {
    label: "Fast, paper-like display",
    icon: (
      <svg {...ICON_PROPS} aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
        <path d="M7 8h10M7 12h10M7 16h6" />
      </svg>
    ),
  },
  {
    label: "Read, write, take notes",
    icon: (
      <svg {...ICON_PROPS} aria-hidden="true">
        <path d="M15.5 4.5l4 4-9.5 9.5-4.8 1 1-4.8z" />
        <path d="M13.5 6.5l4 4" />
      </svg>
    ),
  },
  {
    label: "Use all your apps",
    icon: (
      <svg {...ICON_PROPS} aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Sunlight readable",
    icon: (
      <svg {...ICON_PROPS} aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8" />
      </svg>
    ),
  },
  {
    label: "Blue-light free backlight",
    icon: (
      <svg {...ICON_PROPS} aria-hidden="true">
        <path d="M20 13.5A7.5 7.5 0 1 1 11 4.2a6 6 0 0 0 9 9.3z" />
      </svg>
    ),
  },
];

export default function Glance() {
  return (
    <section className="relative z-[300] bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 text-center md:px-10 lg:py-36">
        {/* Eyebrow heading with the inline DC-1 product pill */}
        <h3 className="flex items-center justify-center gap-2 font-extended text-base font-medium uppercase tracking-wide md:text-lg">
          <span className="inline-flex items-center rounded-[4px] bg-paper px-[9px] pb-[3px] pt-[5px] text-[15px] font-bold leading-none tracking-wide text-ink md:text-[18px]">
            DC-1
          </span>
          <span>at a glance</span>
        </h3>

        {/* Spec row: 5 across on desktop, 3-up on tablet, 2-up on mobile */}
        <div
          className={cn(
            "mx-auto mt-12 flex flex-wrap justify-center gap-x-6 gap-y-8",
            "max-lg:max-w-[30rem] lg:w-full lg:gap-9",
          )}
        >
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="shrink-0 px-1 py-2 max-sm:basis-1/2 max-lg:basis-1/3 max-lg:w-full lg:flex-1"
            >
              <div className="mx-auto h-8 w-8 text-paper/85">{spec.icon}</div>
              <p className="mt-3 text-balance text-[17px] leading-snug tracking-tight text-paper/70 md:text-lg">
                {spec.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
