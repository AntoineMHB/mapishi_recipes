import { useAddRecipeMutation } from "@/features/auth/recipes/recipesApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type AddRecipeFormValues = {
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

export default function AddRecipeForm({ onClose }: { onClose: () => void }) {
  const [addRecipe, { isLoading }] = useAddRecipeMutation();

  const form = useForm<AddRecipeFormValues>({
    defaultValues: {
      name: "",
      ingredients: "",
      instructions: "",
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 1,
      difficulty: "Easy",
      cuisine: "",
      caloriesPerServing: 0,
      tags: "",
      image: "",
      mealType: "",
    },
  });

  const onSubmit = async (values: AddRecipeFormValues) => {
    const payload = {
      ...values,
      ingredients: values.ingredients.split(",").map((i) => i.trim()),
      instructions: values.instructions.split("\n").map((i) => i.trim()),
      tags: values.tags.split(",").map((i) => i.trim()),
      mealType: values.mealType.split(",").map((i) => i.trim()),
      rating: 0,
      reviewCount: 0,
    };

    try {
      await addRecipe(payload).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold text-center text-[#FF9A0E] mb-6">
          Add Recipe
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

            {/* <FormField
              control={form.control}
              name="cuisine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}

            {/* <FormField
              control={form.control}
              name="caloriesPerServing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}

            {/* <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Comma separated" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}

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
                {isLoading ? "Adding..." : "Add Recipe"}
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
