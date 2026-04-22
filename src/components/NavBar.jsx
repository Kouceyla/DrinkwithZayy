import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/",             label: "Accueil",       exact: true },
  { to: "/recettes",     label: "Recettes" },
  { to: "/degustations", label: "Dégustations" },
  { to: "/a-propos",     label: "À propos" },
];

function NavBar({ sticky = false }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!sticky) return;
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [sticky]);

  const base = sticky
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-foreground/10"
          : "bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
      }`
    : "sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10";

  return (
    <nav className={`${base} flex items-center justify-between px-[8vw] py-[14px]`}>
      <NavLink to="/">
        <img
          src="/images/logo.png"
          alt="Drink with Zay"
          className="h-14 dark:brightness-[1.3] transition-all"
        />
      </NavLink>

      <div className="flex items-center gap-1.5">
        {links.map(({ to, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-brand-pink/20 text-brand-pink-dark dark:text-brand-pink border border-brand-pink/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/8"
              }`
            }
          >
            {label}
          </NavLink>
        ))}

        <div className="ml-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
