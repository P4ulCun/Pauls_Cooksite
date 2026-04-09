// Utility: Unit Conversion
const conversions = {
  g: { to: 'oz', factor: 0.03527396 },
  kg: { to: 'lbs', factor: 2.20462 },
  ml: { to: 'fl oz', factor: 0.033814 },
  L: { to: 'pt', factor: 2.11338 }
};

// Formatting amounts
function formatAmount(amount) {
  if (!amount || amount === 0) return '';
  const num = Number(amount);
  const rounded = Math.round(num * 10) / 10;
  
  if (rounded === parseInt(rounded)) return rounded.toString();
  
  // Fractions
  const nearQuarter = Math.abs(rounded - 0.25) < 0.1;
  const nearHalf = Math.abs(rounded - 0.5) < 0.1;
  const nearThreeQuarters = Math.abs(rounded - 0.75) < 0.1;
  const nearThird = Math.abs(rounded - 0.33) < 0.1;
  
  if (nearQuarter) return '¼';
  if (nearHalf) return '½';
  if (nearThreeQuarters) return '¾';
  if (nearThird) return '⅓';
  
  return rounded.toString();
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Dropdown
  const navBurger = document.getElementById('nav-button');
  const navMenu = document.getElementById('nav-menu');
  if (navBurger) {
    navBurger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // SEARCH LOGIC
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  let basePath = '';
  // Simple check for path depth (e.g., in /html/ or /)
  if (window.location.pathname.includes('/html/')) {
    basePath = '../';
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (q.length < 2) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        return;
      }

      const byTitle = recipes.filter(r => r.title.toLowerCase().includes(q));
      const byIngredient = recipes.filter(r => 
        r.ingredients.some(i => i.name.toLowerCase().includes(q))
      );

      // Deduplicate
      const titleIds = byTitle.map(r => r.id);
      const filteredByIngredient = byIngredient.filter(r => !titleIds.includes(r.id));

      if (byTitle.length === 0 && filteredByIngredient.length === 0) {
        searchResults.innerHTML = '<div class="search-item">No results found</div>';
        searchResults.classList.add('active');
        return;
      }

      let html = '';
      if (byTitle.length > 0) {
        html += '<div class="search-section">Recipes</div>';
        byTitle.forEach(r => {
          const path = basePath ? `${basePath}html/${r.id}-recipe.html` : `html/${r.id}-recipe.html`;
          html += `<a href="${path}" class="search-item">${r.title}</a>`;
        });
      }
      if (filteredByIngredient.length > 0) {
        html += '<div class="search-section">By Ingredient</div>';
        filteredByIngredient.forEach(r => {
          const path = basePath ? `${basePath}html/${r.id}-recipe.html` : `html/${r.id}-recipe.html`;
          html += `<a href="${path}" class="search-item">${r.title}</a>`;
        });
      }

      searchResults.innerHTML = html;
      searchResults.classList.add('active');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        searchResults.classList.remove('active');
      }
    });
  }

  // HOMEPAGE LOGIC
  const recipeGrid = document.getElementById('recipe-grid');
  const tagFilters = document.getElementById('tag-filters');
  
  if (recipeGrid && tagFilters) {
    // Generate Tags Set
    const allTagsSet = new Set();
    recipes.forEach(r => r.tags.forEach(t => allTagsSet.add(t)));
    // Move "All" to start
    const allTags = Array.from(allTagsSet);
    if (allTags.includes('All')) {
      allTags.splice(allTags.indexOf('All'), 1);
      allTags.unshift('All');
    }

    allTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'filter-pill' + (tag === 'All' ? ' active' : '');
      btn.textContent = tag;
      tagFilters.appendChild(btn);

      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterGrid(tag);
      });
    });

    // Generate Cards
    recipes.forEach(r => {
      const card = document.createElement('a');
      card.href = basePath ? `${basePath}html/${r.id}-recipe.html` : `html/${r.id}-recipe.html`;
      card.className = 'recipe-card';
      card.dataset.tags = r.tags.join(',');
      
      const tagHtml = r.tags.filter(t=>t!=='All').map(t => `<span class="tag-badge">${t}</span>`).join('');
      
      card.innerHTML = `
        <img src="${r.image}" alt="${r.title}">
        <div class="recipe-info">
          <div class="recipe-card-tags">${tagHtml}</div>
          <h3>${r.title}</h3>
          <p>${r.description}</p>
          <div class="recipe-meta">
            <span>⏱ ${r.totalTime} mins</span>
          </div>
          <span class="btn-secondary">View Recipe</span>
        </div>
      `;
      recipeGrid.appendChild(card);
    });

    function filterGrid(tag) {
      document.querySelectorAll('.recipe-card').forEach(card => {
        const tTags = card.dataset.tags.split(',');
        if (tag === 'All' || tTags.includes(tag)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }
  }

  // RECIPE PAGE LOGIC
  const recipeId = document.body.dataset.recipeId;
  if (recipeId) {
    const currentRecipe = recipes.find(r => r.id === recipeId);
    if (!currentRecipe) return;

    // Elements
    const scaleValueSpan = document.getElementById('scale-value');
    const servingDisplay = document.getElementById('serving-display');
    const ingTable = document.getElementById('ingredients-table');
    const toggleUnitsBtn = document.getElementById('btn-toggle-units');
    const shopList = document.getElementById('shopping-checklist');
    const stepsList = document.getElementById('steps-list');
    
    // State
    const baseServings = currentRecipe.servings;
    let currentServings = baseServings;
    let useImperial = false;

    // Load Shopping Mode LocalStorage
    const shopStateKey = `shop_${recipeId}`;
    let shopState = JSON.parse(localStorage.getItem(shopStateKey)) || {};

    const renderIngredients = () => {
      const scale = currentServings / baseServings;
      
      // Render Table
      let tableHtml = `<tr><th colspan="2">Ingredients List</th></tr>`;
      
      // Render Shopping List
      let shopHtml = ``;

      const midway = Math.ceil(currentRecipe.ingredients.length / 2);

      currentRecipe.ingredients.forEach((ing, index) => {
        let amountStr = '';
        let displayUnit = ing.unit;
        let displayAmount = ing.amount * scale;

        if (useImperial && conversions[ing.unit]) {
          displayUnit = conversions[ing.unit].to;
          displayAmount = displayAmount * conversions[ing.unit].factor;
        }

        if (ing.amount !== 0) {
          amountStr = `${formatAmount(displayAmount)} ${displayUnit}`.trim();
        } else {
          amountStr = ing.unit; // "to taste"
        }

        // Table logic (2-column layout)
        if (index % 2 === 0) {
          tableHtml += `<tr><td>${amountStr} ${ing.name}</td>`;
          // If it's the last standard element and odd count
          if (index === currentRecipe.ingredients.length - 1) {
            tableHtml += `<td>&nbsp;</td></tr>`;
          }
        } else {
          tableHtml += `<td>${amountStr} ${ing.name}</td></tr>`;
        }

        // Shop list logic
        const isChecked = shopState[index] ? 'checked' : '';
        shopHtml += `
          <li class="shopping-item ${isChecked}" data-index="${index}">
            <div class="shopping-checkbox">✓</div>
            <span>${amountStr} ${ing.name}</span>
          </li>`;
      });

      ingTable.innerHTML = tableHtml;
      shopList.innerHTML = shopHtml;

      // Add shop list listeners
      shopList.querySelectorAll('.shopping-item').forEach(item => {
        item.addEventListener('click', () => {
          const idx = item.dataset.index;
          const isCurrentlyChecked = item.classList.contains('checked');
          if (isCurrentlyChecked) {
            item.classList.remove('checked');
            delete shopState[idx];
          } else {
            item.classList.add('checked');
            shopState[idx] = true;
          }
          localStorage.setItem(shopStateKey, JSON.stringify(shopState));
        });
      });
    };

    const updateDisplayNumbers = () => {
      if(scaleValueSpan) scaleValueSpan.textContent = currentServings;
      if(servingDisplay) servingDisplay.textContent = currentServings;
    }

    renderIngredients();
    
    // Scaler logic
    document.getElementById('btn-scale-up')?.addEventListener('click', () => {
      currentServings++;
      updateDisplayNumbers();
      renderIngredients();
    });
    
    document.getElementById('btn-scale-down')?.addEventListener('click', () => {
      if (currentServings > 1) {
        currentServings--;
        updateDisplayNumbers();
        renderIngredients();
      }
    });

    // Toggle Units logic
    if (toggleUnitsBtn) {
      toggleUnitsBtn.addEventListener('click', () => {
        useImperial = !useImperial;
        toggleUnitsBtn.textContent = useImperial ? "Switch to Metric" : "Switch to Imperial";
        renderIngredients();
      });
    }

    // Steps Logic
    currentRecipe.steps.forEach((step, idx) => {
      const li = document.createElement('li');
      li.textContent = step;
      stepsList.appendChild(li);
    });

    // Shopping Mode Logic
    const btnShopMode = document.getElementById('btn-shopping-mode');
    const btnShopExit = document.getElementById('btn-shopping-exit');
    const btnShopClear = document.getElementById('btn-shopping-clear');
    const shopControls = document.getElementById('shopping-mode-controls');
    
    if (btnShopMode) {
      btnShopMode.addEventListener('click', () => {
        document.body.classList.add('shopping-mode-active');
        shopList.style.display = 'block';
        shopControls.style.display = 'flex';
        // Scroll to top
        window.scrollTo(0, 0);
      });
    }

    if (btnShopExit) {
      btnShopExit.addEventListener('click', () => {
        document.body.classList.remove('shopping-mode-active');
        shopList.style.display = 'none';
        shopControls.style.display = 'none';
      });
    }

    if (btnShopClear) {
      btnShopClear.addEventListener('click', () => {
        shopState = {};
        localStorage.removeItem(shopStateKey);
        renderIngredients(); // re-render to update classes
      });
    }

    // Cook Mode Logic
    const btnCookMode = document.getElementById('btn-cook-mode');
    const btnCookExit = document.getElementById('btn-cook-exit');
    const cookOverlay = document.getElementById('cook-mode-overlay');
    const cookStepNum = document.getElementById('cook-step-num');
    const cookStepText = document.getElementById('cook-step-text');
    const btnCookPrev = document.getElementById('btn-cook-prev');
    const btnCookNext = document.getElementById('btn-cook-next');
    const cookProgress = document.getElementById('cook-progress');

    let currentStepIndex = 0;
    let wakeLock = null;

    const renderCookStep = () => {
      cookStepNum.textContent = currentStepIndex + 1;
      cookStepText.textContent = currentRecipe.steps[currentStepIndex];
      btnCookPrev.disabled = currentStepIndex === 0;
      btnCookNext.disabled = currentStepIndex === currentRecipe.steps.length - 1;
      
      const pct = ((currentStepIndex + 1) / currentRecipe.steps.length) * 100;
      cookProgress.style.width = pct + '%';
    };

    if (btnCookMode) {
      btnCookMode.addEventListener('click', async () => {
        cookOverlay.style.display = 'flex';
        currentStepIndex = 0;
        renderCookStep();
        
        try {
          if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
          }
        } catch (err) {}
      });
    }

    if (btnCookExit) {
      btnCookExit.addEventListener('click', () => {
        cookOverlay.style.display = 'none';
        if (wakeLock !== null) {
          wakeLock.release()
            .then(() => { wakeLock = null; });
        }
      });
    }

    if (btnCookNext) {
      btnCookNext.addEventListener('click', () => {
        if (currentStepIndex < currentRecipe.steps.length - 1) {
          currentStepIndex++;
          renderCookStep();
        }
      });
    }

    if (btnCookPrev) {
      btnCookPrev.addEventListener('click', () => {
        if (currentStepIndex > 0) {
          currentStepIndex--;
          renderCookStep();
        }
      });
    }

  }
});
