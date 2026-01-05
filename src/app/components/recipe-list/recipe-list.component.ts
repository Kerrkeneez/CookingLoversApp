import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>Recipe List</h1>
      
      <div *ngIf="recipes.length === 0" class="empty-state">
        <h2>No recipes yet!</h2>
        <p>Start by adding your first recipe.</p>
      </div>

      <div class="recipe-list" *ngIf="recipes.length > 0">
        <div class="recipe-item" *ngFor="let recipe of recipes">
          <h2 class="recipe-title">{{ recipe.title }}</h2>
          
          <div class="recipe-section" *ngIf="recipe.ingredients.length > 0">
            <h3>Ingredients:</h3>
            <ul>
              <li *ngFor="let ingredient of recipe.ingredients">{{ ingredient }}</li>
            </ul>
          </div>

          <div class="recipe-section" *ngIf="recipe.steps.length > 0">
            <h3>Steps:</h3>
            <ol>
              <li *ngFor="let step of recipe.steps">{{ step }}</li>
            </ol>
          </div>

          <div class="recipe-actions">
            <button class="btn btn-danger" (click)="deleteRecipe(recipe.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  deleteRecipe(id: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id);
      this.loadRecipes();
    }
  }
}

