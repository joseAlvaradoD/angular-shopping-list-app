import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {

  constructor(private shoppingListService: ShoppingListService){}

  ingredients(): Ingredient[]{
    return this.shoppingListService.getIngredients();
  }
}
