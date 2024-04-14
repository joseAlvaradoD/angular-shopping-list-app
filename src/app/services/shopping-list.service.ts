import { Ingredient } from "../models/ingredient.model";

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
  }
}
