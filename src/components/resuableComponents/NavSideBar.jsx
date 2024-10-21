import React, { useContext, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import AddCardContext from "../../context/addCart/AddCardContext";
import { useNavigate } from "react-router-dom";

export const NavSideBar = () => {
  const cart = useContext(AddCardContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState("");
  const handleToggle = (prop) => {
    setIsOpen(prop);
  };
  return (
    <div className="relative w-full">
      <div className="w-64 bg-gray-800 text-white h-screen p-4 z-40 fixed overflow-y-auto top-[96px]">
        <ul>
          <li onClick={() => navigate(`/home`)} className="px-1">
            Home
          </li>
          <li className="">
            <div className=" hover:bg-gray-700 flex items-center px-1">
              <div
                className="w-3/4 text-left flex justify-between items-center  relative"
                onClick={() => handleToggle("Light")}
              >
                <h1>Light</h1>{" "}
              </div>
              <div className="w-1/4 flex justify-end  items-center absoulte top-0 z-30">
                {isOpen === "Light" ? (
                  <RxCross1 onClick={() => handleToggle("light")} />
                ) : (
                  <RiArrowDropDownLine onClick={() => handleToggle("Light")} />
                )}
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 delay-75 ease-in-out ${
                isOpen === "Light" ? "opacity-100 h-24" : "opacity-0 h-0"
              }`}
            >
              <div className="p-2 w-full h-full text-black bg-slate-50 rounded-lg">
                <p
                  className="hover:bg-slate-400 px-1"
                  onClick={() => cart.cardButton("stool")}
                >
                  stool
                </p>
                <p
                  className="hover:bg-slate-400 px-1"
                  onClick={() => cart.cardButton("tabel")}
                >
                  tabel
                </p>
                <p
                  className="hover:bg-slate-400 px-1"
                  onClick={() => cart.cardButton("light")}
                >
                  light
                </p>
              </div>
            </div>
          </li>
          <li>
            <div
              className="w-full text-left  hover:bg-gray-700 px-1"
              onClick={() => handleToggle("furniture")}
            >
              furniture
            </div>
            {isOpen === "furniture" && (
              <div className="ml-4 mt-2 transition-all duration-300">
                <p>Sub Option 2.1</p>
                <p>Sub Option 2.2</p>
                <p>Sub Option 2.3</p>
              </div>
            )}
          </li>
          <li>
            <div
              className="w-full text-left  hover:bg-gray-700 px-1"
              onClick={() => handleToggle("table")}
            >
              table
            </div>
            {isOpen === "table" && (
              <div className="ml-4 mt-2 transition-all duration-300">
                <p>Sub Option 3.1</p>
                <p>Sub Option 3.2</p>
                <p>Sub Option 3.3</p>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
