import React from "react";
import { useTheme } from "next-themes"; // 1. Importer useTheme
import { toast } from "sonner"; // 2. Importer toast

// Icônes SVG pour la lune et le soleil (inchangées)
const MoonIcon = () => (
  <svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 008.25-4.498z"
    />
  </svg>
);
const SunIcon = () => (
  <svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 9a3 3 0 100 6 3 3 0 000-6z"
    />
  </svg>
);

function ThemeToggle() {
  // 3. Utiliser le hook pour gérer le thème
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // 4. Appeler la notification sonner
    if (newTheme === "dark") {
      toast.message("Mode sombre activé 🌙", {
        description: "Bonne nuit !",
      });
    } else {
      toast.message("Mode clair activé ☀️", {
        description: "Bonjour !",
      });
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="absolute top-6 right-6 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 z-20"
      aria-label="Changer de thème"
    >
      {/* 5. Gérer l'icône en fonction du thème */}
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default ThemeToggle;