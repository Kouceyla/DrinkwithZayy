import React from "react";
import { useFavorites } from "../context/FavoritesContext";

export function FavoriteButton({ name, className = "" }) {
  const { favorites, toggle } = useFavorites();
  const active = favorites.has(name);

  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggle(name); }}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={`transition-all duration-200 hover:scale-125 active:scale-95 ${className}`}
    >
      <span className={`text-lg leading-none ${active ? "text-brand-pink" : "text-foreground/25 hover:text-brand-pink/50"}`}>
        {active ? "⭐" : "☆"}
      </span>
    </button>
  );
}
