import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EverythingBento from "@/components/EverythingBento";
import SocialProof from "@/components/SocialProof";
import Industries from "@/components/Industries";
import HeadStartCards from "@/components/HeadStartCards";
import TestimonialLinear from "@/components/TestimonialLinear";
import GetStarted from "@/components/GetStarted";
import FeesYield from "@/components/FeesYield";
import SeasonedPro from "@/components/SeasonedPro";
import TestOfTime from "@/components/TestOfTime";
import Protection from "@/components/Protection";
import Spotlight from "@/components/Spotlight";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <EverythingBento />
        <SocialProof />
        <Industries />
        <HeadStartCards />
        <TestimonialLinear />
        <GetStarted />
        <FeesYield />
        <SeasonedPro />
        <TestOfTime />
        <Protection />
        <Spotlight />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
