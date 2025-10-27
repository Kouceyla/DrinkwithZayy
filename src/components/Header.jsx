import React from "react";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="relative text-center p-6 sm:p-10">
      <ThemeToggle />
      <img
        src="/images/logo.png" // Vite trouve ça dans /public/images/logo.png
        alt="Drink with Zay Logo"
        className="max-w-xs sm:max-w-md mx-auto mb-4 dark:brightness-150 transition-all"
      />
      <h1 className="sr-only">Drink with Zay - Choisissez votre boisson</h1>
    </header>
  );
}

export default Header;