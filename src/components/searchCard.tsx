"use client";

import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clearSearch } from "@/features/auth/recipes/recipeSlice";
import {
  fetchRecipes,
  searchRecipes,
} from "@/features/auth/recipes/recipeThunks";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchCardProps {
  onSearch?: (query: string) => void;
}

export default function SearchCard({ onSearch }: SearchCardProps) {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      dispatch(clearSearch());
      dispatch(fetchRecipes());
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(searchRecipes(query));
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  const handleSearch = () => {
    if (!query.trim()) return;
    dispatch(searchRecipes(query));

    if (!query.trim()) {
      dispatch(clearSearch());
    }
  };
  return (
    <div>
      <Card className="p-3 sm:p-4 md:p-5 w-full max-w-[660px] rounded-[15px] shadow-sm border-none">
        {/* Delivery / Pickup Tabs */}
        <div className="flex items-center space-x-4 sm:space-x-5 pb-[2px]">
          <div className="bg-[#F172281A] px-3 sm:px-4 py-1 rounded-[10px] flex items-center justify-center space-x-2">
            {/* <FaMotorcycle size={20} color="#F17228" /> */}
            <p className="text-[#F17228] font-bold text-sm sm:text-base">
              Delivery
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2">
            {/* <FaBagShopping size={20} color="#757575" /> */}
            <p className="text-[#757575] font-bold text-sm sm:text-base">
              Pickup
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#EEEEEE] mb-0.5"></div>

        {/* Search + Button */}
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch sm:space-x-4 space-y-3 sm:space-y-0">
          {/* Search Box */}
          <div className="flex items-center w-full sm:w-[450px] bg-[#F5F5F5] rounded-[10px] px-3 py-3">
            <Search size={20} color="#F17228" className="shrink-0" />
            <input
              type="text"
              placeholder="What do you like to eat today?"
              className="text-[#9E9E9E] text-[15px] leading-[100%] pl-2 focus:outline-none  truncate w-full h-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>

          {/* Button */}
          <Button
            onClick={handleSearch}
            className="bg-[linear-gradient(95.71deg,#FF7A7A_-39.64%,#F75900_135.31%)] w-full sm:w-[150px] h-[50px] rounded-[10px] flex items-center justify-center space-x-2 text-white text-[15px] leading-[100%] hover:bg-amber-500"
          >
            <Search size={20} />
            <p>Find Meal</p>
          </Button>
        </div>
      </Card>
    </div>
  );
}
