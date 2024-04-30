import { Component, Input} from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    RouterModule
  ],
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number

  constructor(){}

}
