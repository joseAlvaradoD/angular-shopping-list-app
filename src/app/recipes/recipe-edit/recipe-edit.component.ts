import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ingredient } from '../../models/ingredient.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        this.id = params['id'];
        this.initForm();
      }
    )
  }

  private initForm():void {
    let recipe: Recipe;
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      recipe = this.recipeService.getRecipe(this.id);
      if(recipe['ingredients']){
        recipe.ingredients.forEach(
          (ingredient: Ingredient) => {
            recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount, [Validators.required,
                Validators.pattern(/^[1-9][0-9]*$/)])
            }));
          }
        );
      }
    }else{
      recipe = new Recipe("", "", "", []);
    }


    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient():void{
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/)])
      })
    );
  }

  getIngredientControls(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit():void{

    if(this.editMode){
      this.recipeService.uppdateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel(): void{
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number): void{
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

}
