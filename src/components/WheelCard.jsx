import React, { useState, useRef, useEffect } from "react";

function WheelCard({ id, title, emoji, items, colors }) {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef(null); // Référence pour la roue elle-même

  // Appliquer le fond en dégradé une seule fois au montage
  useEffect(() => {
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
  }, [items, colors]); // Se redéclenche si les items ou couleurs changent

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false); // Cacher l'ancien résultat

    const itemCount = items.length;
    const anglePerItem = 360 / itemCount;
    const randomIndex = Math.floor(Math.random() * itemCount);
    const spins = 6;
    const targetAngle = randomIndex * anglePerItem;
    const randomOffset = (Math.random() - 0.5) * (anglePerItem * 0.8);
    
    // On ajoute la nouvelle rotation à l'ancienne (important!)
    const newTotalRotation = rotation + (spins * 360 + targetAngle + randomOffset);

    setRotation(newTotalRotation);

    setTimeout(() => {
      setResult(items[randomIndex]);
      setShowResult(true);
      setIsSpinning(false);
    }, 4000); // 4000ms = durée de l'animation CSS
  };

  const share = () => {
    if (!result) return;
    const text = `Je viens de tirer "${result}" sur Drink with Zay ! 🍹`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <section className="card bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 shadow-xl rounded-2xl p-6 w-full max-w-sm text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <h2 className="text-3xl font-bold mb-4 text-gray-700 dark:text-gray-100">
        {emoji} {title}
      </h2>
      <div className="roulette relative w-52 h-52 mx-auto my-4 rounded-full overflow-hidden shadow-inner">
        <div
          ref={wheelRef}
          className="wheel w-full h-full rounded-full transition-transform duration-[4000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
          aria-label={`Roulette ${title}`}
          role="region"
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
      </div>
      <button
        onClick={spin}
        disabled={isSpinning}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-lg mt-4 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? "Bonne chance..." : "Lancer"}
      </button>
      <div className="h-20 mt-4 flex flex-col justify-center items-center">
        <div
          className={`result-anim font-semibold text-xl text-pink-700 dark:text-pink-300 ${
            showResult ? "visible" : ""
          }`}
          aria-live="polite"
        >
          {result}
        </div>
        <button
          onClick={share}
          className={`share-button mt-2 text-sm text-pink-600 dark:text-pink-400 hover:underline ${
            showResult ? "visible" : ""
          }`}
        >
          Partager ↗
        </button>
      </div>
    </section>
  );
}

export default WheelCard;