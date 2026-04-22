import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { wheelData } from "../wheelData";
import { ThemeProvider } from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import ScrollReveal from "../components/ScrollReveal";
import CursorGlow from "../components/CursorGlow";
import { RecipeCard } from "../components/RecipeCard";

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function RecipesPage() {
  return (
    <ThemeProvider>
      <CursorGlow />

      <nav className="sticky top-0 z-50 flex items-center justify-between px-[8vw] py-[18px] bg-background/95 backdrop-blur-sm border-b border-foreground/10">
        <Link to="/">
          <img src="/images/logo.png" alt="Drink with Zay" className="h-16 dark:brightness-[1.3] transition-all" />
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/degustations" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Dégustations
          </Link>
          <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            ← Les roues
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="px-[8vw] py-16">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[.12em] uppercase text-brand-pink mb-3">
            ✦ Toutes les recettes
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground leading-tight mb-4 max-w-xl">
            Explorez nos créations
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-14 max-w-lg">
            Toutes les recettes pour reproduire vos boissons préférées chez vous.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {wheelData.map((cat) => (
            <div key={cat.id}>
              <ScrollReveal>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-7 pb-3 border-b border-foreground/10">
                  {cat.emoji} {cat.title}
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((drink, i) => (
                  <RecipeCard key={drink.name} drink={drink} category={cat} delay={i * 80} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-10 px-4 text-sm text-muted-foreground">
        Made with ☕ by Zay
      </footer>
    </ThemeProvider>
  );
}

export default RecipesPage;
