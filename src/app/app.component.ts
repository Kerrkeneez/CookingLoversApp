import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

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

        <!-- THEME TOGGLE -->
        <button class="theme-btn" (click)="toggleTheme()">
          {{ isDarkTheme ? '☀️' : '🌙' }}
        </button>
      </nav>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Cooking Lovers Application';
  isDarkTheme = false;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(this.isDarkTheme ? 'dark-theme' : 'light-theme');
  }
}




