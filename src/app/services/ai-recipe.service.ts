import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';

interface AIRecipeResponse {
  title: string;
  ingredients: string[];
  steps: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AIRecipeService {
  private apiKey: string | null = null;
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {
    // Try to load API key from localStorage
    this.apiKey = localStorage.getItem('openai_api_key');
  }

  setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('openai_api_key', key);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  generateRecipe(prompt: string): Observable<AIRecipeResponse> {
    // Call your backend instead of OpenAI directly
    return this.http.post<AIRecipeResponse>('http://localhost:3000/api/recipe', { prompt });
  }


  // generateRecipe(prompt: string): Observable<AIRecipeResponse> {
  //   if (!this.apiKey) {
  //     // Return a fallback recipe suggestion if no API key
  //     return of(this.getFallbackRecipe(prompt));
  //   }

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.apiKey}`
  //   });

  //   const systemPrompt = `You are a helpful cooking assistant. Generate a recipe based on the user's request. 
  //   Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just pure JSON):
  //   {
  //     "title": "Recipe Name",
  //     "ingredients": ["ingredient 1", "ingredient 2", ...],
  //     "steps": ["step 1", "step 2", ...]
  //   }
  //   Make sure the recipe is practical and the steps are clear.`;

  //   const body = {
  //     model: 'gpt-3.5-turbo',
  //     messages: [
  //       { role: 'system', content: systemPrompt },
  //       { role: 'user', content: `Generate a recipe for: ${prompt}` }
  //     ],
  //     temperature: 0.7,
  //     max_tokens: 1000
  //   };

  //   return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
  //     map(response => {
  //       try {
  //         const content = response.choices[0]?.message?.content || '';
  //         // Try to extract JSON from the response (in case it's wrapped in markdown)
  //         const jsonMatch = content.match(/\{[\s\S]*\}/);
  //         const jsonStr = jsonMatch ? jsonMatch[0] : content;
  //         const recipe = JSON.parse(jsonStr);
          
  //         return {
  //           title: recipe.title || 'AI Generated Recipe',
  //           ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
  //           steps: Array.isArray(recipe.steps) ? recipe.steps : []
  //         };
  //       } catch (error) {
  //         console.error('Error parsing AI response:', error);
  //         return this.getFallbackRecipe(prompt);
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('AI API Error:', error);
  //       return of(this.getFallbackRecipe(prompt));
  //     })
  //   );
  // }

  private getFallbackRecipe(prompt: string): AIRecipeResponse {
    // Fallback recipe suggestions when API is not available
    const fallbackRecipes: { [key: string]: AIRecipeResponse } = {
      'pasta': {
        title: 'Classic Spaghetti Aglio e Olio',
        ingredients: [
          '400g spaghetti',
          '4 cloves garlic, sliced',
          '1/2 cup olive oil',
          '1/2 tsp red pepper flakes',
          'Fresh parsley, chopped',
          'Salt and pepper to taste'
        ],
        steps: [
          'Cook spaghetti according to package directions until al dente',
          'Heat olive oil in a large pan over medium heat',
          'Add garlic and red pepper flakes, cook until fragrant (about 2 minutes)',
          'Drain pasta, reserving 1/2 cup pasta water',
          'Add pasta to the pan with garlic oil',
          'Toss with pasta water, parsley, salt and pepper',
          'Serve immediately'
        ]
      },
      'chicken': {
        title: 'Lemon Herb Roasted Chicken',
        ingredients: [
          '4 chicken breasts',
          '2 lemons, juiced',
          '3 tbsp olive oil',
          '2 cloves garlic, minced',
          '1 tsp dried oregano',
          '1 tsp dried thyme',
          'Salt and pepper to taste'
        ],
        steps: [
          'Preheat oven to 400°F (200°C)',
          'Mix lemon juice, olive oil, garlic, oregano, and thyme in a bowl',
          'Season chicken breasts with salt and pepper',
          'Place chicken in a baking dish and pour marinade over it',
          'Roast for 25-30 minutes until chicken is cooked through',
          'Let rest for 5 minutes before serving'
        ]
      }
    };

    const lowerPrompt = prompt.toLowerCase();
    for (const key in fallbackRecipes) {
      if (lowerPrompt.includes(key)) {
        return fallbackRecipes[key];
      }
    }

    // Default fallback
    return {
      title: `Custom ${prompt} Recipe`,
      ingredients: [
        'Main ingredient',
        'Seasoning',
        'Oil or butter',
        'Salt and pepper'
      ],
      steps: [
        'Prepare your ingredients',
        'Follow your preferred cooking method',
        'Season to taste',
        'Serve and enjoy!'
      ]
    };
  }
}

