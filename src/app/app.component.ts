import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container">
      <nav class="nav">
        <a routerLink="/recipes" routerLinkActive="active">Recipe List</a>
        <a routerLink="/add-recipe" routerLinkActive="active">Add Recipe</a>
        <a routerLink="/shopping-list" routerLinkActive="active">Shopping List</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Cooking Lovers Application';
}

