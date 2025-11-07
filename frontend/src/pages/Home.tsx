/** @format */

import {NavLink} from "react-router";
import {Profile} from "../components/icons/Profile";
import {HeroCard} from "../components/ui/HeroCard";
import beveragesImage from "../assets/foods/beverages.png";
import chineseImage from "../assets/foods/chineseFood.png";
import northIndianImage from "../assets/foods/north indian.png";
import iceCreamImage from "../assets/foods/ice cream.png";
import {ItemCard} from "../components/ui/ItemsCard";

export function Home() {
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

            <div>
              <NavLink
                className={"flex gap-2 justify-center items-center"}
                to="/"
              >
                <Profile />
                <span className="font-medium text-gray-900">You</span>
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Hero section */}
        <div className="flex flex-1 items-center justify-center px-20 py-10 mb-50">
          <div className="flex flex-1 flex-col justify-center items-start pl-10">
            {/* Hero text */}
            <h1 className="text-6xl font-bold mb-6 leading-tight ">
              Enjoy our <br /> Delicious Meal
            </h1>
            <p className="text-xl text-gray-800 ">
              “The wait for your food cravings <br /> comes to an end.”
            </p>
          </div>

          <div className="flex flex-1 justify-center">
            <div className="grid grid-cols-2 gap-6 ">
              <HeroCard title={"North Indian"} image={northIndianImage} />
              <HeroCard title={"Chinese"} image={chineseImage} />
              <HeroCard title={"Ice Cream"} image={iceCreamImage} />
              <HeroCard title={"Beverages"} image={beveragesImage} />
            </div>
          </div>
        </div>

        {/* Menu section */}
        <div className="flex flex-col gap-10">
          {/* north indian */}
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold ">North Indian</h1>

            <div className="grid lg:grid-cols-2 gap-5 gap-x-15">
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
            </div>
          </div>

          {/* chinese */}
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold ">Chinese</h1>

            <div className="grid lg:grid-cols-2 gap-5 gap-x-15">
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
            </div>
          </div>

          {/* ice cream */}
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold ">Ice Cream</h1>

            <div className="grid lg:grid-cols-2 gap-5 gap-x-15">
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
            </div>
          </div>

          {/* beverages */}
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold ">Beverages</h1>

            <div className="grid lg:grid-cols-2 gap-5 gap-x-15">
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
            </div>
          </div>

          {/* others */}
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold ">Others</h1>

            <div className="grid lg:grid-cols-2 gap-5 gap-x-15">
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>

              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
              <div>
                <ItemCard
                  title="Chola Bhatoora"
                  price={35}
                  image={northIndianImage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-[150px] w-full">

        </div>


      </div>
    </>
  );
}
