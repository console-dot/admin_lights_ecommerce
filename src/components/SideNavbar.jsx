import React, { useContext, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import logo from "../assets/logo.png";
import { BsFillGridFill } from "react-icons/bs";
import { HiShoppingBag } from "react-icons/hi";
import { RiFileList3Fill } from "react-icons/ri";
import AddContext from "../context/dashboard/AddContext";
import { BiSolidComponent } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
export const SideNavbar = ({ isMobile, setIsMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const data = useContext(AddContext);
  return (
    <>
      {isMobile ? (
        <div className=" absolute top-16 lg:hidden  transition-all duration-100 delay-500">
          <div
            className="w-full h-full fixed z-40"
            onClick={() => setIsMobile(false)}
          ></div>
          <div
            className={` ${
              isMobile ? "w-[250px] ease-in" : "w-0 ease-out"
            } transition-all duration-700 delay-500 fixed h-screen flex flex-col bg-[#080808]  z-50 md:p-4 group overflow-hidden `}
          >
            <div className={`w-full z-50 flex items-start py-5 md:py-10 `}>
              <div
                className={`w-full flex items-center relative gap-5 cursor-pointer ${
                  data?.width ? " flex justify-start" : "justify-center "
                }`}
              >
                <FaShoppingBasket className="text-amber-500 text-2xl" />

                <div className={`flex justify-center items-center`}>
                  <img className="w-32" src={logo} alt="Logo" />
                </div>
              </div>
            </div>

            <div className="flex justify-start items-start  z-50 cursor-pointer mt-5 rounded-lg  hover:bg-black py-2">
              <div
                className={`w-full  flex items-center relative gap-5 ${
                  data?.width ? " flex justify-start " : "justify-center "
                }`}
                onClick={() => data?.setSelectedComponent("dashboard")}
              >
                <BsFillGridFill className="text-amber-500 text-2xl" />

                <div className={`flex justify-center items-center`}>
                  <h1 className="text-[#CCC] text-lg w-32">Dashboard</h1>
                </div>
              </div>
            </div>

            <div className="flex justify-start items-start mt-5 z-50 cursor-pointer rounded-lg  hover:bg-black py-2">
              <div
                className={`w-full flex  items-center relative  gap-5 ${
                  data?.width
                    ? " flex justify-start ease-in-out delay-500"
                    : "justify-center "
                }`}
                onClick={() => data?.setSelectedComponent("Product list")}
              >
                <RiFileList3Fill className="text-amber-500 text-2xl " />

                <div className={`flex justify-center items-center`}>
                  <h1 className="text-[#CCC] text-lg w-32  ">Product List</h1>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-start mt-5 z-50 cursor-pointer rounded-lg  hover:bg-black py-2">
              <div
                className={`w-full flex items-center relative gap-5 ${
                  data?.width
                    ? " flex justify-start ease-in-out delay-500"
                    : "justify-center "
                }`}
                onClick={() => data?.setSelectedComponent("order list")}
              >
                <HiShoppingBag className="text-amber-500 text-2xl " />

                <div className={`flex justify-center items-center`}>
                  <h1 className="text-[#CCC] text-lg w-32 ">Order List</h1>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-start mt-5 z-50 cursor-pointer rounded-lg  hover:bg-black py-2 relative ">
              {isOpen && (
                <div className="absolute top-12 bg-black text-white w-full flex flex-col p-2 rounded-lg">
                  <option
                    className="p-2 rounded-lg hover:bg-slate-400 hover:text-black"
                    onClick={() => data?.setSelectedComponent("testimonials")}
                  >
                    Testimonials
                  </option>
                  <option className="p-2 rounded-lg hover:bg-slate-400 hover:text-black">
                    hello
                  </option>
                  <option className="p-2 rounded-lg hover:bg-slate-400 hover:text-black">
                    hello
                  </option>
                </div>
              )}
              <div
                className={` w-full flex items-center relative gap-5 ${
                  data?.width
                    ? " flex justify-start ease-in-out delay-500"
                    : "justify-center "
                }`}
              >
                <BiSolidComponent className="text-amber-500 text-2xl " />

                <div
                  className={` relative flex justify-center items-center`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="absolute top-[7px] right-[-10px]">
                    {isOpen ? (
                      <IoIosArrowUp className="text-white" />
                    ) : (
                      <IoIosArrowDown className="text-white" />
                    )}
                  </div>

                  <h1 className="text-[#CCC] text-lg w-32 ">Components</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={` fixed w-[5%] ease-in-out hover:w-[250px] transition-all duration-700 z-50 lg:flex hidden`}
          onMouseEnter={() => data?.setWidth(true)}
          onMouseLeave={() => data?.setWidth(false)}
        >
          <div className="w-full h-screen flex flex-col bg-[#080808] relative z-50 p-4 group  overflow-hidden ">
            <div className="absolute inset-y-0 right-0 w-full bg-transparent shadow-colored  shadow-[#CCC] z-50"></div>
            <div className={`w-full z-50 flex items-start mb-10 pt-2 h-[50px] `}>
              <div
                className={`w-full flex items-center relative gap-5 cursor-pointer ${
                  data?.width ? " flex justify-start" : "justify-center "
                }`}
              >
                <FaShoppingBasket
                  className={`text-amber-500 ${
                    data?.width ? "hidden" : "flex"
                  }  text-2xl`}
                />

                {data?.width && (
                  <div
                    className={`hidden w-full group-hover:flex gap-5 justify-center items-center`}
                  >
                    {/* <FaShoppingBasket className={`text-amber-500  text-2xl`} /> */}
                    <img className="w-32" src={logo} alt="Logo" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center items-start  z-50 cursor-pointer mt-5 rounded-lg  hover:bg-[#232323] xl:p-2">
              <div
                className={`w-full  flex items-center relative gap-5 ${
                  data?.width ? " flex justify-start " : "justify-center "
                }`}
                onClick={() => data?.setSelectedComponent("dashboard")}
              >
                <BsFillGridFill
                  className={`text-amber-500 ${
                    data?.width ? "hidden" : "flex"
                  } text-2xl`}
                />
                {data?.width && (
                  <div
                    className={`hidden group-hover:flex justify-center gap-5 items-center`}
                  >
                    <BsFillGridFill className="text-amber-500 text-2xl" />
                    <h1 className="text-[#CCC] text-lg w-32">Dashboard</h1>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center items-start mt-5 z-50 cursor-pointer rounded-lg  hover:bg-[#232323] xl:p-2">
              <div
                className={`w-full flex  items-center relative  gap-5 ${
                  data?.width
                    ? " flex justify-start ease-in-out delay-500"
                    : "justify-center "
                }`}
                onClick={() => data?.setSelectedComponent("Product list")}
              >
                <RiFileList3Fill
                  className={`text-amber-500 ${
                    data?.width ? "hidden" : "flex"
                  } text-2xl`}
                />
                {data?.width && (
                  <div
                    className={`hidden group-hover:flex justify-center gap-5 items-center`}
                  >
                    <RiFileList3Fill className="text-amber-500 text-2xl " />
                    <h1 className="text-[#CCC] text-lg w-32  ">Product List</h1>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center items-start mt-5 z-50 cursor-pointer rounded-lg  hover:bg-[#232323] xl:p-2">
              <div
                className={`w-full flex items-center relative gap-5 ${
                  data?.width
                    ? " flex justify-start ease-in-out delay-500"
                    : "justify-center "
                }`}
                onClick={() => data?.setSelectedComponent("order list")}
              >
                <HiShoppingBag
                  className={`text-amber-500 ${
                    data?.width ? "hidden" : "flex"
                  } text-2xl`}
                />
                {data?.width && (
                  <div
                    className={`hidden group-hover:flex gap-5 justify-center items-center`}
                  >
                    <HiShoppingBag className={`text-amber-500  text-2xl`} />

                    <h1 className="text-[#CCC] text-lg w-32 ">Order List</h1>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center items-start mt-5 z-50 cursor-pointer rounded-lg  hover:bg-[#232323] xl:p-2 relative ">
              {data.width
                ? isOpen && (
                    <div className="absolute top-12 bg-[#232323] text-white w-full flex flex-col p-2 rounded-lg">
                      <option
                        className="p-2 rounded-lg hover:bg-slate-400 hover:text-black"
                        onClick={() =>
                          data?.setSelectedComponent("testimonials")
                        }
                      >
                        Testimonials
                      </option>
                      <option
                        className="p-2 rounded-lg hover:bg-slate-400 hover:text-black"
                        onClick={() => data?.setSelectedComponent("category")}
                  >
                        Categories
                      </option>
                      <option className="p-2 rounded-lg hover:bg-slate-400 hover:text-black" onClick={() => data?.setSelectedComponent("Landing Page")}>
                      Landing Page
                      </option>
                    </div>
                  )
                : ""}
              <div
                className={` w-full flex items-center relative gap-5 ${
                  data?.width
                    ? " flex justify-start ease-in-out delay-500"
                    : "justify-center "
                }`}
              >
                <BiSolidComponent
                  className={`text-amber-500 ${
                    data?.width ? "hidden" : "flex"
                  } text-2xl`}
                />
                {data?.width && (
                  <div
                    className={`hidden relative gap-5 group-hover:flex justify-center items-center`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <BiSolidComponent className={`text-amber-500  text-2xl`} />
                    <div className="absolute top-[7px] right-[-20px]">
                      {isOpen ? (
                        <IoIosArrowUp className="text-white" />
                      ) : (
                        <IoIosArrowDown className="text-white" />
                      )}
                    </div>

                    <h1 className="text-[#CCC] text-lg w-32 ">Components</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
