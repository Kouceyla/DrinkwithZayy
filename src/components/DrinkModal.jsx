import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalVariants  = {
  hidden:  { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0  },
  exit:    { opacity: 0, scale: 0.85, y: 20 },
};

function DrinkModal({ data, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[6px] p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            key="modal"
            className="relative z-10 w-full max-w-[420px] rounded-2xl bg-card text-card-foreground border border-border/20 shadow-2xl overflow-hidden"
            variants={modalVariants}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 bg-background/70 border border-border/20 rounded-full w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors group"
              aria-label="Fermer"
            >
              <div className="transition-transform duration-200 group-hover:rotate-90">
                <CloseIcon />
              </div>
            </button>

            <div className="w-full h-56 bg-secondary flex items-center justify-center overflow-hidden">
              <img
                src={data.image}
                alt={`Photo de ${data.name}`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-brand-pink mb-2">
                Recette
              </p>
              <h3 className="font-serif text-2xl font-black text-foreground mb-4 leading-tight">
                {data.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed recipe-text">
                {data.recipe}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DrinkModal;
