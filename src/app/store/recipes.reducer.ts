import { ActionReducer, createReducer, on } from "@ngrx/store";
import { Recipe } from "../models/recipe.model";
import { fetchSuccess } from "./recipes.actions";

const initialState: Recipe[] = [new Recipe('ngrx', '', '', [])];

export const recipesReducer: ActionReducer<Recipe[]> = createReducer(
  initialState,
  on(fetchSuccess, (state, action) => action.value)
);

/*
export function recipesReducer(state: Recipe[] = initialState): Recipe[]{
  return state;
}
*/ 