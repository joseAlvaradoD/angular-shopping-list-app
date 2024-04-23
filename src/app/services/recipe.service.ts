import { Recipe } from "../models/recipe.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeService{
  recipeSelected: Subject<Recipe> = new Subject<Recipe>();
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipes():Recipe[]{
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]):void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(idx: number): Recipe{
    return this.recipes[idx];
  }

  addRecipe(recipe: Recipe):void{
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  uppdateRecipe(index: number, recipe: Recipe):void{
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void{
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
