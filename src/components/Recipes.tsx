import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { Card } from "./ui/card";
import { fetchRecipes } from "@/features/auth/recipes/recipeThunks";
import Rating from "@mui/material/Rating";
import { ClockIcon, Trash2Icon } from "lucide-react";

import { useDeleteRecipeMutation } from "@/features/auth/recipes/recipesApi";
import { toast } from "react-toastify";
import type { Recipe } from "@/features/auth/recipes/recipesTypes";

type RecipesProps = {
  recipes: Recipe[];
  onOpenEdit: (recipe: Recipe) => void;
};

export const Recipes = ({ onOpenEdit }: RecipesProps) => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.recipes);
  const isLoggedIn = useAppSelector((state) => !!state.auth.user);
  const [deleteRecipe, { isLoading }] = useDeleteRecipeMutation();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading) {
    return <div>Loading recipes...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteRecipe(id).unwrap();
      toast.success("Recipe deleted successfully");
    } catch (error) {
      toast.error("Failed to delete recipe");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-5 my-5">
      {items.map((recipe) => (
        <Card key={recipe.id} className="p-4 border-none shadow-md">
          <div className="w-full overflow-hidden rounded-md">
            <img src={recipe.image} />
          </div>

          <h2 className="text-lg font-semibold mt-2">{recipe.name}</h2>

          {/* <h2 className="text-lg font-semibold mt-2">{recipe.name}</h2> */}
          <div className="flex gap-5">
            <div className="flex gap-2">
              <Rating
                name="read-only"
                value={recipe.rating}
                readOnly
                size="small"
              />
              {recipe.rating}
            </div>
            <div className="flex items-center justify-center">
              <ClockIcon className="inline-block w-4 h-4 mr-1" />
              {recipe.cookTimeMinutes} mins
            </div>
          </div>

          {isLoggedIn && (
            <div className="flex justify-between items-center ">
              <button
                className="text-orange-600 underline font-bold"
                onClick={() => onOpenEdit(recipe)}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(recipe.id)}
                disabled={isLoading}
              >
                <Trash2Icon className="w-5 h-5 text-red-600" />
              </button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
