import { useAppSelector } from "@/app/hooks";
import AddRecipeForm from "@/components/AddRecipeForm";
import EditRecipeForm from "@/components/EditRecipeForm";

import Header from "@/components/header";
import { Recipes } from "@/components/Recipes";
import { TopNavBar } from "@/components/TopNavBar";

import type { Recipe } from "@/features/auth/recipes/recipesTypes";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { items } = useAppSelector((state) => state.recipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOpenEdit = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsEditMode(true);
  };

  const handleClose = () => {
    setSelectedRecipe(null);
    setIsEditMode(false);
  };

  return (
    <div>
      <TopNavBar onOpen={() => setIsOpen(true)} />

      <div
        className={`w-full min-h-screen flex flex-col items-center bg-[#FFF8F0] pb-10 ${isOpen ? "blur-sm pointer-events-none" : ""}`}
      >
        <Header />

        <Recipes recipes={items} onOpenEdit={handleOpenEdit} />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <AddRecipeForm onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}

      {selectedRecipe && isEditMode && (
        <EditRecipeForm recipe={selectedRecipe} onClose={handleClose} />
      )}
    </div>
  );
}
