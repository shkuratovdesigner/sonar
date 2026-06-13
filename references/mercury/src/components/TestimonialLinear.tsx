/**
 * TestimonialLinear — section index 5.
 *
 * Dark, short section: one large centered pull-quote in Arcadia Display,
 * with the attribution (name + role) stacked beneath it. Background is
 * `bg-surface-dark` (#171721), matching the surrounding dark band.
 *
 * The quote and role render in a muted light tone (~#c3c3cc) while the
 * person's name is the brightest (#ededf3), per the screenshot. The opening
 * and closing curly quotes hug the text and there is a superscript footnote
 * marker after "banking", exactly as in the original.
 *
 * NOTE: section index 5 in sections-extract.json contains no <img> (the
 * captured section is text-only, 338px tall), and the screenshot shows no
 * photo/logo, so none is rendered here. The customer portrait that exists in
 * the asset manifest belongs to a different block of the page.
 */

export default function TestimonialLinear() {
  return (
    <section className="w-full bg-surface-dark">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="flex flex-col items-center pt-24 pb-24 md:pt-28 md:pb-28">
          <figure className="flex max-w-[840px] flex-col items-center text-center">
            <blockquote className="font-display text-[26px] leading-[1.22] font-normal tracking-tight text-balance text-[#c3c3cc] sm:text-[27px] md:text-[28px]">
              <span aria-hidden="true">&ldquo;</span>Mercury has completely
              changed my expectations of what banking
              <sup className="ml-[0.04em] text-[0.55em]">1</sup>{" "}
              should do. The vision and craft is so far beyond what traditional
              banking can provide.<span aria-hidden="true">&rdquo;</span>
            </blockquote>

            <figcaption className="mt-9 md:mt-10">
              <div className="text-[18px] leading-[1.3] font-medium text-[#ededf3] md:text-[20px]">
                Paul Copplestone
              </div>
              <div className="mt-1 text-[16px] leading-[1.4] font-normal text-[#c3c3cc] md:text-[17px]">
                Founder and CEO, Supabase
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
