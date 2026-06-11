import Hero from "./components/Hero";
import StatsStrip from "./components/StatsStrip";
import BehindTheDecks from "./components/BehindTheDecks";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import Decks from "./components/Decks";
import Writing from "./components/Writing";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import FilmGrain from "./components/FilmGrain";

export default function App() {
  return (
    <main className="p-3 text-white sm:p-5">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0C0C0C] sm:rounded-[2.5rem]">
        <Hero />
        <StatsStrip />
        <BehindTheDecks />
        <About />
        <WhatIDo />
        <Decks />
        <Writing />
        <Contact />
      </div>
      <FilmGrain />
      <CustomCursor />
    </main>
  );
}
