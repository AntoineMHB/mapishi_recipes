import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import recipesReducer from "../features/auth/recipes/recipeSlice";
import { recipesApi } from "@/features/auth/recipes/recipesApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
