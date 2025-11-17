// src/components/DrinkModal.jsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Composant "X" pour fermer
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

function DrinkModal({ data, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          key="overlay"
          // 1. MODIFICATION : J'ai retiré la classe "light"
          // La modale respectera à nouveau le thème sombre.
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            key="modal"
            className="relative z-10 w-full max-w-md h-auto max-h-[90vh] overflow-y-auto rounded-xl bg-card text-card-foreground shadow-lg p-6"
            variants={modalVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} 
          >
            {/* ... (le bouton fermer reste inchangé) ... */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full text-muted-foreground hover:bg-secondary transition-colors"
              aria-label="Fermer la modale"
            >
              <CloseIcon />
            </button>

            {/* 2. MODIFICATION DE L'IMAGE */}
            <img
              id="modal-image"
              src={data.image}
              alt={`Photo de ${data.name}`}
              // h-64 = hauteur fixe (256px)
              // object-contain = l'image sera entièrement visible ET centrée
              className="w-full h-64 object-contain rounded-lg mb-4" 
            />
            {/* ... (le reste du contenu est inchangé) ... */}
            <h3
              id="modal-title"
              className="text-2xl font-bold mb-3 text-foreground"
            >
              {data.name}
            </h3>
            <p
              id="modal-recipe"
              className="text-base text-muted-foreground recipe-text"
            >
              {data.recipe}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DrinkModal;