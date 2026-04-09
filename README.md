# ![Paul's Cooksite Banner](./images/banner_v2.png)

<div align="center">
  <a href="https://p4ulcun.github.io/Pauls_Cooksite/index.html">
    <img src="https://img.shields.io/badge/View_Live_Site-C49A3C?style=for-the-badge&logo=github" alt="Live Site">
  </a>
</div>
<br>

**[Paul's Cooksite](https://p4ulcun.github.io/Pauls_Cooksite/index.html)** is my personal website where I post recipe ideas and inspiration. ✨

## 🛠️ Details & Architecture

The website is a completely responsive, static site built entirely with **Vanilla HTML, CSS, and JavaScript**. There are zero external frameworks, dependencies, or build tools required. All data is structured cleanly inside a local JavaScript config.

### ✨ Key Features
* **Dynamic Search & Filtering:** Live-search dropdown for both recipe titles and single ingredients, alongside instant tag-based filtering on the homepage.
* **Smart Servings Scaler:** Effortlessly adjust serving sizes `[ - ] [ + ]`. The page intelligently scales all ingredients and auto-formats decimals into clean, readable fractions (e.g., ½, ¼).
* **Imperial & Metric Toggling:** Switch seamlessly between Metric (g, ml) and Imperial (oz, fl oz) measurements without page reloads.
* **🛒 Shopping Mode:** Turns the ingredient list into large, mobile-friendly tappable checkboxes. Checked items persist in your browser's `localStorage` so you won't lose your list if your phone locks at the store.
* **👨‍🍳 Cook Mode:** A distraction-free, full-screen overlay for step-by-step instructions. It utilizes the modern `navigator.wakeLock` API to prevent your device screen from turning off while your hands are busy cooking.

## 🚀 Hosting (GitHub Pages)
This site is heavily optimized to be hosted completely free on **GitHub Pages**. 
To deploy, go to repository **Settings** → **Pages** → set source to `Deploy from a branch` and point to `main` at the `/root` folder. GitHub builds it automatically!