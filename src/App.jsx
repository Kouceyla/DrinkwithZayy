import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WheelCard from "./components/WheelCard";
import { wheelData } from "./wheelData";
import { ThemeProvider } from "./components/ThemeProvider"; // 1. Importer le Provider
import { Toaster } from "@/components/ui/sonner"; // 2. Importer le Toaster

function App() {
  return (
    // 3. Entourer l'application avec le Provider
    <ThemeProvider>
      <Header />
      <main className="p-4 sm:p-6 flex flex-wrap justify-center items-start gap-8">
        {wheelData.map((data) => (
          <WheelCard
            key={data.id}
            id={data.id}
            title={data.title}
            emoji={data.emoji}
            items={data.items}
            colors={data.colors}
          />
        ))}
      </main>
      <Footer />
      {/* 4. Ajouter le Toaster pour que les notifications s'affichent */}
      <Toaster richColors closeButton sound />
    </ThemeProvider>
  );
}

export default App;