import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';

interface ShoppingItem {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>Shopping List</h1>
      
      <button class="btn generate-btn" (click)="generateShoppingList()">
        Generate Shopping List from Recipes
      </button>

      <div *ngIf="shoppingItems.length === 0" class="empty-state">
        <h2>No items in shopping list</h2>
        <p>Click the button above to generate a shopping list from your recipes.</p>
      </div>

      <ul class="shopping-list" *ngIf="shoppingItems.length > 0">
        <li *ngFor="let item of shoppingItems">
          <input 
            type="checkbox" 
            [id]="'item-' + item.name"
            [checked]="item.checked"
            (change)="toggleItem(item)">
          <label [for]="'item-' + item.name">{{ item.name }}</label>
        </li>
      </ul>

      <div *ngIf="shoppingItems.length > 0" style="margin-top: 20px;">
        <button class="btn btn-secondary" (click)="clearList()">Clear List</button>
      </div>
    </div>
  `,
  styles: []
})
export class ShoppingListComponent implements OnInit {
  shoppingItems: ShoppingItem[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadShoppingList();
  }

  generateShoppingList(): void {
    const ingredients = this.recipeService.getAllIngredients();
    this.shoppingItems = ingredients.map(ingredient => ({
      name: ingredient,
      checked: false
    }));
    this.saveShoppingList();
  }

  toggleItem(item: ShoppingItem): void {
    item.checked = !item.checked;
    this.saveShoppingList();
  }

  clearList(): void {
    if (confirm('Are you sure you want to clear the shopping list?')) {
      this.shoppingItems = [];
      this.saveShoppingList();
    }
  }

  private saveShoppingList(): void {
    localStorage.setItem('shoppingList', JSON.stringify(this.shoppingItems));
  }

  private loadShoppingList(): void {
    const saved = localStorage.getItem('shoppingList');
    if (saved) {
      this.shoppingItems = JSON.parse(saved);
    }
  }
}

