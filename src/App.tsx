import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DeckPage from "./pages/DeckPage";
import NotFound from "./pages/NotFound";
import { useReveals } from "./lib/reveal";
import { metaForPath } from "./routes";

function ClientEffects() {
  const { pathname, hash } = useLocation();
  useReveals();
  useEffect(() => {
    document.title = metaForPath(pathname).title;
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ClientEffects />
      <Nav />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/:slug" element={<DeckPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
