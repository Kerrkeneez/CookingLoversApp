# Cooking Lovers Application

A modern Angular application for collecting, managing, and sharing recipes with AI-powered recipe generation and automatic shopping list creation.

## Features

- **Recipe Management**: Create, view, and delete recipes with ingredients and step-by-step instructions
- **AI Recipe Generation**: Get AI-powered recipe suggestions using OpenAI (optional, with fallback support)
- **Shopping List**: Automatically generate shopping lists from all your recipes
- **Local Storage**: All recipes and shopping lists are saved locally in your browser
- **Modern UI**: Clean, responsive interface with intuitive navigation

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js) or **yarn**

## How to Run

### 1. Install Dependencies

First, navigate to the project directory and install all required dependencies:

```bash
npm install
```

### 2. Start the Development Server

Run the Angular development server:

```bash
npm start
```

The application will be available at `http://localhost:4200/` by default.

### 3. Build for Production (Optional)

To create a production build:

```bash
npm run build
```

The production files will be generated in the `dist/cooking-lovers-application` directory.

## How It Works

### Application Structure

The app consists of three main views accessible via the navigation bar:

1. **Recipe List** (`/recipes`): Displays all saved recipes with their ingredients and cooking steps
2. **Add Recipe** (`/add-recipe`): Form to manually add recipes or generate them using AI
3. **Shopping List** (`/shopping-list`): View and manage a shopping list generated from all recipes

### Data Persistence

- **Recipes**: Stored in browser's `localStorage` under the key `recipes`
- **Shopping List**: Stored in `localStorage` under the key `shoppingList`
- **API Key**: If provided, OpenAI API key is stored in `localStorage` under `openai_api_key`

### AI Recipe Generation (Optional)

The app includes an AI recipe assistant powered by OpenAI:

1. **With API Key**: 
   - Enter your OpenAI API key in the "Add Recipe" page
   - The app will use GPT-3.5-turbo to generate recipes based on your prompts
   - Example prompts: "Italian pasta", "chicken dinner", "vegetarian curry"

2. **Without API Key**:
   - The app provides smart fallback recipe suggestions
   - Works for common keywords like "pasta" or "chicken"
   - No external API calls required

### Shopping List Generation

- Click "Generate Shopping List from Recipes" to automatically collect all unique ingredients from your saved recipes
- Ingredients are sorted alphabetically
- Check off items as you shop
- Your progress is saved automatically

### Technologies Used

- **Angular 17**: Modern framework with standalone components
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming for async operations
- **Angular Router**: Client-side routing
- **localStorage API**: Browser-based data persistence
- **OpenAI API**: AI recipe generation (optional)

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── add-recipe/          # Recipe creation form with AI support
│   │   ├── recipe-list/          # Display all recipes
│   │   └── shopping-list/        # Shopping list management
│   ├── models/
│   │   └── recipe.model.ts       # Recipe data model
│   ├── services/
│   │   ├── recipe.service.ts     # Recipe CRUD operations
│   │   └── ai-recipe.service.ts  # AI recipe generation
│   ├── app.component.ts          # Main app component with navigation
│   └── app.routes.ts             # Route configuration
├── index.html
├── main.ts                       # Application entry point
└── styles.css
```

## Development

### Available Scripts

- `npm start` or `ng serve`: Start development server
- `npm run build`: Build for production
- `npm run watch`: Build and watch for changes
- `npm test`: Run unit tests

### Adding New Features

The application uses Angular standalone components, making it easy to add new features:

1. Create new components in `src/app/components/`
2. Add routes in `src/app/app.routes.ts`
3. Add navigation links in `src/app/app.component.ts`

## Notes

- All data is stored locally in your browser - clearing browser data will remove your recipes
- The OpenAI API key is stored locally and never sent to any server except OpenAI
- The app works fully offline (except for AI features when using OpenAI API)
