import { createAsyncThunk } from "@reduxjs/toolkit";
import { type Recipe, type RecipesResponse } from "./recipesTypes";
import { api } from "@/services/api";

type SearchResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};

export const searchRecipes = createAsyncThunk<
  SearchResponse,
  string,
  { rejectValue: string }
>("recipes/search", async (query: string, { rejectWithValue }) => {
  try {
    const response = await api.get<SearchResponse>("/recipes/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error: any) {
    return (
      rejectWithValue(error.response?.data?.message) ||
      "Failed to search recipes"
    );
  }
});

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
