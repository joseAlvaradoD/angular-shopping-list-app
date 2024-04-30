import { Subject } from "rxjs";
import { Ingredient } from "../models/ingredient.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  startingEditing:Subject<number> = new Subject<number>();

  constructor(){
    this.addIngredient(new Ingredient("Apple", 1));
    this.addIngredient(new Ingredient("Bread", 1));
  }

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
  }

  updateIngredient(index: number, ingredient: Ingredient): void{
    this.ingredients[index] = ingredient;
  }

  deleteIngredient(index: number): void{
    this.ingredients.splice(index, 1);
  }

  getIngredeint(index: number): Ingredient{
    return this.ingredients[index];
  }
}
