// src/wheelData.js

export const wheelData = [
  {
    id: "matcha",
    title: "Matcha",
    emoji: "🍵",
    items: [
      { 
        name: "Matcha Latte Vanille", 
        image: "/images/matcha/matcha-vanille.jpg", // À FAIRE: Mettez le bon chemin d'image
        recipe: "1. Mélangez 1 cuillère à café de matcha avec 50ml d'eau chaude.\n2. Ajoutez 1 cuillère de sirop de vanille.\n3. Versez 200ml de lait (chaud ou froid) et dégustez !" 
      },
      { 
        name: "Matcha Latte Coco", 
        image: "/images/placeholder.jpg", // À FAIRE: Mettez le bon chemin d'image
        recipe: "Description de la recette à venir..." // À FAIRE: Mettez la recette
      },
      // ... (Complétez les autres boissons matcha ici)
      { name: "Matcha Latte Passion", image: "/images/placeholder.jpg", recipe: "Recette à venir..." }
    ],
    // Palette Verte/Bleue douce
    colors: ["#6EE7B7", "#3B82F6", "#93C5FD"], // Emerald-300, Blue-500, Blue-300
  },
  {
    id: "cafe",
    title: "Café",
    emoji: "☕",
    items: [
      { 
        name: "Coffee Latte Speculos", 
        image: "/images/IceCofeeSpeculos.jpg", // À FAIRE: Mettez le bon chemin d'image
        recipe: "1. Préparez un espresso.\n2. Ajoutez 2 cuillères de sauce caramel au fond d'une tasse.\n3. Versez l'espresso.\n4. Ajoutez 200ml de lait chaud moussé." 
      },
      { 
        name: "Coffee Latte Caramel Salé", 
        image: "/images/placeholder.jpg", // À FAIRE: Mettez le bon chemin d'image
        recipe: "Description de la recette à venir..." // À FAIRE: Mettez la recette
      },
      // ... (Complétez les autres boissons café ici)
      { name: "Coffee Latte Brown Sugar", image: "/images/placeholder.jpg", recipe: "Recette à venir..." }
    ],
    // Palette Or/Orange chaude
    colors: ["#FBBF24", "#F59E0B", "#D97706"], // Amber-400, Amber-500, Amber-600
  },
  {
    id: "bubble",
    title: "Bubble Tea",
    emoji: "🧋",
    items: [
      { 
        name: "Thé noir / Passion", 
        image: "/images/bubble/bubble-passion.jpg", // À FAIRE: Mettez le bon chemin d'image
        recipe: "1. Préparez 200ml de thé noir infusé et refroidi.\n2. Ajoutez 50ml de sirop de fruit de la passion.\n3. Ajoutez des perles de tapioca cuites.\n4. Secouez avec des glaçons et servez !" 
      },
      // ... (Complétez les autres boissons bubble tea ici)
      { name: "Brown Sugar Latte", image: "/images/placeholder.jpg", recipe: "Recette à venir..." }
    ],
    // Palette Rose/Violet vibrante
    colors: ["#F472B6", "#EC4899", "#DB2777"], // Pink-400, Pink-500, Pink-600
  },
];