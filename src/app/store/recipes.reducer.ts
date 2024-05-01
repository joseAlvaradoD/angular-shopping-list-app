import { ActionReducer, createReducer, on } from "@ngrx/store";
import { Recipe } from "../models/recipe.model";
import { fetch } from "./recipes.actions";

const initialState: Recipe[] = [new Recipe('ngrx', '', '', [])];

export const recipesReducer: ActionReducer<Recipe[]> = createReducer(
  initialState,
  on(fetch, (state, action) => action.value)
);

/*
export function recipesReducer(state: Recipe[] = initialState): Recipe[]{
  return state;
}
*/ 