import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsStrip from "./components/StatsStrip";
import Marquee from "./components/Marquee";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import Decks from "./components/Decks";
import Writing from "./components/Writing";
import Contact from "./components/Contact";

export default function App() {
  return (
    <main className="bg-[#0C0C0C] text-white">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Marquee />
      <About />
      <WhatIDo />
      <Decks />
      <Writing />
      <Contact />
    </main>
  );
}
