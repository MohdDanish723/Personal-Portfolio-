import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import CodeSample from "@/components/sections/CodeSample";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import Certificates from "@/components/sections/Certificates";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <CodeSample />
      <Projects />
      <Journey />
      <Certificates />
      <Process />
      <FAQ />
      <Contact />
    </>
  );
}
