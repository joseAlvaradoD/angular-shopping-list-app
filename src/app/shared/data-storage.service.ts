import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from "rxjs/operators";

import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes(): void{
    const recipes: Recipe[] = this.recipeService.getRecipes();

    this.httpClient.put(
      'https://ng-course-recipe-book-d8d9e-default-rtdb.firebaseio.com/recipes.json',
      recipes
    )
    .subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes(): Observable<Recipe[]>{
      return this.httpClient.get<Recipe[]>(
        'https://ng-course-recipe-book-d8d9e-default-rtdb.firebaseio.com/recipes.json'
      ).pipe(
        map(recipes => {
          return recipes.map(recipe => {
              return {
                ... recipe, 
                ingredientes: recipe.ingredients ? recipe.ingredients : []
              };
            }
          );
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
    
  }

}
