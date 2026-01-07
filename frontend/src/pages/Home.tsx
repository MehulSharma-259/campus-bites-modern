/** @format */

import {HeroCard} from "../components/ui/HeroCard";
import {ItemCard} from "../components/ui/ItemsCard";
import {menuService} from "../api/menuService";
import {useEffect, useState} from "react";
import {MenuItem} from "../types";
import {PopUp} from "../components/ui/PopUp";

const heroCardData = [
  {title: "North Indian", image: "/images/foods/north indian.png"},
  {title: "Chinese", image: "/images/foods/chineseFood.png"},
  {title: "Ice Cream", image: "/images/foods/ice cream.png"},
  {title: "Beverages", image: "/images/foods/beverages.png"},
];

const MenuSection = ({title, items}: {title: string; items: MenuItem[]}) => {
  if (items.length === 0) return null;

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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="custom-bg-image min-h-screen">
      <PopUp />

      {/* Hero section */}
      <div className="flex flex-1 items-center justify-center px-20 py-10 mb-20">
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
      <div className="flex flex-col gap-10 pb-20">
        {loading && <p className="text-center text-xl">Loading menu...</p>}
        {error && <p className="text-center text-xl text-red-500">{error}</p>}

        <MenuSection title="North Indian" items={northIndianItems} />
        <MenuSection title="Chinese" items={chineseItems} />
        <MenuSection title="Ice Cream" items={iceCreamItems} />
        <MenuSection title="Beverages" items={beverageItems} />
        <MenuSection title="Others" items={otherItems} />
      </div>
    </div>
  );
}
