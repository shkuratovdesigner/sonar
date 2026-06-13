import { MercuryLogo } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Footer — section index 99 (label FOOTER).
 *
 * Light, multi-column sitemap footer. The eight link columns, their headings,
 * and every label are taken verbatim from the section extraction
 * (docs/research/sections-extract.json, index 99). On desktop the columns sit
 * in a multi-column grid (4-up, wrapping to two rows — mirroring the real
 * 4 × 223px / 80×40 gap layout); the grid steps down to 3-up on tablet and
 * stacks to 2-up then a single column on mobile.
 *
 * The Mercury wordmark sits top-left; the FDIC / banking-services legal
 * disclaimer is the small-print block at the very bottom, kept verbatim to
 * Mercury's standard footer copy.
 */

type FooterColumn = {
  heading: string;
  links: string[];
};

const COLUMNS: FooterColumn[] = [
  {
    heading: "Banking",
    links: [
      "Business Checking & Savings",
      "Treasury",
      "Business Credit Cards",
      "Working Capital Loans",
      "Venture Debt",
      "Personal Banking",
    ],
  },
  {
    heading: "Platform",
    links: ["Pricing", "Switch to Mercury", "Security", "API", "Perks"],
  },
  {
    heading: "Resources",
    links: [
      "Help Center",
      "Meridian",
      "Blog",
      "Tools",
      "Events",
      "Business Formation Resources",
      "Peak Season",
      "Product Releases",
    ],
  },
  {
    heading: "Finance Ops",
    links: [
      "Financial Workflows",
      "Payments",
      "Bill Pay",
      "Invoicing",
      "Expense Management",
      "Accounting Automations",
      "SAFEs",
    ],
  },
  {
    heading: "Solutions",
    links: [
      "Ecommerce",
      "Agencies, Consultants & Firms",
      "SaaS",
      "VC Funds",
      "Crypto",
      "LLCs",
      "Life Science",
      "Accounting Firms",
      "Climate",
      "Real Estate & Construction",
      "Healthcare Services",
    ],
  },
  {
    heading: "Account",
    links: ["Open Account", "Log In", "iOS", "Android"],
  },
  {
    heading: "About",
    links: [
      "How Mercury Works",
      "Our Story",
      "Careers",
      "Partnerships",
      "Contact",
      "Legal",
      "Privacy Policy",
    ],
  },
  {
    heading: "Follow Us",
    links: ["X", "LinkedIn", "YouTube", "Instagram", "TikTok"],
  },
];

function FooterLinkColumn({ heading, links }: FooterColumn) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[15px] leading-[1.4] font-medium text-white/90">
        {heading}
      </span>
      <ul className="flex flex-col gap-3">
        {links.map((label) => (
          <li key={label}>
            <a
              href="#"
              className={cn(
                "inline-block text-[15px] leading-[1.2] text-white/60",
                "underline decoration-transparent underline-offset-4 transition-colors",
                "hover:text-white hover:decoration-current",
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-surface-dark text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-16 pb-12 md:px-10 md:pt-20 md:pb-16">
        {/* Wordmark */}
        <MercuryLogo className="h-7 w-auto text-white" />

        {/* Link columns */}
        <nav
          aria-label="Footer"
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-16"
        >
          {COLUMNS.map((column) => (
            <FooterLinkColumn key={column.heading} {...column} />
          ))}
        </nav>

        {/* Legal / disclaimers */}
        <div className="mt-16 border-t border-white/10 pt-8 md:mt-20 md:pt-10">
          <div className="flex flex-col gap-4 text-[12px] leading-[1.6] text-white/40">
            <p>
              Mercury is a financial technology company, not a bank. Banking
              services provided through Choice Financial Group, Column N.A., and
              Evolve Bank &amp; Trust, Members FDIC. Deposit insurance covers the
              failure of an insured bank.
            </p>
            <p>
              The Mercury Mastercard&reg; IO Card and Mercury Mastercard&reg;
              Debit Card are issued by Choice Financial Group and Evolve Bank
              &amp; Trust, Members FDIC, pursuant to a license from Mastercard.
            </p>
            <p>
              Working capital loans are provided by Mercury Lending, LLC (NMLS ID
              2606284). Venture debt is provided through Mercury&apos;s lending
              partners and is subject to credit approval. Mercury Treasury and
              Mercury Personal are offered through Mercury Advisory, LLC, an
              SEC-registered investment adviser. Registration does not imply a
              certain level of skill or training.
            </p>
            <p>
              Mercury Treasury invests in mutual funds and U.S. Treasuries.
              Investments in money market funds and U.S. Treasuries are not
              insured by the FDIC, are not deposits or other obligations of, or
              guaranteed by, any bank, and may lose value.
            </p>
            <p className="pt-2">
              &copy; {new Date().getFullYear()} Mercury Technologies, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
