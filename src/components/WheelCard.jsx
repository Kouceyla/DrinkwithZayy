import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Emoji } from 'react-emoji-render';

function WheelCard({ id, title, emoji, items, colors }) {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef(null);

  useEffect(() => {
    // Logique du dégradé (inchangée)
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
    setResult("");

    toast.info(`La roue "${title}" tourne...`);

    const itemCount = items.length;
    const anglePerItem = 360 / itemCount;
    const randomIndex = Math.floor(Math.random() * itemCount);
    const spins = 10;
    const targetAngle = randomIndex * anglePerItem;
    const randomOffset = (Math.random() - 0.5) * (anglePerItem * 0.8);
    
    const newTotalRotation = rotation + (spins * 360 + targetAngle + randomOffset);
    
    // Debug: Vérifier la nouvelle valeur de rotation
    // console.log("Nouvelle rotation:", newTotalRotation);
    
    setRotation(newTotalRotation);

    setTimeout(() => {
      const selectedItem = items[randomIndex];
      setResult(selectedItem);
      setShowResult(true);
      setIsSpinning(false);
      
      toast.success(selectedItem, {
        description: "C'est votre boisson !",
      });
    }, 8000); // 8000ms = Durée de l'animation
  };

  const share = () => {
    // Logique de partage (inchangée)
    if (!result || result.trim() === "") {
        console.error("Tentative de partage sans résultat valide.");
        toast.error("Erreur", { description: "Aucun résultat à partager." });
        return;
    }
    const text = `Je viens de tirer "${result}" sur Drink with Zay ! 🍹`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      // className (inchangé)
      className="card select-none bg-card/80 dark:bg-card/60 backdrop-blur-lg border border-border/20 shadow-lg dark:shadow-primary/10 rounded-2xl p-6 w-full max-w-sm text-center overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* h2 (inchangé) */}
      <h2 className="text-3xl font-bold mb-4 text-foreground">
        {emoji} {title}
      </h2>
      {/* div .roulette (inchangé) */}
      <div className="roulette relative w-52 h-52 mx-auto my-4 rounded-full overflow-hidden shadow-inner border border-border/10">
        <div
          ref={wheelRef}
          // --- MODIFICATION ICI ---
          // Classes de transition supprimées
          className="wheel w-full h-full rounded-full" 
          aria-label={`Roulette ${title}`}
          role="region"
          // Style inline ajouté pour contrôler la rotation ET la transition
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 8000ms cubic-bezier(0.15, 0.85, 0.4, 1)' // Propriété CSS transition ajoutée ici
          }}
          // --- FIN MODIFICATION ---
        ></div>
      </div>
      {/* button Lancer (inchangé) */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-8 rounded-lg text-lg mt-4 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 dark:focus:ring-offset-background"
      >
        {isSpinning ? "Ça tourne..." : "Lancer"}
      </button>
      
      {/* div bouton Partager (inchangé) */}
      <div className="h-20 mt-4 flex flex-col justify-center items-center">
        <button
          onClick={share}
          className={`share-button mt-2 text-sm text-pink-600 dark:text-pink-400 hover:underline ${
            showResult ? "visible" : "" 
          }`}
        >
          Partager ↗
        </button>
      </div>
    </motion.section>
  );
}

export default WheelCard;