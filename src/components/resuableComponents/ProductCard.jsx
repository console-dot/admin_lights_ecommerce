import React, { useContext, useEffect, useState } from "react";
import { benner, benner2 } from "../../assets";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegEye, FaShoppingCart } from "react-icons/fa";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { useIsMobile } from "../../hooks/useIsMobile";


export const ProductCard = ({ data, id }) => {
  const [productDetail, setProductDetail] = useState(false);
  const [imageIcon, setImageIcon] = useState(false);
  const navigate = useNavigate();


  const isMobile = useIsMobile();

  return (
    <>
      <div
        className="lg:w-[300px] w-[150px] md:w-[240px] group p-2 md:p-1 relative lg:h-[470px] h-[300px] sm:h-[400px] md:[290px] cursor-pointer"
      
      >
        <div className="flex-col flex w-full h-full">
          <div
            className="relative w-full h-[80%] "
            onClick={() =>
              navigate(`/productDetails/${data.productName}/${id}`)
            }
          >
            <img
              src={data?.image}
              className="relative w-full h-full inset-0 transition-opacity ease-in-out bg-[#e0dddd] duration-1000 group-hover:opacity-0"
              alt="Image 1"
            />
            <img
              src={data?.imageBackground}
              className="absolute inset-0 w-full h-full transition-opacity ease-in-out duration-1000  opacity-0 group-hover:opacity-100"
              alt="Image 2"
            />
          </div>
          <div className="md:absolute  md:top-24 md:right-5  z-40 py-1 ">
            {imageIcon && (
              <div className=" ">
                <div className="flex md:flex-col justify-center items-center flex-row gap-2">
                  <div
                    className="bg-black hidden md:flex md:w-10 w-5 h-5 md:h-10 rounded-full justify-center items-center hover:bg-amber-600"
                    onClick={() => {
                      setProductDetail(true);
                      document.getElementById("my_modal_1").showModal();
                    }}
                  >
                    <FaRegEye className="text-white" />
                  </div>
                  <div className="bg-black md:w-10 w-8 h-8 md:h-10 rounded-full flex justify-center items-center hover:bg-amber-600">
                    <FaHeart className="text-white" />
                  </div>
                  <div
                    className="bg-black md:w-10 w-8 h-8 md:h-10 rounded-full flex justify-center items-center hover:bg-amber-600"
                 
                  >
                    <FaShoppingCart className="text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`md:${
              imageIcon ? "hidden" : "flex"
            } md:absolute right-2 top-2 z-40 md:hidden flex justify-center items-center`}
          >
            <div className="flex items-center justify-center md:mt-2.5 md:mb-5 py-1">
              <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg
                  class="w-3 h-3 md:w-4 md:h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-3 h-3 md:w-4 md:h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-3 h-3 md:w-4 md:h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-3 h-3 md:w-4 md:h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-3 h-3 md:w-4 md:h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center h-[20%]">
            <h1 className="font-semibold md:text-xl md:py-2 text-[#CCCCCC] heading">
              {isMobile
                ? data?.name || data?.title.substring(0, 10)
                : data?.name || data?.title}
            </h1>
            <h1 className="font-semibold inline  text-amber-500 ">
              {data?.price}
            </h1>
          </div>
          <dialog id="my_modal_1" className="modal flex items-end">
            {/* <ProductDetailsModal data={data} /> */}
          </dialog>
        </div>
      </div>
    </>
  );
};
