import LenisProvider from "@/components/LenisProvider";
import ScrollReveal from "@/components/ScrollReveal";
import DaylightNav from "@/components/DaylightNav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import PaperDisplay from "@/components/PaperDisplay";
import AmberGlow from "@/components/AmberGlow";
import DiveDeeper from "@/components/DiveDeeper";
import Testimonials from "@/components/Testimonials";
import PublicBenefit from "@/components/PublicBenefit";
import Glance from "@/components/Glance";
import OrderFooter from "@/components/OrderFooter";

export default function Home() {
  return (
    <LenisProvider>
      <ScrollReveal />
      <DaylightNav />
      <main>
        <Hero />
        <Manifesto />
        <PaperDisplay />
        <AmberGlow />
        <DiveDeeper />
        <Testimonials />
        <PublicBenefit />
        <Glance />
        <OrderFooter />
      </main>
    </LenisProvider>
  );
}
