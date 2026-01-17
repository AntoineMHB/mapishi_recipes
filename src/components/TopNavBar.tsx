import { Heart, Link, ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { SearchField } from "./ui/searchField";

export const TopNavBar = () => {
  return (
    <div className="flex items-center justify-between px-5 py-5 space-x-4 shadow-sm">
      <p className="text-2xl text-black font-bold">Zando_Express</p>
      <div className="flex justify-center items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <Link to={"/categories"}>
                  <NavigationMenuLink>
                    All products categories
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <SearchField />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* <Link to={"/wishlist"} className="relative">
          <Heart size={20} />

          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link> */}
        {/* 
        <Link to={"/cart"} className="relative">
          <ShoppingCart size={20} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link> */}

        {/* {loggedInUser ? (
          <button
            onClick={handleLogout}
            className="font-semibold hover:font-bold"
          >
            Logout
          </button>
        ) : (
          <div>
            <Link to={"/login"} className="font-semibold hover:font-bold">
              Sign In
            </Link>
            <Link to={"/signup"} className="font-semibold hover:font-bold">
              Sign Up
            </Link>
          </div>
        )} */}
      </div>
    </div>
  );
};
