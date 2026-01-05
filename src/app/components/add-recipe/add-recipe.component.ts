import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AIRecipeService } from '../../services/ai-recipe.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h1>Add New Recipe</h1>
      
      <!-- AI Recipe Suggestion Section -->
      <div class="ai-section" style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin-bottom: 30px; border: 2px solid #667eea;">
        <h2 style="color: #667eea; margin-bottom: 15px; font-size: 1.2rem;">
          🤖 AI Recipe Assistant
        </h2>
        <p style="color: #666; margin-bottom: 15px; font-size: 0.9rem;">
          Get AI-powered recipe suggestions! Describe what you'd like to cook (e.g., "Italian pasta", "chicken dinner", "vegetarian curry").
        </p>
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <input 
            type="text" 
            [(ngModel)]="aiPrompt" 
            name="aiPrompt"
            placeholder="e.g., Quick pasta dish for dinner"
            style="flex: 1; padding: 10px; border: 2px solid #e0e0e0; border-radius: 6px;"
            (keyup.enter)="generateAIRecipe()"
            [disabled]="isGenerating">
          <button 
            type="button" 
            class="btn" 
            (click)="generateAIRecipe()"
            [disabled]="!aiPrompt.trim() || isGenerating"
            style="white-space: nowrap;">
            <span *ngIf="!isGenerating">✨ Generate Recipe</span>
            <span *ngIf="isGenerating">⏳ Generating...</span>
          </button>
        </div>

        <div *ngIf="!aiRecipeService.getApiKey()" style="background: #fff3cd; padding: 12px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #ffc107;">
          <p style="margin: 0 0 10px 0; color: #856404; font-size: 0.85rem;">
            <strong>Note:</strong> For full AI features, add your OpenAI API key. Otherwise, you'll get smart fallback suggestions.
          </p>
          <div style="display: flex; gap: 10px;">
            <input 
              type="password" 
              [(ngModel)]="apiKeyInput" 
              name="apiKeyInput"
              placeholder="OpenAI API Key (optional)"
              style="flex: 1; padding: 8px; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 0.9rem;">
            <button 
              type="button" 
              class="btn btn-secondary" 
              (click)="saveApiKey()"
              style="padding: 8px 16px; font-size: 0.9rem;">
              Save Key
            </button>
          </div>
        </div>

        <div *ngIf="aiError" style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 0.9rem;">
          {{ aiError }}
        </div>
      </div>
      
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Recipe Title:</label>
          <input 
            type="text" 
            id="title" 
            [(ngModel)]="title" 
            name="title"
            required
            placeholder="e.g., Chocolate Chip Cookies">
        </div>

        <div class="form-group">
          <label>Ingredients:</label>
          <div class="ingredients-input">
            <input 
              type="text" 
              [(ngModel)]="newIngredient" 
              name="newIngredient"
              placeholder="Add an ingredient"
              (keyup.enter)="addIngredient()">
            <button type="button" class="btn" (click)="addIngredient()">Add</button>
          </div>
          <ul class="ingredients-list" *ngIf="ingredients.length > 0">
            <li *ngFor="let ingredient of ingredients; let i = index">
              <span>{{ ingredient }}</span>
              <button type="button" (click)="removeIngredient(i)">Remove</button>
            </li>
          </ul>
        </div>

        <div class="form-group">
          <label>Steps:</label>
          <div class="steps-input">
            <textarea 
              [(ngModel)]="newStep" 
              name="newStep"
              placeholder="Add a step"></textarea>
            <button type="button" class="btn" (click)="addStep()">Add</button>
          </div>
          <ol class="steps-list" *ngIf="steps.length > 0">
            <li *ngFor="let step of steps; let i = index">
              {{ step }}
              <button type="button" class="btn btn-danger" style="margin-left: 10px; padding: 4px 10px; font-size: 12px;" (click)="removeStep(i)">Remove</button>
            </li>
          </ol>
        </div>

        <button type="submit" class="btn" [disabled]="!title || ingredients.length === 0 || steps.length === 0">
          Save Recipe
        </button>
        <button type="button" class="btn btn-secondary" (click)="resetForm()" style="margin-left: 10px;">
          Reset
        </button>
      </form>
    </div>
  `,
  styles: []
})
export class AddRecipeComponent {
  title: string = '';
  ingredients: string[] = [];
  steps: string[] = [];
  newIngredient: string = '';
  newStep: string = '';
  aiPrompt: string = '';
  apiKeyInput: string = '';
  isGenerating: boolean = false;
  aiError: string = '';

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    public aiRecipeService: AIRecipeService
  ) {}

  addIngredient(): void {
    if (this.newIngredient.trim()) {
      this.ingredients.push(this.newIngredient.trim());
      this.newIngredient = '';
    }
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }

  addStep(): void {
    if (this.newStep.trim()) {
      this.steps.push(this.newStep.trim());
      this.newStep = '';
    }
  }

  removeStep(index: number): void {
    this.steps.splice(index, 1);
  }

  onSubmit(): void {
    if (this.title && this.ingredients.length > 0 && this.steps.length > 0) {
      this.recipeService.addRecipe({
        title: this.title,
        ingredients: this.ingredients,
        steps: this.steps
      });
      this.resetForm();
      this.router.navigate(['/recipes']);
    }
  }

  resetForm(): void {
    this.title = '';
    this.ingredients = [];
    this.steps = [];
    this.newIngredient = '';
    this.newStep = '';
    this.aiPrompt = '';
    this.aiError = '';
  }

  generateAIRecipe(): void {
    if (!this.aiPrompt.trim() || this.isGenerating) {
      return;
    }

    this.isGenerating = true;
    this.aiError = '';

    this.aiRecipeService.generateRecipe(this.aiPrompt).subscribe({
      next: (recipe) => {
        this.title = recipe.title;
        this.ingredients = [...recipe.ingredients];
        this.steps = [...recipe.steps];
        this.aiPrompt = '';
        this.isGenerating = false;
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {
        this.aiError = 'Failed to generate recipe. Using fallback suggestion.';
        this.isGenerating = false;
        console.error('AI Recipe generation error:', error);
      }
    });
  }

  saveApiKey(): void {
    if (this.apiKeyInput.trim()) {
      this.aiRecipeService.setApiKey(this.apiKeyInput.trim());
      this.apiKeyInput = '';
      alert('API key saved! You can now use full AI features.');
    }
  }
}

