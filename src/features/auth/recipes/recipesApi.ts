import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateRecipe, Recipe } from "./recipesTypes";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    addRecipe: builder.mutation<Recipe, CreateRecipe>({
      query: (recipe) => ({
        url: "/recipes/add",
        method: "POST",
        body: recipe,
      }),
      invalidatesTags: ["Recipes"],
    }),

    deleteRecipe: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `recipes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const { useAddRecipeMutation, useDeleteRecipeMutation } = recipesApi;
