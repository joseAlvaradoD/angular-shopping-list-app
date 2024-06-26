import { Component} from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports:[
    ShoppingEditComponent,
    CommonModule
  ],
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent{

  constructor(private shoppingListService: ShoppingListService){}

  ingredients(): Ingredient[]{
    return this.shoppingListService.getIngredients();
  }

  onEditItem(index: number): void{
    this.shoppingListService.startingEditing.next(index);
  }
}
