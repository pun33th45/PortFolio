import Navigation     from "@/components/Navigation";
import Hero           from "@/components/Hero";
import About          from "@/components/About";
import AIFocus        from "@/components/AIFocus";
import Projects       from "@/components/Projects";
import Skills         from "@/components/Skills";
import Experience     from "@/components/Experience";
import Contact        from "@/components/Contact";
import Quote          from "@/components/Quote";
import ScrollProgress  from "@/components/ScrollProgress";
import PremiumCursor   from "@/components/PremiumCursor";
import ParticleNetwork from "@/components/ParticleNetwork";
import LoadingScreen   from "@/components/LoadingScreen";
import SectionDivider  from "@/components/SectionDivider";

export default function Home() {
  return (
    <main style={{ background:"#05050A" }} className="min-h-screen relative overflow-x-hidden">
      <LoadingScreen />
      <ScrollProgress />
      <PremiumCursor />
      <ParticleNetwork />
      <Navigation />
      <Hero />
      <SectionDivider variant="cyan" />
      <About />
      <SectionDivider variant="purple" />
      <AIFocus />
      <SectionDivider variant="blue" />
      <Projects />
      <SectionDivider variant="purple" />
      <Skills />
      <SectionDivider variant="cyan" />
      <Experience />
      <SectionDivider variant="blue" />
      <Contact />
      <SectionDivider variant="purple" />
      <Quote />
    </main>
  );
}
