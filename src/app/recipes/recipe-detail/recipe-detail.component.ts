import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../../shared/dropdown.directive';

@Component({
  standalone: true,
  imports:[
    RouterModule,
    CommonModule,
    DropdownDirective
  ],
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ){

  }

  ngOnInit(): void {
    //const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  addIngredients(): void{
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe(): void{
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
