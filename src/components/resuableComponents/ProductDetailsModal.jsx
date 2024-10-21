import React, { useContext } from "react";
import { BennerImage1 } from "../../assets";
import { FaCross, FaRegHeart } from "react-icons/fa";
import { TbFlagCancel } from "react-icons/tb";
import { ImCross } from "react-icons/im";

export const ProductDetailsModal = ({data}) => {
  
  return (
    <div className="w-full z-50 flex justify-center items-center flex-col relative">
      <div className="fixed z-50 top-36 right-[16%] ">
        <form method="dialog" className="modal-backdrop">
          <button className="border-none focus:border-none">
            <ImCross className="text-white" />
          </button>
        </form>
      </div>
      <div
        className="modal-box bg-black  rounded-none flex"
        style={{ maxWidth: "70%" ,height:"calc(100vh - 8rem)"}}
      >
        <div className=" w-3/5 xl:w-1/2">
          <img src={BennerImage1} className="h-[500px] px-2" />
        </div>
        <div className="w-2/5 xl:w-1/2 flex flex-col px-2">
          <div>
            <h1 className="text-amber-500 heading font-semibold text-lg pb-2 border-b border-[#414141] ">
              {data?.name|| data?.title}
            </h1>
          </div> 
          <div className="flex flex-col">
            <div className="py-3">
              <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-gray-200 dark:text-gray-600"
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
            <div className="flex  font-semibold py-1">
              <h1 className="text-white heading w-32 ">Brand :</h1>
              <h1 className="text-[#b1b1b1] px-2 italic">Name</h1>
            </div>
            <div className="flex  font-semibold py-1">
              <h1 className="text-white heading w-32">Prduct Code :</h1>
              <h1 className="text-[#b1b1b1] px-2 italic">Product 21</h1>
            </div>
            <div className="flex  font-semibold py-1">
              <h1 className="text-white heading w-32">Reward Points :</h1>
              <h1 className="text-[#b1b1b1] px-2 italic">300</h1>
            </div>
            <div className="flex  font-semibold py-1">
              <h1 className="text-white heading w-32">Availability :</h1>
              <h1 className="text-[#b1b1b1] px-2 italic">In Stock</h1>
            </div>

            <div className=" flex flex-col">
              <h1 className="flex text-white text-2xl font-bold py-3">
                <span>$</span>300<span>.00</span>
              </h1>
              <h1 className="text-[#b1b1b1]">
                Ex Tax: <span>$100.00</span>
              </h1>
              <h1 className="text-[#b1b1b1] italic">
                Price in reward points: <span>400</span>
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg text-white font-semibold py-4 heading">
                Available Options
              </h1>
              {/* <h1 className="text-white text-lg font-semibold">Color</h1>
              <div className="flex gap-4  py-2">
                <div className="w-10 h-10 border-2 border-white rounded-full  bg-black"></div>
                <div className="w-10 h-10 border-2 border-white rounded-full  bg-red-700"></div>
              </div> */}
            </div>
            <div className="flex flex-col py-4 italic">
              <h1 className="text-lg text-white font-semibold">
                Delivery Date
              </h1>
              <div className="py-4">
                <div class="relative max-w-sm">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    datepicker
                    id="default-datepicker"
                    type="date"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-5 ">
              <div>
                <button className="bg-white flex gap-4 p-3 text-xl rounded-lg">
                  {/* <h1 onClick={cart.subtractQuantity}>-</h1>
                  <h1 className="">{cart.quantity}</h1>
                  <h1 className="" onClick={cart.addQuantity}> */}
                    +
                  {/* </h1> */}
                </button>
              </div>
              <div className="flex justify-center items-center">
                {/* <button className="shop-button   px-4 py-3  bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white rounded-full" onClick={() => cart.addToCart(data)}  >
                  <span>Add to Cart</span>
                </button> */}
              </div>
            </div>
            <div className="flex py-2 justify-start items-center gap-5 pb-10">
              <div className="flex justify-center items-center py-2 hover:border-b-2  gap-3 text-white">
                {" "}
                <div>
                  <FaRegHeart />
                </div>{" "}
                Add to list{" "}
              </div>
         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
