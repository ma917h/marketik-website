import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Service from "@/components/Service";
import Works from "@/components/Works";
import Company from "@/components/Company";
import Team from "@/components/Team";
import Recruit from "@/components/Recruit";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Film Grain overlay */}
      <div className="film-grain" aria-hidden="true" />

      <Nav />
      <Hero />
      <Stats />
      <Service />
      <Works />
      <Company />
      <Team />
      <Recruit />
      <Contact />
      <Footer />
    </>
  );
}
