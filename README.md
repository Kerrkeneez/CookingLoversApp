# Cooking Lovers Application

Cooking Lovers is a small web app for people who enjoy collecting recipes and turning them into practical shopping lists.  
It started as a university project and grew into a tidy, three‑page single‑page application with an optional AI helper.

The app is built with Angular and TypeScript on the frontend. There is also a tiny Node/Express backend that can be used to proxy AI recipe generation, but the core features work entirely in the browser using local storage.

---

## Features

- **Recipe management**
  - Add your own recipes with ingredients and step‑by‑step instructions
  - Browse all saved recipes in a clean list view
  - Remove recipes you no longer need

- **AI‑assisted recipes (optional)**
  - Enter a prompt like “pasta”, “chicken dinner” or “vegetarian curry”
  - Get a generated recipe suggestion
  - When the AI service is not available, the app falls back to sensible, hard‑coded recipes

- **Shopping list generator**
  - Build a shopping list from all saved recipes
  - Automatically merges and deduplicates ingredients
  - Check items off as you shop

- **Persistent local storage**
  - Recipes and shopping lists are kept in `localStorage`
  - Data stays in your browser until you clear it

- **Simple, responsive UI**
  - Three main views (recipes, add recipe, shopping list)
  - Works well on desktop and is usable on smaller screens

---

## Technology stack

**Frontend**

- Angular 17
- TypeScript
- RxJS
- Angular Router
- Browser `localStorage` API

**Backend (optional)**

- Node.js
- Express
- TypeScript
- Simple JSON API for recipe generation (`POST /api/recipe`)

The frontend can run on its own (pure SPA in the browser) or talk to the backend service when you want to centralize AI‑style recipe generation.

---

### Project Structure

```text
cooking-lovers-application/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── add-recipe/       # Form to add or generate recipes
│   │   │   ├── recipe-list/      # List of all recipes
│   │   │   └── shopping-list/    # Shopping list view
│   │   ├── models/
│   │   │   └── recipe.model.ts   # Recipe data model
│   │   ├── services/
│   │   │   ├── recipe.service.ts    # Recipe CRUD and local storage
│   │   │   └── ai-recipe.service.ts # Recipe generation (backend/fallback)
│   │   ├── app.component.* # Root component + navigation
│   │   └── app.routes.ts         # Client‑side routes
│   ├── index.html
│   ├── main.ts                   # Angular entry point
│   └── styles.css
└── backend/
    ├── src/
    │   └── index.ts              # Express server with /api/recipe endpoint
    ├── package.json
    └── tsconfig.json
```
