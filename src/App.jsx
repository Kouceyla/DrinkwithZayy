import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WheelCard from "./components/WheelCard";
import { wheelData } from "./wheelData"; // On sépare les données

function App() {
  return (
    <>
      <Header />
      <main className="p-4 sm:p-6 flex flex-wrap justify-center items-start gap-8">
        {/* On crée une carte pour chaque boisson dans nos données */}
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
    </>
  );
}

export default App;