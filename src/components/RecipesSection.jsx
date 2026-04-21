import React from "react";
import { wheelData } from "../wheelData";

function RecipeCard({ drink, category }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border/20 shadow-md flex flex-col">
      <div className="h-52 bg-secondary relative overflow-hidden">
        <img
          src={drink.image}
          alt={drink.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-bold uppercase tracking-[.1em] text-brand-pink mb-1">
          {category.emoji} {category.title}
        </p>
        <h4 className="font-serif text-lg font-black text-foreground mb-3 leading-tight">
          {drink.name}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed recipe-text">
          {drink.recipe}
        </p>
      </div>
    </div>
  );
}

function RecipesSection() {
  return (
    <section id="recettes" className="px-[8vw] py-20 border-t border-foreground/10">
      <p className="text-xs font-bold tracking-[.12em] uppercase text-brand-pink mb-3">
        ✦ Toutes les recettes
      </p>
      <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-black text-foreground leading-tight mb-12 max-w-lg">
        Explorez nos créations
      </h2>

      <div className="flex flex-col gap-14">
        {wheelData.map((cat) => (
          <div key={cat.id}>
            <h3 className="font-serif text-xl font-bold text-foreground mb-6 pb-3 border-b border-foreground/10">
              {cat.emoji} {cat.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.map((drink) => (
                <RecipeCard key={drink.name} drink={drink} category={cat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecipesSection;
