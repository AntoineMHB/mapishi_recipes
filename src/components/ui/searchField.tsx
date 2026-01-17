import { Search } from "lucide-react";
import { Input } from "./input";

export const SearchField = () => {
  return (
    <div className="relative w-[367px]">
      <Input
        className="h-[51px] pr-10"
        placeholder="Search with Categories, company, etc..."
      />

      <Search
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={20}
      />
    </div>
  );
};
