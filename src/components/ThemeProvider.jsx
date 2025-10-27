import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Ce composant est nécessaire pour que `sonner` et `shadcn`
// connaissent le thème actuel.
export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="drinkwithzay-theme" // Clé de sauvegarde
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}