import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[8vw] py-[18px] transition-all duration-300 ${
      scrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-foreground/10"
        : "bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
    }`}>
      <img
        src="/images/logo.png"
        alt="Drink with Zay"
        className="h-16 dark:brightness-[1.3] transition-all"
      />
      <div className="flex items-center gap-5">
        <Link to="/recettes" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
          Recettes
        </Link>
        <Link to="/degustations" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
          Dégustations
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Header;
