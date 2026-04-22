import React, { createContext, useCallback, useContext, useState } from "react";

const KEY = "dzw-favorites";
const Ctx = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(KEY)) ?? []);
    } catch {
      return new Set();
    }
  });

  const toggle = useCallback((name) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      localStorage.setItem(KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ favorites, toggle }}>{children}</Ctx.Provider>;
}

export const useFavorites = () => useContext(Ctx);
