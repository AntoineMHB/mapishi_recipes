import Header from "@/components/header";
import { Recipes } from "@/components/Recipes";
import { TopNavBar } from "@/components/TopNavBar";
import { useState } from "react";

export default function Home() {
  //   const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    console.log("Search query received:", query);
    setSearchQuery(query);
  };

  return (
    <div>
      <TopNavBar />

      <div className="w-full min-h-screen flex flex-col items-center bg-[#FFF8F0] pb-10">
        <Header onSearch={handleSearch} />
        {/* <FeaturedFoods searchQuery={searchQuery} /> */}
        {/* <Footer /> */}
        <Recipes />
      </div>

      {/* Popup Form (only when open) */}
      {/* {isOpen && <AddMealForm onClose={() => setIsOpen(false)} />} */}
    </div>
  );
}
