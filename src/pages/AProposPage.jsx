import React from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "../components/ThemeProvider";
import CursorGlow from "../components/CursorGlow";
import NavBar from "../components/NavBar";

const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function AProposPage() {
  return (
    <ThemeProvider>
      <CursorGlow />
      <NavBar />

      <main className="px-[8vw] py-20 max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col gap-8">

          <motion.div variants={fadeUp}>
            <p className="text-xs font-bold tracking-[.12em] uppercase text-brand-pink mb-3">
              ✦ À propos
            </p>
            <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-black text-foreground leading-tight">
              Pourquoi ce site ?
            </h1>
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
            Tout a commencé par une obsession simple : trouver le matcha latte parfait. Puis le café caramel idéal. Puis le bubble tea qui change tout. Et avant même de m'en rendre compte, j'avais un carnet de notes rempli de coffee shops, de ratios, d'impressions et de notes sur dix.
          </motion.p>

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
            Ce site, c'est ma façon de partager cette passion — tester des boissons, que ce soit dans un coffee shop découvert au hasard d'une balade ou dans ma propre cuisine un dimanche matin. J'aime autant l'expérience d'un endroit bien pensé que le plaisir de reproduire une recette chez moi et de la peaufiner jusqu'à ce qu'elle soit exactement comme je la veux.
          </motion.p>

          <motion.div variants={fadeUp} className="rounded-2xl bg-brand-pink/10 border border-brand-pink/20 p-7 flex flex-col gap-3">
            <p className="font-serif text-2xl font-black text-foreground">Barista à mes heures perdues ☕</p>
            <p className="text-muted-foreground leading-relaxed">
              J'ai appris à me faire mes propres lattes, à maîtriser la mousse de lait, à doser le sirop au millilitre près. Ce que j'aime dans le fait de préparer soi-même ses boissons, c'est qu'on devient exigeante — et qu'on ne peut plus jamais accepter quelque chose de médiocre sans le remarquer.
            </p>
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
            Drink with Zay, c'est donc à la fois un journal de dégustation, une collection de recettes que j'adore, et une petite roue du destin pour les jours où on ne sait pas quoi commander. C'est personnel, c'est honnête — et les notes sont vraies, même quand elles font mal.
          </motion.p>

          <motion.p variants={fadeUp} className="font-serif text-xl font-bold text-foreground">
            Bonne dégustation 🍵
          </motion.p>

        </motion.div>
      </main>

      <footer className="text-center py-10 px-4 text-sm text-muted-foreground">
        Made with ☕ by Zay
      </footer>
    </ThemeProvider>
  );
}

export default AProposPage;
