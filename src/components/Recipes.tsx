import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { use, useEffect } from "react";
import { Card } from "./ui/card";
import { fetchRecipes } from "@/features/auth/recipes/recipeThunks";
import Rating from "@mui/material/Rating";
import { ClockIcon } from "lucide-react";

export const Recipes = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading) {
    return <div>Loading recipes...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-5 my-5">
      {items.map((recipe) => (
        <Card key={recipe.id} className="p-4 border-none shadow-md">
          <div className="w-full overflow-hidden rounded-md">
            <img src={recipe.image} />
          </div>

          <h2 className="text-lg font-semibold mt-2">{recipe.name}</h2>
          <div className="flex gap-5">
            <div className="flex gap-2">
              {/* ⭐ */}

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
        </Card>
      ))}
    </div>
  );
};
