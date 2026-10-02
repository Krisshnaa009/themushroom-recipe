/**
 * The MushRoom — Interactive Website Logic
 * Clean, simple, fast & mobile-friendly
 */

(function () {
  'use strict';

  // State
  let currentCategory = 'ALL RECIPES';
  let searchQuery = '';
  let recipes = [];

  // DOM Elements
  const recipeGrid = document.getElementById('recipeGrid');
  const noRecipesMsg = document.getElementById('noRecipesMsg');
  const recipeSearch = document.getElementById('recipeSearch');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const categoryPills = document.querySelectorAll('.category-pill');
  const resetFilterBtn = document.getElementById('resetFilterBtn');

  // Mobile Menu Elements
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Video Modal Elements
  const videoModal = document.getElementById('videoModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseFooterBtn = document.getElementById('modalCloseFooterBtn');
  const youtubePlayerIframe = document.getElementById('youtubePlayerIframe');
  const modalTitle = document.getElementById('modalTitle');
  const modalExternalLink = document.getElementById('modalExternalLink');

  // Add Recipe Form Elements
  const toggleAddRecipeBtn = document.getElementById('toggleAddRecipeBtn');
  const addRecipeCard = document.getElementById('addRecipeCard');
  const addRecipeForm = document.getElementById('addRecipeForm');
  const cancelAddRecipeBtn = document.getElementById('cancelAddRecipeBtn');

  // 1. Initialize Recipes
  function initRecipes() {
    try {
      const stored = localStorage.getItem('themushroom_custom_recipes');
      const customRecipes = stored ? JSON.parse(stored) : [];
      // Combine user added recipes at top + default recipes
      recipes = [...customRecipes, ...DEFAULT_RECIPES];
    } catch (e) {
      console.warn('localStorage not accessible, using default recipes', e);
      recipes = [...DEFAULT_RECIPES];
    }

    renderRecipes();
  }

  // 2. Render Recipe Cards
  function renderRecipes() {
    const query = searchQuery.trim().toLowerCase();

    const filtered = recipes.filter(recipe => {
      // Category match
      const matchesCategory =
        currentCategory === 'ALL RECIPES' ||
        recipe.category === currentCategory ||
        (Array.isArray(recipe.categories) && recipe.categories.includes(currentCategory));

      if (!matchesCategory) return false;

      // Search match
      if (!query) return true;

      const titleMatch = recipe.title && recipe.title.toLowerCase().includes(query);
      const descMatch = recipe.description && recipe.description.toLowerCase().includes(query);
      const tagMatch = Array.isArray(recipe.tags) && recipe.tags.some(t => t.toLowerCase().includes(query));
      const catMatch = recipe.category && recipe.category.toLowerCase().includes(query);

      return titleMatch || descMatch || tagMatch || catMatch;
    });

    if (filtered.length === 0) {
      recipeGrid.innerHTML = '';
      noRecipesMsg.style.display = 'block';
      return;
    }

    noRecipesMsg.style.display = 'none';

    recipeGrid.innerHTML = filtered
      .map(recipe => {
        const videoId = recipe.id || extractYouTubeId(recipe.youtubeUrl);
        const thumbUrl = getThumbnailUrl(videoId);
        const ytWatchUrl = recipe.youtubeUrl || `https://www.youtube.com/watch?v=${videoId}`;
        const cleanTitle = recipe.title || 'Mushroom Recipe';
        const cleanDesc = recipe.description || 'Watch this easy oyster mushroom recipe and enjoy cooking fresh mushrooms.';
        const categoryLabel = recipe.category || 'RECIPE';

        return `
          <article class="recipe-card" data-id="${videoId}" data-title="${encodeURIComponent(cleanTitle)}" data-url="${ytWatchUrl}">
            <div class="card-thumbnail-wrapper" role="button" tabindex="0" aria-label="Play video: ${cleanTitle}">
              <img 
                src="${thumbUrl}" 
                alt="${cleanTitle} thumbnail" 
                class="card-thumbnail-img" 
                loading="lazy"
                onerror="this.onerror=null;this.src='https://img.youtube.com/vi/${videoId}/0.jpg';"
              />
              <span class="card-badge">${categoryLabel}</span>
              ${recipe.time ? `<span class="card-time">⏱️ ${recipe.time}</span>` : ''}
              <div class="card-play-overlay">
                <div class="play-icon-circle">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>

            <div class="card-content">
              <h3 class="card-title">${cleanTitle}</h3>
              <p class="card-description">${cleanDesc}</p>
              <div class="card-action">
                <button class="btn btn-watch-recipe" type="button" aria-label="Watch ${cleanTitle}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  WATCH RECIPE
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    // Attach click listeners to cards & buttons
    attachCardListeners();
  }

  // 3. Attach Listeners to Video Cards
  function attachCardListeners() {
    const cards = recipeGrid.querySelectorAll('.recipe-card');
    cards.forEach(card => {
      const videoId = card.getAttribute('data-id');
      const title = decodeURIComponent(card.getAttribute('data-title') || 'Recipe Video');
      const ytUrl = card.getAttribute('data-url');

      const triggerOpen = () => openVideoModal(videoId, title, ytUrl);

      const thumbWrapper = card.querySelector('.card-thumbnail-wrapper');
      const watchBtn = card.querySelector('.btn-watch-recipe');

      thumbWrapper.addEventListener('click', triggerOpen);
      thumbWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerOpen();
        }
      });

      watchBtn.addEventListener('click', triggerOpen);
    });
  }

  // 4. Video Modal Open / Close
  function openVideoModal(videoId, title, ytUrl) {
    if (!videoId) return;

    modalTitle.textContent = title;
    modalExternalLink.href = ytUrl || `https://www.youtube.com/watch?v=${videoId}`;
    youtubePlayerIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent scrolling
    modalCloseBtn.focus();
  }

  function closeVideoModal() {
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    youtubePlayerIframe.src = ''; // Stop audio/video playback immediately
    document.body.style.overflow = '';
  }

  modalBackdrop.addEventListener('click', closeVideoModal);
  modalCloseBtn.addEventListener('click', closeVideoModal);
  modalCloseFooterBtn.addEventListener('click', closeVideoModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('open')) {
      closeVideoModal();
    }
  });

  // 5. Category Filter Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      currentCategory = pill.getAttribute('data-category');
      renderRecipes();
    });
  });

  // 6. Search Input Handling
  recipeSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery.length > 0 ? 'inline-block' : 'none';
    renderRecipes();
  });

  clearSearchBtn.addEventListener('click', () => {
    recipeSearch.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    recipeSearch.focus();
    renderRecipes();
  });

  resetFilterBtn.addEventListener('click', () => {
    recipeSearch.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';

    categoryPills.forEach(p => {
      const isAll = p.getAttribute('data-category') === 'ALL RECIPES';
      p.classList.toggle('active', isAll);
      p.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    currentCategory = 'ALL RECIPES';
    renderRecipes();
  });

  // 7. Mobile Navigation Toggle
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // 8. Add Custom Recipe Tool
  toggleAddRecipeBtn.addEventListener('click', () => {
    const isShowing = addRecipeCard.style.display === 'block';
    addRecipeCard.style.display = isShowing ? 'none' : 'block';
    if (!isShowing) {
      document.getElementById('newYoutubeUrl').focus();
    }
  });

  cancelAddRecipeBtn.addEventListener('click', () => {
    addRecipeCard.style.display = 'none';
  });

  addRecipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawUrl = document.getElementById('newYoutubeUrl').value;
    const customTitle = document.getElementById('newRecipeTitle').value.trim();
    const category = document.getElementById('newRecipeCategory').value;
    const description = document.getElementById('newRecipeDesc').value.trim();

    const videoId = extractYouTubeId(rawUrl);
    if (!videoId) {
      alert('Please enter a valid YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)');
      return;
    }

    const newRecipe = {
      id: videoId,
      title: customTitle || '🍄 Fresh Oyster Mushroom Recipe',
      category: category,
      categories: [category, 'ALL RECIPES'],
      description: description || 'Watch this easy oyster mushroom recipe and prepare a delicious meal.',
      youtubeUrl: rawUrl,
      time: '15 mins',
      tags: ['mushroom', 'recipe', 'easy', 'fresh']
    };

    // Save to localStorage
    try {
      const stored = localStorage.getItem('themushroom_custom_recipes');
      const customList = stored ? JSON.parse(stored) : [];
      customList.unshift(newRecipe);
      localStorage.setItem('themushroom_custom_recipes', JSON.stringify(customList));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }

    recipes.unshift(newRecipe);
    addRecipeForm.reset();
    addRecipeCard.style.display = 'none';

    // Switch to ALL RECIPES and clear search to show the new card immediately
    currentCategory = 'ALL RECIPES';
    searchQuery = '';
    recipeSearch.value = '';
    clearSearchBtn.style.display = 'none';
    categoryPills.forEach(p => {
      const isAll = p.getAttribute('data-category') === 'ALL RECIPES';
      p.classList.toggle('active', isAll);
      p.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    renderRecipes();

    // Scroll to the newly added recipe
    const firstCard = recipeGrid.firstElementChild;
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstCard.style.animation = 'modalPop 0.5s ease';
    }
  });

  // Run on start
  initRecipes();

})();
