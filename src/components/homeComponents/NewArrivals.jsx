import React from "react";
import { ProductCard } from "../resuableComponents";
import {
  multiLight,
  multiLightbg,
  restaurantLight,
  restaurantLight1,
  restaurantLight1bg,
  restaurantLightbg,
  table,
  table1,
  table1bg,
  table2,
  table2bg,
  table3,
  table3bg,
  tablebg,
  wallLight,
  wallLight1,
  wallLight1bg,
  wallLightbg,
} from "../../assets";
import { Link } from "react-router-dom";

export const NewArrivals = () => {
  const newArrivalsData = [
    {
      image: table,
      imageBackground:tablebg,
      title: "Glimmering ",
      price: "$3,600",
      category: "IndoreLights",
      productName: "new",
    },
    {
      image: wallLight,
      imageBackground: wallLightbg,
      title: "Wall Mount Light",
      price: "$3,600",
      category: "IndoreLights",
      productName: "new",
    },
    {
      image: wallLight1,
      imageBackground: wallLight1bg,
      title: "Wire Design ",
      price: "$3,600",
      category: "IndoreLights",
      productName: "new",
    },
    {
      image: table1,
      imageBackground:table1bg,
      name: "wood",
      description:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
      price: 3500,
      productName: "new",
    },
    {
      image: multiLight,
      imageBackground: multiLightbg,
      name: "wood",
      description:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
      price: 3500,
      productName: "new",
    },
    {
      image: restaurantLight,
      imageBackground: restaurantLightbg,
      name: "wood",
      description:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
      price: 3500,
      productName: "new",
    },
    {
      image: restaurantLight1,
      imageBackground: restaurantLight1bg,
      name: "wood",
      description:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
      price: 3500,
      productName: "new",
    },
    {
      image: table2,
      imageBackground:table2bg,
      name: "wood",
      description:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
      price: 3500,
      productName: "new",
    },
    {
      image: table3,
      imageBackground: table3bg,
      name: "wood",
      description:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
      price: 3500,
      productName: "new",
    },

  ];
  return (
    <div div className="flex justify-center items-center">
      <div className="container p-4 ">
        <div class="nine">
          <h1 class="heading text-center mb-10 text-3xl md:text-5xl uppercase text-amber-500 tracking-wide ">
            New Arrivals
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 md:p-0 p-2 gap-4 place-items-center">
          {newArrivalsData.map((item, index) => (
            // <div className="flex justify-start items-center w-full h-full">
              <ProductCard data={item} id={index} />
            // </div>
          ))}
        </div>
        <div className="flex justify-center items-center pt-10 ">
          <button className="shop-button1 px-7 py-3  bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white  rounded-lg">
            
            <span><Link to="/product">Veiw All Products</Link></span>
          </button>
        </div>
      </div>
    </div>
  );
};
