import React, { useState } from "react";
import { motion } from "framer-motion";
import { wheelData } from "../wheelData";
import { ThemeProvider } from "../components/ThemeProvider";
import NavBar from "../components/NavBar";
import ScrollReveal from "../components/ScrollReveal";
import CursorGlow from "../components/CursorGlow";
import { RecipeCard } from "../components/RecipeCard";
import { useFavorites } from "../context/FavoritesContext";

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function RecipesPage() {
  const [query, setQuery]       = useState("");
  const [showFavs, setShowFavs] = useState(false);
  const { favorites }           = useFavorites();

  const filtered = wheelData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) &&
        (!showFavs || favorites.has(d.name))
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <ThemeProvider>
      <CursorGlow />
      <NavBar />

      <main className="px-4 md:px-[8vw] py-12 md:py-16">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[.12em] uppercase text-brand-pink mb-3">
            ✦ Toutes les recettes
          </motion.p>
          <motion.h1 variants={fadeUp}
            className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-black text-foreground leading-tight mb-4 max-w-xl">
            Explorez nos créations
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg">
            Toutes les recettes pour reproduire vos boissons préférées chez vous.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-12">
            <input
              type="search" placeholder="Rechercher une boisson…" value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-card border border-border/30 rounded-full px-5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-pink/50 transition-colors"
            />
            <button
              onClick={() => setShowFavs((v) => !v)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${
                showFavs
                  ? "bg-brand-pink text-white shadow-lg shadow-brand-pink/30"
                  : "bg-card border border-border/30 text-muted-foreground hover:border-brand-pink/40"
              }`}
            >
              ⭐ Mes favoris {showFavs && favorites.size > 0 && `(${favorites.size})`}
            </button>
          </motion.div>
        </motion.div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20 font-serif italic text-lg">
            Aucune boisson trouvée…
          </p>
        ) : (
          <div className="flex flex-col gap-12 md:gap-16">
            {filtered.map((cat) => (
              <div key={cat.id}>
                <ScrollReveal>
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6 pb-3 border-b border-foreground/10">
                    {cat.emoji} {cat.title}
                  </h2>
                </ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {cat.items.map((drink, i) => (
                    <RecipeCard key={drink.name} drink={drink} category={cat} delay={i * 80} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-8 md:py-10 px-4 text-sm text-muted-foreground">
        Made with ☕ by Zay
      </footer>
    </ThemeProvider>
  );
}

export default RecipesPage;
