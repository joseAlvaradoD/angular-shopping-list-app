import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{

  recipeSelected: Recipe;

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    /*
    this.recipeService.recipeSelected.next(recipe: Recipe);
    */
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.recipeSelected = recipe;
      });
  }

}
