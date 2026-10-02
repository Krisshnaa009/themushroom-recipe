# 🍄 The MushRoom — Official Recipe Website

> **“FRESH FROM NATURE”**  
> A simple, clean, and mobile-friendly website showcasing delicious mushroom recipe videos from YouTube, with 1-tap WhatsApp ordering.

---

## 🌟 Highlights

- **Official Brand Logo**: Incorporates the exact hand-drawn cottage mushroom logo without any modifications.
- **Recipe Video Showcase**: Features realistic, high-resolution YouTube thumbnails and an embedded responsive video player modal.
- **6 Clean Recipe Categories**:
  - `ALL RECIPES`
  - `INDIAN RECIPES`
  - `QUICK RECIPES`
  - `SNACKS`
  - `MAIN COURSE`
  - `HEALTHY RECIPES`
- **Instant Search Box**: Real-time filtering by ingredients (*garlic, masala, soup, fry, rice, mushroom*).
- **Direct WhatsApp Ordering**:
  - Number: `+91 9130011765`
  - Pre-filled message: *"Hello The MushRoom! I would like to order fresh oyster mushrooms."*
  - Floating 1-tap WhatsApp button for mobile and desktop shoppers.
- **Benefits & About**:
  - Simple 4-benefit card grid (*Nutritious, Naturally Good, Versatile, Delicious*).
  - Short brand introduction with official logo badge.
- **Mobile-First Responsive Layout**:
  - **Desktop**: 3-column grid
  - **Tablet**: 2-column grid
  - **Mobile**: 1-column layout with large touch targets (min 48px), clean hamburger drawer, and zero horizontal scrolling.

---

## 📁 File Structure

```text
themushroom-recipe/
├── assets/
│   └── logo.jpg          # Official user uploaded logo
├── index.html            # Semantic, clean HTML5 structure & SEO tags
├── style.css             # Vanilla CSS design system (warm cream, brown, terracotta, forest green)
├── recipes.js            # Recipe video data & YouTube ID extraction utilities
├── app.js                # Search, category filter, modal video player, mobile navigation
├── server.js             # Lightweight zero-dependency static server
├── package.json          # npm start / dev scripts
└── README.md             # Project documentation
```

---

## 🚀 How to Run Locally

### Option 1: Using Node.js
```bash
npm start
# or: node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option 2: Direct File Open
You can also directly double-click `index.html` in your file explorer to open it in Chrome, Safari, or Firefox!

---

## 🎥 How to Add or Update YouTube Links

### Method 1: Directly from the Website (No coding needed)
1. Open the website.
2. Scroll to the recipe section and tap **"+ Have a new YouTube recipe link? Click to add"**.
3. Paste your YouTube video link, enter a title, choose a category, and click **Add Recipe Video**.
4. The video card and thumbnail will appear immediately!

### Method 2: In `recipes.js`
Open `recipes.js` and add an entry to the `DEFAULT_RECIPES` array:

```javascript
{
  id: "tcXsbYtDsq4", // Or full YouTube URL
  title: "🍄 Garlic Butter Oyster Mushroom",
  category: "QUICK RECIPES", // Choose from one of the 6 categories
  categories: ["QUICK RECIPES", "SNACKS"],
  description: "Easy and delicious oyster mushroom recipe for everyday cooking.",
  youtubeUrl: "https://www.youtube.com/watch?v=tcXsbYtDsq4",
  time: "8 mins",
  tags: ["garlic", "butter", "quick", "fry"]
}
```
The website automatically fetches the high-resolution YouTube thumbnail and embeds the player.
