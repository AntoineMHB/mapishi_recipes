import { createSlice } from "@reduxjs/toolkit";
import type { Recipe } from "./recipesTypes";
import { fetchRecipes, searchRecipes } from "./recipeThunks";

type RecipesState = {
  items: Recipe[];
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
};

const initialState: RecipesState = {
  items: [],
  total: 0,
  skip: 0,
  limit: 10,
  loading: false,
  error: null,
  searchQuery: "",
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    clearSearch(state) {
      state.searchQuery = "";
      state.items = [];
      state.total = 0;
      state.skip = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipes.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.searchQuery = action.meta.arg;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.recipes;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to search recipes";
      })
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
        (state: RecipesState, action: { payload: string | undefined }) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch recipes";
        },
      );
  },
});

export const { clearSearch } = recipeSlice.actions;
export default recipeSlice.reducer;
