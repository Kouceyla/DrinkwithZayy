import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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
          <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top,hsl(var(--background)) 0%,transparent 100%)" }} />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <p className="text-xs font-bold uppercase tracking-[.1em] text-brand-pink mb-1">
            {category.emoji} {category.title}
          </p>
          <h3 className="font-serif text-xl font-black text-foreground mb-4 leading-tight">
            {drink.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed recipe-text">
            {drink.recipe}
          </p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
