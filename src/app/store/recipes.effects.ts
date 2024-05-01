import { Actions, createEffect, ofType } from "@ngrx/effects";
import { fetch, fetchSuccess } from "./recipes.actions";
import { map, switchMap } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipesEffects{

  constructor(
    private actions$: Actions,
    private dataStorageService: DataStorageService
  ){}

  fetchRecipes = createEffect(
    () => this.actions$.pipe(
      ofType(fetch),
      switchMap(()  => 
        this.dataStorageService.fetchRecipes().pipe(
          map(recipes => fetchSuccess({value: recipes}))
        )
      )
    )
  );
}