import { Component } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipeSelected: Recipe;

  onSelectRecipe(recipeSelected: Recipe): void{
    this.recipeSelected = recipeSelected;
  }

}
