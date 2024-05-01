import { Action, createAction, props } from "@ngrx/store";
import { Recipe } from "../models/recipe.model";

export const fetch = createAction(
  '[Recipes] fetch'
);

export const fetchSuccess = createAction(
  '[Recipes] fetch-success',
  props<{value: Recipe[]}>()
);

/*
export class FetchAction implements Action{
  readonly type: string = '[Recipes] fetch';
  constructor(public value: Recipe[]){
  }
}
*/