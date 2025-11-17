// src/App.jsx

import React, { useState } from "react"; // 1. Importer useState
import Header from "./components/Header";
import Footer from "./components/Footer";
import WheelCard from "./components/WheelCard";
import { wheelData } from "./wheelData";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import DrinkModal from "./components/DrinkModal"; // 2. Importer la modale

function App() {
  // 3. Ajouter les états pour la modale
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. Créer la fonction qui sera appelée par WheelCard
  const handleDrinkSelected = (drink) => {
    setModalData(drink);
    setIsModalOpen(true);
  };

  // 5. Créer la fonction pour fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
    // On peut laisser modalData tel quel, il sera remplacé à la prochaine ouverture
  };

  return (
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
            // 6. Passer la nouvelle fonction en prop
            onDrinkSelected={handleDrinkSelected} 
          />
        ))}
      </main>
      <Footer />
      <Toaster richColors closeButton sound />

      {/* 7. Afficher la modale */}
      <DrinkModal 
        data={modalData} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </ThemeProvider>
  );
}

export default App;