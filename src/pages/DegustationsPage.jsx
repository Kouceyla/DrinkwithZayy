import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { tastings } from "../tastingsData";
import { ThemeProvider } from "../components/ThemeProvider";
import ScrollReveal from "../components/ScrollReveal";
import CursorGlow from "../components/CursorGlow";
import { MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import NavBar from "../components/NavBar";

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function RatingBadge({ label, value, color }) {
  const pct = (value / 10) * 100;
  return (
    <div className="flex flex-col gap-1 flex-1">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-muted-foreground">{label}</span>
        <span style={{ color }} className="tabular-nums">{value}/10</span>
      </div>
      <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function PhotoLightbox({ photos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <img src={photos[current]} alt="" className="w-full max-h-[80vh] object-contain rounded-2xl" />
        {photos.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors">
              <ChevronRight size={20} />
            </button>
            <div className="flex justify-center gap-1.5 mt-3">
              {photos.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-brand-pink scale-125" : "bg-white/40"}`} />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function TastingCard({ tasting, delay }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const hasPhotos = tasting.photos?.length > 0;

  return (
    <>
      <ScrollReveal delay={delay}>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl overflow-hidden bg-card border border-border/20 shadow-md flex flex-col group h-full"
        >
          {/* Photo or placeholder */}
          <div
            className={`relative h-52 overflow-hidden flex items-center justify-center bg-background ${hasPhotos ? "cursor-pointer" : ""}`}
            onClick={hasPhotos ? () => setLightboxIndex(0) : undefined}
          >
            {hasPhotos ? (
              <>
                <img
                  src={tasting.photos[0]}
                  alt={tasting.drinkName}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                {tasting.photos.length > 1 && (
                  <span className="absolute top-3 right-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
                    +{tasting.photos.length - 1}
                  </span>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground/40 select-none">
                <span className="text-5xl">{tasting.categoryEmoji}</span>
                <span className="text-xs tracking-widest uppercase">Pas de photo</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-12" style={{ background: "linear-gradient(to top, hsl(var(--card)) 0%, transparent 100%)" }} />
          </div>

          {/* Thumbnails si plusieurs photos */}
          {tasting.photos?.length > 1 && (
            <div className="flex gap-2 px-5 pb-2 -mt-1">
              {tasting.photos.slice(1).map((photo, i) => (
                <button key={i} onClick={() => setLightboxIndex(i + 1)} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-transparent hover:border-brand-pink transition-colors flex-shrink-0">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Contenu */}
          <div className="p-5 flex flex-col flex-1 gap-3">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-brand-pink">
              {tasting.categoryEmoji} {tasting.category}
            </p>

            <h3 className="font-serif text-xl font-black text-foreground leading-tight">
              {tasting.drinkName}
            </h3>

            <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPin size={13} className="text-brand-pink flex-shrink-0 mt-0.5" />
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-foreground">{tasting.coffeeshop}</span>
                {tasting.location && tasting.location !== "Paris" && (
                  <span className="text-xs">{tasting.location}</span>
                )}
              </div>
            </div>

            {tasting.description && (
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {tasting.description}
              </p>
            )}

            {tasting.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tasting.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-brand-pink/10 text-brand-pink font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Notes Zay & Kouceyla */}
            <div className="flex flex-col gap-2 pt-3 border-t border-border/20">
              <RatingBadge label="Zay" value={tasting.ratingZay} color="#f4a7b9" />
              <RatingBadge label="Kouceyla" value={tasting.ratingKouceyla} color="#a78bfa" />
            </div>
          </div>
        </motion.article>
      </ScrollReveal>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <PhotoLightbox photos={tasting.photos} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function DegustationsPage() {
  return (
    <ThemeProvider>
      <CursorGlow />

      <NavBar />

      <main className="px-[8vw] py-16">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-14">
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[.12em] uppercase text-brand-pink mb-3">
            ✦ Journal de dégustation
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground leading-tight mb-4 max-w-xl">
            Boissons goûtées
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-lg">
            Nos découvertes dans les coffee shops — notées par Zay et Kouceyla.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tastings.map((tasting, i) => (
            <TastingCard key={tasting.id} tasting={tasting} delay={i * 60} />
          ))}
        </div>
      </main>

      <footer className="text-center py-10 px-4 text-sm text-muted-foreground">
        Made with ☕ by Zay
      </footer>
    </ThemeProvider>
  );
}

export default DegustationsPage;
