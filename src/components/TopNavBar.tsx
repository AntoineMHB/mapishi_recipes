import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import logo from "@/assets/logo_mapishi.png";
import { toast } from "react-toastify";

interface OpenFormButtonProps {
  onOpen: () => void;
}

export const TopNavBar = ({ onOpen }: OpenFormButtonProps) => {
  const isLoggedIn = useAppSelector((state) => !!state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!");

    // Optionally, you can also trigger a state update or redirect here
  };

  return (
    <div className="flex items-center justify-between px-5 py-5 space-x-4 shadow-sm">
      {/* Logo */}
      <div className="w-[100px] sm:w-[130px] md:w-[150px]">
        <img src={logo} alt="Logo" className="w-full h-auto object-contain" />
      </div>
      <div className="flex justify-center items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            {isLoggedIn ? (
              <NavigationMenuItem>
                <div className="flex gap-5">
                  <Button
                    className="text-white text-sm sm:text-base rounded-xl sm:rounded-[10px] h-8 sm:h-9 md:h-10 w-[110px] sm:w-[130px] md:w-[150px] bg-[#FF9A0E] shadow-md hover:bg-[#ff8800] transition"
                    onClick={onOpen}
                  >
                    Add Recipe
                  </Button>

                  <button
                    onClick={handleLogout}
                    className="font-semibold hover:font-bold"
                  >
                    Logout
                  </button>
                </div>
              </NavigationMenuItem>
            ) : (
              <div className="flex gap-5 mx-2">
                <Link to={"/login"} className="font-semibold hover:font-bold">
                  Sign In
                </Link>
                <Link to={"/signup"} className="font-semibold hover:font-bold">
                  Sign Up
                </Link>
              </div>
            )}
            <NavigationMenuItem>{/* <SearchField /> */}</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
