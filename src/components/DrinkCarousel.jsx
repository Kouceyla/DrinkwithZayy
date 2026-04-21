import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const PALETTES = {
  matcha: ["linear-gradient(145deg,#1a3d2b,#2d6a4f)","linear-gradient(145deg,#1b4332,#40916c)","linear-gradient(145deg,#081c15,#1b4332)"],
  cafe:   ["linear-gradient(145deg,#3d1f0a,#7c4f27)","linear-gradient(145deg,#5c2d0e,#a0522d)","linear-gradient(145deg,#2d1307,#6b3a1f)"],
  bubble: ["linear-gradient(145deg,#4a0030,#c9184a)","linear-gradient(145deg,#590d22,#ff4d6d)","linear-gradient(145deg,#370617,#9d0208)"],
};

const Arrow = ({ side, onClick, disabled }) => (
  <button disabled={disabled} onClick={onClick}
    className={`absolute ${side === "l" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-foreground/10 border border-foreground/20 text-foreground flex items-center justify-center hover:bg-foreground/[.22] transition-all disabled:opacity-30`}>
    {side === "l" ? "‹" : "›"}
  </button>
);

function DrinkCarousel({ id, title, emoji, items, onDrinkSelected }) {
  const pals = PALETTES[id] ?? PALETTES.cafe;
  const n = items.length;
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [settled, setSettled] = useState(false);

  const go = (idx, d = 1) => { if (!spinning) { setDir(d); setCur(((idx % n) + n) % n); } };

  const spin = () => {
    if (spinning) return;
    setSpinning(true); setSettled(false);
    toast.info(`La roue "${title}" tourne...`);
    const total = 8 + Math.floor(Math.random() * 5);
    let elapsed = 0, c = cur;
    Array.from({ length: total }, (_, i) => 80 + (i / total) ** 2 * 400).forEach((d, i) => {
      elapsed += d;
      setTimeout(() => {
        c = (c + 1) % n; setCur(c);
        if (i === total - 1) {
          setSpinning(false); setSettled(true);
          toast.success(items[c].name, { description: "C'est votre boisson !" });
          onDrinkSelected?.(items[c]);
        }
      }, elapsed);
    });
  };

  const slots = [(cur - 1 + n) % n, cur, (cur + 1) % n];

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between pb-3 border-b border-foreground/10 mb-7">
        <span className="font-serif text-xl font-bold text-foreground">{emoji} {title}</span>
        <span className="text-sm text-muted-foreground">
          <span className="text-foreground font-bold">{String(cur + 1).padStart(2, "0")}</span>
          /{String(n).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex items-center justify-center h-[340px] overflow-hidden">
        <Arrow side="l" onClick={() => go(cur - 1, -1)} disabled={spinning} />
        <div className="flex items-center justify-center gap-4 w-full px-12">
          {slots.map((idx, pos) => {
            const center = pos === 1;
            return (
              <motion.div key={center ? `c-${cur}` : `${pos}-${idx}`}
                className="relative flex-shrink-0 rounded-[20px] overflow-hidden cursor-pointer"
                style={{ background: pals[idx % pals.length], zIndex: center ? 3 : 2 }}
                initial={center ? { x: dir * 80, opacity: 0.3 } : false}
                animate={{ x: 0, width: center ? 240 : 170, height: center ? 300 : 220, opacity: center ? 1 : 0.55 }}
                transition={{ duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
                onClick={() => { if (pos === 0) go(cur - 1, -1); if (pos === 2) go(cur + 1, 1); }}>
                <img src={items[idx].image} alt={items[idx].name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }} />
                <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: center ? "4rem" : "2.5rem", opacity: 0.25 }}>{emoji}</div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 50%)" }} />
                {center && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
                    <div className="absolute top-0 bottom-0 w-1/3" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)", animation: "shimmer 3.5s ease-in-out infinite" }} />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <span className="font-serif font-bold text-white leading-tight" style={{ fontSize: center ? "1.1875rem" : ".875rem" }}>{items[idx].name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        <Arrow side="r" onClick={() => go(cur + 1, 1)} disabled={spinning} />
      </div>

      <div className="flex justify-center gap-1.5 mt-5">
        {items.map((_, i) => (
          <button key={i} className="h-1 rounded-full transition-all" onClick={() => go(i, i > cur ? 1 : -1)}
            style={{ width: i === cur ? 24 : 8, background: i === cur ? "#f4a7b9" : "rgba(242,234,216,0.25)" }} />
        ))}
      </div>

      <div className="flex gap-2.5 items-center mt-5">
        <button onClick={spin} disabled={spinning}
          className="btn-shimmer flex-1 bg-gradient-to-r from-brand-pink to-brand-pink-dark text-white rounded-xl py-3.5 text-[0.9375rem] font-bold tracking-[.02em] transition-all hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-pink/30 disabled:opacity-45 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none">
          {spinning ? "En cours..." : "Lancer ✦"}
        </button>
        <button
          className={`share-button w-12 h-12 flex items-center justify-center rounded-xl bg-foreground/[.08] border border-foreground/15 text-foreground hover:bg-foreground/[.18] transition-all ${settled ? "visible" : ""}`}
          onClick={() => settled && window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Je viens de tirer "${items[cur].name}" sur Drink with Zay ! 🍹`)}`, "_blank")}>
          ↗
        </button>
      </div>
    </div>
  );
}

export default DrinkCarousel;
