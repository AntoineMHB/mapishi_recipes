import { createSlice } from "@reduxjs/toolkit";
import reducer from "../authSlice";
import type { Recipe } from "./recipesTypes";
import { fetchRecipes } from "./recipeThunks";

type RecipesState = {
  items: Recipe[];
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error: string | null;
};

const initialState: RecipesState = {
  items: [],
  total: 0,
  skip: 0,
  limit: 10,
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchRecipes.pending, (state: RecipesState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipes.fulfilled,
        (
          state: RecipesState,
          action: {
            payload: {
              recipes: Recipe[];
              total: number;
              skip: number;
              limit: number;
            };
          },
        ) => {
          state.loading = false;
          state.items = action.payload.recipes;
          state.total = action.payload.total;
          state.skip = action.payload.skip;
          state.limit = action.payload.limit;
        },
      )
      .addCase(
        fetchRecipes.rejected,
        (state: RecipesState, action: { payload: string }) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch recipes";
        },
      );
  },
});

export default recipeSlice.reducer;
