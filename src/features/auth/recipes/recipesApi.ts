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

    updateRecipe: builder.mutation<
      Recipe,
      { id: number; data: Partial<Recipe> }
    >({
      query: ({ id, data }) => ({
        url: `recipes/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddRecipeMutation,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
} = recipesApi;
