/**
 * The MushRoom - Recipe Video Database
 * 
 * HOW TO ADD OR UPDATE RECIPES:
 * Simply add a new item to the RECIPES array below.
 * You can provide any standard YouTube link (e.g. https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID).
 * The app will automatically extract the video ID and fetch the thumbnail!
 */

const DEFAULT_RECIPES = [
  {
    id: "tcXsbYtDsq4",
    title: "🍄 Garlic Butter Oyster Mushroom",
    category: "QUICK RECIPES",
    categories: ["QUICK RECIPES", "SNACKS"],
    description: "Sautéed oyster mushrooms tossed in rich golden garlic butter with fresh herbs. Ready in under 10 minutes!",
    youtubeUrl: "https://www.youtube.com/watch?v=tcXsbYtDsq4",
    time: "8 mins",
    difficulty: "Super Easy",
    tags: ["garlic", "butter", "quick", "fry", "snack", "starter"]
  },
  {
    id: "rgruxB0peaQ",
    title: "🍛 Indian Style Oyster Mushroom Masala",
    category: "INDIAN RECIPES",
    categories: ["INDIAN RECIPES", "MAIN COURSE"],
    description: "A rich, aromatic Indian curry simmered with tender oyster mushrooms, onions, tomatoes and fragrant spices.",
    youtubeUrl: "https://www.youtube.com/watch?v=rgruxB0peaQ",
    time: "20 mins",
    difficulty: "Easy",
    tags: ["indian", "masala", "curry", "main course", "spicy", "gravy"]
  },
  {
    id: "Z6NnY543n2Q",
    title: "Crispy Oyster Mushroom Pakoda",
    category: "SNACKS",
    categories: ["SNACKS", "INDIAN RECIPES", "QUICK RECIPES"],
    description: "Super crunchy, golden tea-time snack made with fresh oyster mushrooms and traditional gram flour spices.",
    youtubeUrl: "https://www.youtube.com/watch?v=Z6NnY543n2Q",
    time: "15 mins",
    difficulty: "Easy",
    tags: ["snack", "crispy", "fry", "pakoda", "indian", "crunchy", "teatime"]
  },
  {
    id: "i1v69muKUwA",
    title: "🌶️ Oyster Mushroom Pepper Fry",
    category: "INDIAN RECIPES",
    categories: ["INDIAN RECIPES", "QUICK RECIPES", "SNACKS"],
    description: "South Indian style spicy dry fry loaded with freshly crushed black pepper, curry leaves, and juicy mushrooms.",
    youtubeUrl: "https://www.youtube.com/watch?v=i1v69muKUwA",
    time: "12 mins",
    difficulty: "Easy",
    tags: ["pepper", "fry", "spicy", "indian", "starter", "south indian"]
  },
  {
    id: "jp5whKo6Ahk",
    title: "🥣 Creamy Mushroom Soup",
    category: "HEALTHY RECIPES",
    categories: ["HEALTHY RECIPES", "QUICK RECIPES"],
    description: "Velvety, warm and comforting homemade mushroom soup bursting with earthy flavour and wholesome nourishment.",
    youtubeUrl: "https://www.youtube.com/watch?v=jp5whKo6Ahk",
    time: "15 mins",
    difficulty: "Easy",
    tags: ["soup", "healthy", "creamy", "warm", "quick", "wholesome"]
  },
  {
    id: "pvhiPEPv9LI",
    title: "🥢 Quick Oyster Mushroom Stir Fry",
    category: "QUICK RECIPES",
    categories: ["QUICK RECIPES", "HEALTHY RECIPES"],
    description: "Crunchy vegetables and juicy oyster mushrooms tossed on high heat with a savoury garlic glaze.",
    youtubeUrl: "https://www.youtube.com/watch?v=pvhiPEPv9LI",
    time: "10 mins",
    difficulty: "Very Easy",
    tags: ["stir fry", "quick", "healthy", "asian", "vegetables", "savoury"]
  },
  {
    id: "NABRCmHvcU4",
    title: "🍚 Fragrant Mushroom Biryani & Pulao",
    category: "MAIN COURSE",
    categories: ["MAIN COURSE", "INDIAN RECIPES"],
    description: "Royal spiced basmati rice cooked with succulent marinated mushrooms, mint and caramelized onions.",
    youtubeUrl: "https://www.youtube.com/watch?v=NABRCmHvcU4",
    time: "30 mins",
    difficulty: "Medium",
    tags: ["biryani", "rice", "main course", "indian", "pulao", "lunch", "dinner"]
  },
  {
    id: "Ew7pll-r-4k",
    title: "🥘 Dhaba Style Mushroom Masala Curry",
    category: "MAIN COURSE",
    categories: ["MAIN COURSE", "INDIAN RECIPES"],
    description: "Thick, flavorful restaurant-style masala gravy with juicy oyster mushrooms that soak up every spice.",
    youtubeUrl: "https://www.youtube.com/watch?v=Ew7pll-r-4k",
    time: "25 mins",
    difficulty: "Easy",
    tags: ["curry", "masala", "dhaba", "main course", "indian", "roti"]
  },
  {
    id: "YPotjjfg_Y8",
    title: "🌱 Pure Oyster Mushroom Herb Broth",
    category: "HEALTHY RECIPES",
    categories: ["HEALTHY RECIPES"],
    description: "A soothing, restorative clear broth packed with natural oyster mushroom essence, herbs, and ginger.",
    youtubeUrl: "https://www.youtube.com/watch?v=YPotjjfg_Y8",
    time: "12 mins",
    difficulty: "Super Easy",
    tags: ["soup", "healthy", "broth", "natural", "light", "diet"]
  }
];

// Helper to extract YouTube video ID from any URL format
function extractYouTubeId(url) {
  if (!url) return null;
  const cleanUrl = url.trim();
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = cleanUrl.match(regExp);
  return (match && match[1]) ? match[1] : (cleanUrl.length === 11 ? cleanUrl : null);
}

// Helper to get high quality thumbnail
function getThumbnailUrl(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
