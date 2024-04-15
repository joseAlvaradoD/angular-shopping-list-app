import { EventEmitter } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";

export class RecipeService{
  private recipes: Recipe[] = [
    new Recipe(
      "Test Recipe", 
      "some description", 
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272",
      [
        new Ingredient("Meat", 1),
        new Ingredient("French Fries",20),
      ]),
    new Recipe(
      "Test Recipe 2", 
      "some description", 
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272",
      [
        new Ingredient("Buns", 2),
        new Ingredient("Meat",1),
      ])
  ];
  getRecipes():Recipe[]{
    return this.recipes;
  }

  getRecipe(idx: number): Recipe{
    return this.recipes[idx];
  }
  
  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();
}