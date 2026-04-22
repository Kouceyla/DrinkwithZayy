import React from "react";
import { useFavorites } from "../context/FavoritesContext";

/**
 * variant="overlay" — posé sur une image (fond sombre semi-transparent)
 * variant="card"    — posé sur un fond de carte (fond subtil)
 */
export function FavoriteButton({ name, className = "", variant = "overlay" }) {
  const { favorites, toggle } = useFavorites();
  const active = favorites.has(name);

  const base =
    "w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110 active:scale-95";

  const styles = {
    overlay: active
      ? "bg-brand-pink/25 border-brand-pink/70 shadow-md shadow-brand-pink/25"
      : "bg-black/35 border-white/25 backdrop-blur-sm hover:bg-brand-pink/15 hover:border-brand-pink/50",
    card: active
      ? "bg-brand-pink/15 border-brand-pink/50"
      : "bg-foreground/8 border-border/40 hover:bg-brand-pink/10 hover:border-brand-pink/40",
  };

  const iconStyles = {
    overlay: active ? "text-brand-pink" : "text-white/90",
    card:    active ? "text-brand-pink" : "text-muted-foreground hover:text-brand-pink",
  };

  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggle(name); }}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={`${base} ${styles[variant]} ${className}`}
    >
      <span className={`text-base leading-none transition-colors duration-200 ${iconStyles[variant]}`}>
        {active ? "★" : "☆"}
      </span>
    </button>
  );
}
