// src/components/WheelCard.jsx

import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Emoji } from 'react-emoji-render';

// 1. Accepter la nouvelle prop `onDrinkSelected`
function WheelCard({ id, title, emoji, items, colors, onDrinkSelected }) {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null); // Initialiser à null
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef(null);

  useEffect(() => {
    // ... (logique du dégradé inchangée)
    if (!wheelRef.current) return;
    const count = items.length;
    const step = 100 / count;
    let gradient = "conic-gradient(";
    for (let i = 0; i < count; i++) {
      const color = colors[i % colors.length];
      gradient += `${color} ${i * step}% ${(i + 1) * step}%, `;
    }
    gradient = gradient.slice(0, -2) + ")";
    wheelRef.current.style.background = gradient;
  }, [items, colors]);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);
    setResult(null);

    toast.info(`La roue "${title}" tourne...`);

    const itemCount = items.length;
    const anglePerItem = 360 / itemCount;
    const randomIndex = Math.floor(Math.random() * itemCount);
    const spins = 10;
    const targetAngle = randomIndex * anglePerItem;
    const randomOffset = (Math.random() - 0.5) * (anglePerItem * 0.8);
    
    const newTotalRotation = rotation + (spins * 360 + targetAngle + randomOffset);
    
    setRotation(newTotalRotation);

    setTimeout(() => {
      const selectedItem = items[randomIndex]; // C'est maintenant un OBJET
      setResult(selectedItem);
      setShowResult(true);
      setIsSpinning(false);
      
      // 2. Modifier le toast pour utiliser `selectedItem.name`
      toast.success(selectedItem.name, {
        description: "C'est votre boisson !",
      });

      // 3. Appeler la fonction du parent pour ouvrir la modale !
      if (onDrinkSelected) {
        onDrinkSelected(selectedItem);
      }

    }, 8000); // 8000ms = Durée de l'animation
  };

  const share = () => {
    // 4. Mettre à jour la logique de partage
    if (!result || !result.name) {
        console.error("Tentative de partage sans résultat valide.");
        toast.error("Erreur", { description: "Aucun résultat à partager." });
        return;
    }
    // Utiliser `result.name`
    const text = `Je viens de tirer "${result.name}" sur Drink with Zay ! 🍹`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const cardVariants = {
    // ... (inchangé)
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="card select-none bg-card/80 dark:bg-card/60 backdrop-blur-lg border border-border/20 shadow-lg dark:shadow-primary/10 rounded-2xl p-6 w-full max-w-sm text-center overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* ... (h2 inchangé) */}
      <h2 className="text-3xl font-bold mb-4 text-foreground">
        {emoji} {title}
      </h2>
      {/* ... (div .roulette inchangée) */}
      <div className="roulette relative w-52 h-52 mx-auto my-4 rounded-full overflow-hidden shadow-inner border border-border/10">
        <div
          ref={wheelRef}
          className="wheel w-full h-full rounded-full" 
          aria-label={`Roulette ${title}`}
          role="region"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 8000ms cubic-bezier(0.15, 0.85, 0.4, 1)'
          }}
        ></div>
      </div>
      {/* ... (button Lancer inchangé) */}
      <div className="flex gap-2 mt-4 w-full">
        <button
          onClick={spin}
          disabled={isSpinning}
          className="flex-1 bg-gradient-to-r from-brand-pink to-brand-pink-dark text-white font-bold py-3.5 px-8 rounded-xl text-base cursor-pointer transition-all hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-pink/30 disabled:opacity-45 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none select-none focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-offset-2 dark:focus:ring-offset-background"
        >
          {isSpinning ? "En cours..." : "Lancer ✦"}
        </button>
        <button
          onClick={share}
          className={`share-button w-12 h-12 flex items-center justify-center rounded-xl bg-foreground/8 border border-foreground/15 text-foreground hover:bg-foreground/15 transition-all ${
            showResult ? "visible" : ""
          }`}
          title="Partager"
        >
          ↗
        </button>
      </div>
    </motion.section>
  );
}

export default WheelCard;