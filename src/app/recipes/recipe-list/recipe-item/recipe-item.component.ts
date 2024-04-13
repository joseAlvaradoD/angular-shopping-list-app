import { Attribute, Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  onSelectRecipe(recipeSelected: Recipe): void{
    this.recipeSelected.emit(recipeSelected);
  }
}
