import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function HeroSection({ onDiscoverClick }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-[8vw] gap-12 overflow-hidden pt-20">

      {/* Orbes ambiants */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(244,167,185,.18) 0%,transparent 70%)", animation: "orbDrift1 8s ease-in-out infinite" }} />
      <div className="absolute bottom-1/4 right-1/3 w-52 h-52 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(110,231,183,.12) 0%,transparent 70%)", animation: "orbDrift2 11s ease-in-out infinite" }} />
      <div className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{ background: "radial-gradient(ellipse 60% 80% at 70% 50%, hsl(112 33% 24% / 0.6) 0%, transparent 70%)" }} />

      {/* Texte staggeré */}
      <motion.div className="relative z-10 text-center md:text-left" initial="hidden" animate="visible" variants={stagger}>
        <motion.span variants={fadeUp}
          className="inline-flex items-center gap-2 bg-brand-pink/15 border border-brand-pink/30 rounded-full px-4 py-1.5 text-xs font-bold tracking-[.1em] uppercase text-brand-pink mb-6">
          ✦ Choisissez votre boisson
        </motion.span>
        <motion.h1 variants={fadeUp}
          className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-black leading-[1.05] text-foreground mb-5">
          Votre prochaine<br />
          <em className="italic text-brand-pink">boisson préférée</em><br />
          vous attend.
        </motion.h1>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-9 max-w-md mx-auto md:mx-0">
          Laissez le hasard choisir — matcha, café, bubble tea. Lancez la roue et découvrez votre prochaine recette.
        </motion.p>
        <motion.div variants={fadeUp} className="flex gap-3 flex-wrap items-center justify-center md:justify-start">
          <button onClick={onDiscoverClick}
            className="bg-foreground text-background rounded-full px-8 py-3.5 text-sm font-bold tracking-wide hover:bg-brand-pink hover:text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-pink/30">
            Découvrir les boissons
          </button>
          <Link to="/recettes"
            className="border border-foreground/30 text-foreground rounded-full px-7 py-3.5 text-sm font-semibold hover:border-foreground hover:bg-foreground/10 transition-all">
            Voir les recettes
          </Link>
        </motion.div>
      </motion.div>

      {/* Blob flottant + parallaxe */}
      <div className="hidden md:flex justify-center items-center relative z-10"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
        <div className="overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
          style={{ width: "min(420px,45vw)", height: "min(480px,52vw)", animation: "blobFloat 6s ease-in-out infinite, blobMorph 12s ease-in-out infinite" }}>
          <img src="/images/IceCofeeSpeculos.jpg" alt="Boisson" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Indicateur scroll */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center z-10">
        <div className="w-px h-10 overflow-hidden">
          <div className="w-px bg-foreground/40" style={{ animation: "drawLine 2s ease-in-out infinite" }} />
        </div>
      </div>

      {/* Badge pulsé */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 border border-foreground/35 rounded-full px-6 py-3 font-serif italic text-sm text-foreground/60 whitespace-nowrap z-10 backdrop-blur-sm hidden md:block"
        style={{ animation: "pulseBadge 3s ease-in-out infinite" }}>
        Naturel. Savoureux. Fait avec amour.
      </div>
    </section>
  );
}

export default HeroSection;
