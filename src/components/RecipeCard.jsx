import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { FavoriteButton } from "./FavoriteButton";

const DIFFICULTY = { 1: "⭐ Facile", 2: "⭐⭐ Moyen", 3: "⭐⭐⭐ Expert" };
const VARIANT_ICON = { Chaud: "🔥", Glacé: "🧊" };

export function RecipeCard({ drink, category, delay = 0 }) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl overflow-hidden bg-card border border-border/20 shadow-md flex flex-col group h-full"
      >
        <div className="h-72 bg-background relative overflow-hidden flex items-center justify-center">
          <img
            src={drink.image}
            alt={drink.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 p-4"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <div className="absolute inset-x-0 bottom-0 h-16"
            style={{ background: "linear-gradient(to top,hsl(var(--card)) 0%,transparent 100%)" }} />
          <FavoriteButton name={drink.name} className="absolute top-3 right-3 z-10" />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-brand-pink">
              {category.emoji} {category.title}
            </p>
            <span className="text-foreground/20">·</span>
            <span className="text-xs text-muted-foreground">⏱ {drink.prepTime} min</span>
            <span className="text-foreground/20">·</span>
            <span className="text-xs text-muted-foreground">{DIFFICULTY[drink.difficulty]}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-black text-foreground leading-tight">
              {drink.name}
            </h3>
            <div className="flex gap-1 ml-2 flex-shrink-0">
              {drink.variants?.map((v) => (
                <span key={v} className="text-sm" title={v}>{VARIANT_ICON[v]}</span>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed recipe-text">
            {drink.recipe}
          </p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
