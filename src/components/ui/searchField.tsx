import { Search } from "lucide-react";
import { Input } from "./input";
import { useAppDispatch } from "@/app/hooks";
import { useEffect, useState } from "react";
import { searchRecipes } from "@/features/auth/recipes/recipeThunks";

export const SearchField = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) return;

    const timeout = setTimeout(() => {
      dispatch(searchRecipes(query));
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  return (
    <div className="relative w-[367px]">
      <Input
        className="h-[51px] pr-10"
        placeholder="Search a recie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Search
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={20}
      />
    </div>
  );
};
