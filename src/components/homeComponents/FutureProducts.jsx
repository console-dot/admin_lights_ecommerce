import React from "react";
import {
  BennerImage1,
  BennerImage11,
  commercialLight,
  commercialLightbg,
  indoorLight,
  indoorLightbg,
  light1,
  light1Bg,
  light2,
  light2Bg,
  multiLight,
  multiLightbg,
  restaurantLight,
  restaurantLight1,
  restaurantLight1bg,
  restaurantLightbg,
  wallLight,
  wallLight1,
  wallLight1bg,
  wallLightbg,
} from "../../assets";
import { ProductCard } from "../resuableComponents";
import { Link } from "react-router-dom";

export const FutureProducts = () => {
  const productData = [
    {
      image: commercialLight,
      imageBackground: commercialLightbg,
      title: "Black Festive",
      price: "$3,600",
      category: "TableLights",
      productName: "future",
    },
    {
      image: indoorLight,
      imageBackground: indoorLightbg,
      title: "Glimmering ",
      price: "$3,600",
      category: "IndoreLights",
      productName: "future",
    },
    {
      image: wallLight,
      imageBackground: wallLightbg,
      title: "Wall Mount Light",
      price: "$3,600",
      category: "IndoreLights",
      productName: "future",
    },
    {
      image: wallLight1,
      imageBackground: wallLight1bg,
      title: "Wire Design ",
      price: "$3,600",
      category: "IndoreLights",
      productName: "future",
    },
    {
      image: multiLight,
      imageBackground: multiLightbg,
      name: "wood",
      description:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
      price: 3500,
      productName: "future",
    },
    {
      image: restaurantLight,
      imageBackground: restaurantLightbg,
      name: "wood",
      description:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
      price: 3500,
      productName: "future",
    },
    {
      image: restaurantLight1,
      imageBackground: restaurantLight1bg,
      name: "wood",
      description:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
      price: 3500,
      productName: "future",
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="container p-4">
        <div className="xl:px-48 xl:pb-10 flex justify-center items-center text-center flex-col">
          <div class="nine">
            <h1 class="heading text-center text-3xl md:text-5xl uppercase text-amber-500 tracking-wide">
              Future Products
            </h1>
          </div>
          <p className="py-4 md:text-lg  text-[10px] font-normal text-[#CCCCCC] italic">
            Decorate your home with chic table lamps and floor lamps. Look for
            designs made of ultra-slim metal for a contemporary feel and designs
            with exposed bulbs for an industrial feel. Shop colourful hues and
            patterns to give your space more life, or go classic with a neutral
            tone for a look that will never go out of style.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 md:p-0 p-2 gap-4 place-items-center">
          {productData.map((i, index) => (
            <ProductCard data={i} id={index} />
          ))}
        </div>

        <div className="flex justify-center items-center pt-10 ">
          <button className="shop-button1 px-7 py-3  bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white  rounded-lg">
            <span>
              <Link className="hover:text-white" to={`/${"Products"}`}>
                Veiw All Products
              </Link>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
