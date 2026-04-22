import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/",             label: "Accueil",       exact: true },
  { to: "/recettes",     label: "Recettes" },
  { to: "/degustations", label: "Dégustations" },
  { to: "/a-propos",     label: "À propos" },
];

function NavBar({ sticky = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!sticky) return;
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [sticky]);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const bar = sticky
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-foreground/10"
          : "bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
      }`
    : "sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10";

  const linkCls = ({ isActive }) =>
    `px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-brand-pink/20 text-brand-pink-dark dark:text-brand-pink border border-brand-pink/30"
        : "text-muted-foreground hover:text-foreground hover:bg-foreground/8"
    }`;

  const mobileLinkCls = ({ isActive }) =>
    `px-4 py-3 rounded-xl text-base font-semibold transition-all ${
      isActive
        ? "bg-brand-pink/15 text-brand-pink border border-brand-pink/20"
        : "text-muted-foreground hover:text-foreground hover:bg-foreground/8"
    }`;

  return (
    <nav className={bar}>
      <div className="flex items-center justify-between px-4 md:px-[8vw] py-[14px]">
        <NavLink to="/" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="Drink with Zay"
            className="h-11 md:h-14 dark:brightness-[1.3] transition-all" />
        </NavLink>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1.5">
          {links.map(({ to, label, exact }) => (
            <NavLink key={to} to={to} end={exact} className={linkCls}>{label}</NavLink>
          ))}
          <div className="ml-2"><ThemeToggle /></div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setOpen((v) => !v)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-foreground/8 border border-foreground/15 text-foreground transition-all hover:bg-foreground/15"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-background/98 backdrop-blur-md border-b border-foreground/10">
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(({ to, label, exact }) => (
                <NavLink key={to} to={to} end={exact}
                  onClick={() => setOpen(false)} className={mobileLinkCls}>
                  {label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavBar;
