import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import DrinkCarousel from "./components/DrinkCarousel";
import ScrollReveal from "./components/ScrollReveal";
import CursorGlow from "./components/CursorGlow";
import { wheelData } from "./wheelData";
import { ThemeProvider } from "./components/ThemeProvider";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Toaster } from "@/components/ui/sonner";
import DrinkModal from "./components/DrinkModal";
import RecipesPage from "./pages/RecipesPage";
import DegustationsPage from "./pages/DegustationsPage";
import AProposPage from "./pages/AProposPage";

function HomePage() {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrinkSelected = (drink) => { setModalData(drink); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <CursorGlow />
      <Header />
      <HeroSection
        onDiscoverClick={() => document.getElementById("roues")?.scrollIntoView({ behavior: "smooth" })}
      />

      <section id="roues" className="px-4 md:px-[8vw] pt-12 md:pt-16 pb-16 md:pb-20">
        <ScrollReveal>
          <p className="text-xs font-bold tracking-[.12em] uppercase text-brand-pink mb-3">✦ Nos catégories</p>
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-black text-foreground leading-tight mb-12 max-w-lg">
            Quelle sera votre boisson du jour ?
          </h2>
        </ScrollReveal>
        <div className="flex flex-col gap-20">
          {wheelData.map((data, i) => (
            <ScrollReveal key={data.id} delay={i * 100}>
              <DrinkCarousel
                id={data.id}
                title={data.title}
                emoji={data.emoji}
                items={data.items}
                onDrinkSelected={handleDrinkSelected}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
      <Toaster richColors closeButton sound />
      <DrinkModal data={modalData} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recettes" element={<RecipesPage />} />
          <Route path="/degustations" element={<DegustationsPage />} />
          <Route path="/a-propos" element={<AProposPage />} />
        </Routes>
      </ThemeProvider>
    </FavoritesProvider>
  );
}

export default App;
