import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { Subject } from "rxjs";

export class RecipeService{
  recipeSelected: Subject<Recipe> = new Subject<Recipe>();

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

  addRecipe(recipe: Recipe):void{
    this.recipes.push(recipe);
  }

  uppdateRecipe(index: number, recipe: Recipe):void{
    this.recipes[index] = recipe;
  }

  deleteRecipe(index: number): void{
    this.recipes.splice(index, 1);
  }

}
