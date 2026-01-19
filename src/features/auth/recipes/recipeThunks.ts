import { createAsyncThunk } from "@reduxjs/toolkit";
import { type RecipesResponse } from "./recipesTypes";
import { api } from "@/services/api";

export const fetchRecipes = createAsyncThunk<
  RecipesResponse,
  void,
  { rejectValue: string }
>("recipes", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/recipes");
    return response.data;
  } catch (error: any) {
    return (
      rejectWithValue(error.response?.data?.message) ||
      "Failed to fetch recipes"
    );
  }
});
