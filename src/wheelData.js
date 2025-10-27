// src/wheelData.js

export const wheelData = [
  {
    id: "matcha",
    title: "Matcha",
    // emoji: "🍵", // Ancien caractère
    emoji: ":tea:", // Nouveau code court
    items: [
      // ... liste des matcha ...
      "Matcha Latte Vanille", "Matcha Latte Coco", "Matcha Latte Mousse Coco",
      "Matcha Latte Cassis", "Matcha Latte Fruits Rouges", "Matcha Latte Chocolat Blanc",
      "Matcha Latte Blueberry", "Matcha Latte Mango", "Matcha Latte Lait de Coco",
      "Matcha Latte Coco/Mango", "Matcha Latte Passion",
    ],
    colors: ["#6EE7B7", "#3B82F6", "#93C5FD"],
  },
  {
    id: "cafe",
    title: "Café",
    // emoji: "☕", // Ancien caractère
    emoji: ":coffee:", // Nouveau code court
    items: [
       // ... liste des cafés ...
      "Coffee Latte Caramel", "Coffee Latte Caramel Salé", "Coffee Latte Caramel Beurre Salé",
      "Coffee Latte Vanille", "Coffee Latte Crème Brûlée", "Coffee Latte Chocolat",
      "Coffee Latte Spéculos", "Coffee Latte Pumpkin Spice", "Coffee Latte Tiramisu",
      "Coffee Latte Peanut Butter", "Coffee Latte Brown Sugar",
    ],
    colors: ["#FBBF24", "#F59E0B", "#D97706"],
  },
  {
    id: "bubble",
    title: "Bubble Tea",
    // emoji: "🧋", // Ancien caractère
    emoji: ":bubble_tea:", // Nouveau code court (ou :boba:)
    items: [
       // ... liste des bubble tea ...
      "Thé noir / Passion", "Thé noir / Cassis", "Thé noir / Passion / Cassis",
      "Thé noir / Abricot", "Coffee Latte", "Brown Sugar Latte",
    ],
    colors: ["#F472B6", "#EC4899", "#DB2777"],
  },
];