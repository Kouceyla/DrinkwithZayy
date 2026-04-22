import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { wheelData } from "../wheelData";
import { ThemeProvider } from "../components/ThemeProvider";
import ScrollReveal from "../components/ScrollReveal";
import CursorGlow from "../components/CursorGlow";
import NavBar from "../components/NavBar";
import { RecipeCard } from "../components/RecipeCard";

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function RecipesPage() {
  const [query, setQuery] = useState("");

  const filtered = wheelData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <ThemeProvider>
      <CursorGlow />
      <NavBar />

      <main className="px-[8vw] py-16">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[.12em] uppercase text-brand-pink mb-3">
            ✦ Toutes les recettes
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground leading-tight mb-4 max-w-xl">
            Explorez nos créations
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-8 max-w-lg">
            Toutes les recettes pour reproduire vos boissons préférées chez vous.
          </motion.p>

          {/* Barre de recherche */}
          <motion.div variants={fadeUp} className="relative max-w-md mb-14">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une recette..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-pink/50 focus:ring-2 focus:ring-brand-pink/20 transition-all"
            />
          </motion.div>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-3xl mb-3">🔍</p>
            <p className="font-serif text-xl font-bold text-foreground mb-1">Aucun résultat</p>
            <p className="text-sm">Essaie un autre mot clé</p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {filtered.map((cat) => (
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
        )}
      </main>

      <footer className="text-center py-10 px-4 text-sm text-muted-foreground">
        Made with ☕ by Zay
      </footer>
    </ThemeProvider>
  );
}

export default RecipesPage;
