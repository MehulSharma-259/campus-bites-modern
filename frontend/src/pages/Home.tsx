/** @format */

import {NavLink} from "react-router"; // Corrected import
import {Profile} from "../components/icons/Profile";
import {HeroCard} from "../components/ui/HeroCard";
import {ItemCard} from "../components/ui/ItemsCard";
import {useAuth} from "../hooks/useAuth";
import {menuService} from "../api/menuService";
import {useEffect, useState} from "react";
import {MenuItem} from "../types";
import {CartIcon} from "../components/icons/Cart";
import {PopUp} from "../components/ui/PopUp";

// Import images (Vite handles this well)
// import beveragesImage from "../assets/foods/beverages.png";
// import chineseImage from "../assets/foods/chineseFood.png";
// import northIndianImage from "../assets/foods/north indian.png";
// import iceCreamImage from "../assets/foods/ice cream.png";
// import {CartIcon} from "../components/icons/Cart";
// import {PopUp} from "../components/ui/PopUp";

const heroCardData = [
  {title: "North Indian", image: "/images/foods/north indian.png"},
  {title: "Chinese", image: "/images/foods/chineseFood.png"},
  {title: "Ice Cream", image: "/images/foods/ice cream.png"},
  {title: "Beverages", image: "/images/foods/beverages.png"},
];

// Helper component to avoid repetition
const MenuSection = ({title, items}: {title: string; items: MenuItem[]}) => {
  if (items.length === 0) return null; // Don't render empty sections

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl font-bold ">{title}</h1>
      <div className="grid lg:grid-cols-2 gap-5 gap-x-15">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export function Home() {
  const {user} = useAuth(); // Get user from global state
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const items = await menuService.getMenuItems();
        setMenuItems(items);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load menu.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Filter items based on category
  const northIndianItems = menuItems.filter(
    (item) => item.category === "north_indian"
  );

  const chineseItems = menuItems.filter((item) => item.category === "chinese");

  const iceCreamItems = menuItems.filter(
    (item) => item.category === "ice_cream"
  );
  const beverageItems = menuItems.filter(
    (item) => item.category === "beverages"
  );

  const otherItems = menuItems.filter((item) => item.category === "other");

  return (
    <>
      <div className="custom-bg-image ">
        {/* Navbar */}
        <nav className="w-full px-10 py-4 mb-7">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              <NavLink to="/">CampusBites</NavLink>
            </div>

            <div className="hidden md:flex gap-16 justify-between items-center">
              <NavLink
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Feedback
              </NavLink>
              <NavLink
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                About
              </NavLink>
              <NavLink
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </NavLink>
              <NavLink
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Menu
              </NavLink>
            </div>

            <div className="flex items-center justify-center gap-5">
              <NavLink to="/cart">
                <CartIcon />
              </NavLink>

              <NavLink
                className={"flex gap-2 justify-center items-center"}
                to={user ? "/profile" : "/signin"} // Change link based on auth
                replace
              >
                <Profile />
                {/* Show user's name or "Sign In" */}
                <span className="font-medium text-gray-900">
                  {user ? user.name?.split(" ")[0] : "Sign In"}
                </span>
              </NavLink>
            </div>
          </div>
        </nav>

        <PopUp />

        {/* Hero section (remains the same) */}
        <div className="flex flex-1 items-center justify-center px-20 py-10 mb-50">
          {/* ... hero text ... */}
          <div className="flex flex-1 flex-col justify-center items-start pl-10">
            <h1 className="text-6xl font-bold mb-6 leading-tight ">
              Enjoy our <br /> Delicious Meal
            </h1>
            <p className="text-xl text-gray-800 ">
              “The wait for your food cravings <br /> comes to an end.”
            </p>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="grid grid-cols-2 gap-6 ">
              {heroCardData.map((card) => (
                <HeroCard
                  key={card.title}
                  title={card.title}
                  image={card.image}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Menu section */}
        <div className="flex flex-col gap-10">
          {loading && <p className="text-center text-xl">Loading menu...</p>}
          {error && <p className="text-center text-xl text-red-500">{error}</p>}

          {/* Render sections dynamically */}
          <MenuSection title="North Indian" items={northIndianItems} />
          <MenuSection title="Chinese" items={chineseItems} />
          <MenuSection title="Ice Cream" items={iceCreamItems} />
          <MenuSection title="Beverages" items={beverageItems} />
          <MenuSection title="Others" items={otherItems} />
        </div>

        <div className="h-[150px] w-full">{/* Footer space */}</div>
      </div>
    </>
  );
}
