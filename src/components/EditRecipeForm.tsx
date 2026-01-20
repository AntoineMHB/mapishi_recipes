import { useUpdateRecipeMutation } from "@/features/auth/recipes/recipesApi";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import type { Recipe } from "@/features/auth/recipes/recipesTypes";

type EditRecipeFormValues = {
  name: string;
  ingredients: string;
  instructions: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string;
  image: string;
  mealType: string;
};

type Props = {
  recipe: Recipe;
  onClose: () => void;
};

export default function EditRecipeForm({ recipe, onClose }: Props) {
  const [updateRecipe, { isLoading }] = useUpdateRecipeMutation();

  const form = useForm<EditRecipeFormValues>({
    defaultValues: {
      name: "",
      ingredients: "",
      instructions: "",
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 1,
      difficulty: "",
      cuisine: "",
      caloriesPerServing: 0,
      tags: "",
      image: "",
      mealType: "",
    },
  });

  const onSubmit = async (values: EditRecipeFormValues) => {
    const payload = {
      ...values,
      ingredients: values.ingredients.split(",").map((i) => i.trim()),
      instructions: values.instructions.split("\n").map((i) => i.trim()),
      tags: values.tags.split(",").map((i) => i.trim()),
      mealType: values.mealType.split(",").map((i) => i.trim()),
    };

    try {
      await updateRecipe({ id: recipe.id, data: payload }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update recipe:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold text-center text-[#FF9A0E] mb-6">
          Edit Recipe
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipe Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Chicken Curry" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredients</FormLabel>
                    <FormControl>
                      <Input placeholder="Comma separated" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="One step per line" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="prepTimeMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prep Time (min)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cookTimeMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cook Time (min)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servings</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mealType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Breakfast, Lunch" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#FF9A0E]"
              >
                {isLoading ? "Updating..." : "Update Recipe"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
