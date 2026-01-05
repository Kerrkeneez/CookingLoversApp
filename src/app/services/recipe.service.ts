import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];
  private nextId = 1;

  constructor() {
    // Load from localStorage if available
    const saved = localStorage.getItem('recipes');
    if (saved) {
      this.recipes = JSON.parse(saved);
      if (this.recipes.length > 0) {
        this.nextId = Math.max(...this.recipes.map(r => r.id)) + 1;
      }
    }
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipe(id: number): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): Recipe {
    const newRecipe: Recipe = {
      ...recipe,
      id: this.nextId++
    };
    this.recipes.push(newRecipe);
    this.saveToLocalStorage();
    return newRecipe;
  }

  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.saveToLocalStorage();
  }

  getAllIngredients(): string[] {
    const allIngredients: string[] = [];
    this.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (!allIngredients.includes(ingredient)) {
          allIngredients.push(ingredient);
        }
      });
    });
    return allIngredients.sort();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }
}

