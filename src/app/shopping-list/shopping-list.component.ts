import { Component } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [];

  onAddIngredient(ingredient: Ingredient): void{
    this.ingredients.push(ingredient);
  }
}
