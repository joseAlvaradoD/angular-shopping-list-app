import { Recipe } from "../models/recipe.model";

export const selectFetch = (state: {recipes: Recipe[]}) => state.recipes;