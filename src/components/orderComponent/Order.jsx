import React, { useContext } from "react";
import { light } from "../../assets";
import { FaRegEye } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdDelete, MdOutlinePendingActions } from "react-icons/md";
import AddContext from "../../context/dashboard/AddContext";
import { RiRefund2Fill } from "react-icons/ri";
import { TbShoppingCartCancel, TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam, BsClipboardCheck } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";

export const Order = () => {
  const widthAdjust = useContext(AddContext);
  const data = [
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
    {
      image: light,
      name: "wall light",
      categor: "light",
      price: "400",
      stock: "50",
    },
  ];
  const edit = useContext(AddContext);
  return (
    <>
      <div
        className={`flex flex-col md:flex-row ${
          widthAdjust?.width ? "gap-5" : "lg:gap-10 gap-2"
        }`}
      >
        <div
          className={`${
            edit.bodyColor
              ? "bg-[#111111] border-[5px] border-[#232323]"
              : " bg-white shadow-lg rounded-lg"
          } flex shadow-lg p-4 w-full md:w-1/4  h-[140px] `}
        >
          <div
            className={`w-1/2 flex justify-center  flex-col ${
              edit.bodyColor ? "text-white" : " text-black"
            }`}
          >
            <h1 className="text-lg font-semibold">Payment Refund</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">499</h1>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
              <RiRefund2Fill className="text-3xl text-[#FF6C2F]" />
            </div>
          </div>
        </div>
        <div
          className={`${
            edit.bodyColor
              ? "bg-[#111111] border-[5px] border-[#232323]"
              : " bg-white shadow-lg rounded-lg"
          } flex shadow-lg p-4 w-full md:w-1/4  h-[130px]`}
        >
          <div
            className={`w-1/2 flex justify-center  flex-col ${
              edit.bodyColor ? "text-white" : " text-black"
            }`}
          >
            <h1 className="text-lg font-semibold">Order Cancel</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">499</h1>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
              <TbShoppingCartCancel className="text-3xl text-[#FF6C2F]" />
            </div>
          </div>
        </div>
        <div
          className={`${
            edit.bodyColor
              ? "bg-[#111111] border-[5px] border-[#232323]"
              : " bg-white shadow-lg rounded-lg"
          } flex shadow-lg p-4 w-full md:w-1/4  h-[140px]`}
        >
          <div
            className={`w-1/2 flex justify-center  flex-col ${
              edit.bodyColor ? "text-white" : " text-black"
            }`}
          >
            <h1 className="text-lg font-semibold">Order Shipped</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">499</h1>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
              <BsBoxSeam className="text-3xl text-[#FF6C2F]" />
            </div>
          </div>
        </div>
        <div
          className={`${
            edit.bodyColor
              ? "bg-[#111111] border-[5px] border-[#232323]"
              : " bg-white shadow-lg rounded-lg"
          } flex shadow-lg p-4 w-full md:w-1/4  h-[140px]`}
        >
          <div
            className={`w-1/2 flex justify-center  flex-col ${
              edit.bodyColor ? "text-white" : " text-black"
            }`}
          >
            <h1 className="text-lg font-semibold">Order Delivering</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">499</h1>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
              <TbTruckDelivery className="text-3xl text-[#FF6C2F]" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col md:flex-row ${
          widthAdjust.width ? "gap-5" : "lg:gap-10 gap-2"
        } mt-2 md:mt-10`}
      >
        <div
          className={`${
            edit.bodyColor
              ? "bg-[#111111] border-[5px] border-[#232323]"
              : " bg-white shadow-lg rounded-lg"
          } flex shadow-lg p-4 w-full md:w-1/4  h-[140px]`}
        >
          <div
            className={`w-1/2 flex justify-center  flex-col ${
              edit.bodyColor ? "text-white" : " text-black"
            }`}
          >
            <h1 className="text-lg font-semibold">Pending Review</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">499</h1>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
              <MdOutlinePendingActions className="text-3xl text-[#FF6C2F]" />
            </div>
          </div>
        </div>
        <div
          className={`${
            edit.bodyColor
              ? "bg-[#111111] border-[5px] border-[#232323]"
              : " bg-white shadow-lg rounded-lg"
          } flex shadow-lg p-4 w-full md:w-1/4  h-[140px]`}
        >
          <div
            className={`w-1/2 flex justify-center  flex-col ${
              edit.bodyColor ? "text-white" : " text-black"
            }`}
          >
            <h1 className="text-lg font-semibold">Pending Payment</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">499</h1>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
              <FaClockRotateLeft className="text-3xl text-[#FF6C2F]" />
            </div>
          </div>
        </div>
        <div
          className={`${
            edit.bodyColor
              ? "bg-[#111111] border-[5px] border-[#232323]"
              : " bg-white shadow-lg rounded-lg"
          } flex shadow-lg p-4 w-full md:w-1/4  h-[130px]`}
        >
          <div
            className={`w-1/2 flex justify-center  flex-col ${
              edit.bodyColor ? "text-white" : " text-black"
            }`}
          >
            <h1 className="text-lg font-semibold">Delivered</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">499</h1>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
              <BsClipboardCheck className="text-3xl text-[#FF6C2F]" />
            </div>
          </div>
        </div>
        <div
          className={`${
            edit.bodyColor
              ? "bg-[#111111] border-[5px] border-[#232323]"
              : " bg-white shadow-lg rounded-lg"
          } flex shadow-lg p-4 w-full md:w-1/4  h-[140px]`}
        >
          <div
            className={`w-1/2 flex justify-center  flex-col ${
              edit.bodyColor ? "text-white" : " text-black"
            }`}
          >
            <h1 className="text-lg font-semibold">In Progress</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">499</h1>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
              <GrInProgress className="text-3xl text-[#FF6C2F]" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          edit.bodyColor
            ? "bg-[#111111] border-[5px] border-[#232323]"
            : " bg-white shadow-lg rounded-lg"
        }  mt-10 `}
      >
        <div
          className={`w-full ${edit.bodyColor ? "text-white" : " text-black"} `}
        >
          <div className="flex justify-between items-center p-4 border-b border-[#232323] ">
            <div>
              <h1 className="text-lg font-semibold">All Order List</h1>
            </div>
            <div className=" flex gap-2">
              <button className="bg-amber-500 p-2 rounded-lg">
                This Month
              </button>
            </div>
          </div>
          <div className="overflow-x-scroll md:overflow-hidden">
            <table className={`w-full `}>
              <thead>
                <tr className=" text-start ">
                  <th className="py-4">Order Id</th>
                  <th className="pb-2">Created at</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Priority</th>
                  <th className="pb-2">Total</th>
                  <th className="pb-2">Payment Status</th>
                  <th className="pb-2">Items</th>
                  <th className="pb-2">Delivery Number</th>
                  <th className="pb-2">Order Status</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr className="border-t border-[#232323] shadow-slate-50 ">
                    <th>
                      <div>
                        <h1 className="font-normal text-gray-500 text-sm">
                          #22282E
                        </h1>
                      </div>
                    </th>
                    <th className=" flex justify-center items-center gap-2 py-4">
                      <h1 className="text-base  font-normal">Apr 23 , 2024</h1>
                    </th>
                    <th className="text-base  font-normal text-red-600">
                      Jhon{" "}
                    </th>
                    <th className="text-center text-base  font-normal">
                      Normal
                    </th>
                    <th className="text-base  font-normal">$132146</th>
                    <th className="text-base  font-normal">
                      <div className="flex justify-center items-center">
                        <h1 className="w-20 p-2 bg-slate-100 rounded-lg  text-black">
                          Unpaid
                        </h1>
                      </div>
                    </th>
                    <th className="text-base  font-normal">40</th>
                    <th className="text-base  font-normal">#D-35227268</th>
                    <th>
                      <div className="flex text-base w-full  font-normal justify-center items-center">
                        <h1 className="text-green-400 w-28 text-sm border p-2 rounded-lg">
                          Compeleted
                        </h1>
                      </div>
                    </th>
                    <th>
                      <div className="flex justify-center items-center gap-5 ">
                        <FaRegEye className="cursor-pointer text-lg hover:text-amber-500 " />
                        <BiEdit
                          className="cursor-pointer text-lg hover:text-amber-500 "
                          onClick={() =>
                            edit.setSelectedComponent("editProduct")
                          }
                        />
                        <MdDelete className="cursor-pointer text-lg hover:text-amber-500 " />
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
