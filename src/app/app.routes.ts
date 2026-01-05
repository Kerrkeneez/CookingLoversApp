import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadComponent: () => import('./components/recipe-list/recipe-list.component').then(m => m.RecipeListComponent)
  },
  {
    path: 'add-recipe',
    loadComponent: () => import('./components/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent)
  },
  {
    path: 'shopping-list',
    loadComponent: () => import('./components/shopping-list/shopping-list.component').then(m => m.ShoppingListComponent)
  }
];

