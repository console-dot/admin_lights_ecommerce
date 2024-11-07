import React, { useContext, useEffect, useState } from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import AddContext from "../../context/dashboard/AddContext";
import { RiRefund2Fill } from "react-icons/ri";
import { TbShoppingCartCancel, TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam, BsClipboardCheck } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { getCategory } from "../../api/category";
import { getAllProduct } from "../../api";
import { getTestimonial } from "../../api/testimonials";
import { getCheckOut } from "../../api/checkOut";

export const DashBoard = () => {
  const [categoryLength, setCategoryLength] = useState();
  const [productLength, setProductLength] = useState();
  const [testmonialLength, setTestmonialLength] = useState();
  const [orderLength, setOrderLength] = useState();
  const edit = useContext(AddContext);


  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await getCategory({ token });
        setCategoryLength(res?.data?.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchCategoryData();
  }, []);
  const fetchProductData = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getAllProduct({ token });
    setProductLength(res?.data?.data);
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  const getTestmonials = async () => {
    const token = localStorage.getItem("access_token");
    const testimonialsRes = await getTestimonial({ token });
    setTestmonialLength(testimonialsRes?.data?.data);

  };
  useEffect(() => {
    getTestmonials();
  }, []);
  
  const getCheckOutCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getCheckOut({ token });
    setOrderLength(res?.data?.data?.checkout);

  };
  useEffect(() => {
    getCheckOutCall();
  }, []);


  return (
    <div>
      <div
        className={`flex flex-col md:flex-row ${
          edit?.width ? "gap-5" : "lg:gap-10 gap-2"
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
            <h1 className="text-lg font-semibold">Total Product</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">{productLength?.length}</h1>
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
            <h1 className="text-lg font-semibold">Total Testmonials</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">{testmonialLength?.length}</h1>
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
            <h1 className="text-lg font-semibold">Total Categorys</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">{categoryLength?.length}</h1>
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
            <h1 className="text-lg font-semibold">Total Order</h1>
            <h1 className="text-xl font-semibold text-gray-500 py-2">{orderLength?.length}</h1>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
              <TbTruckDelivery className="text-3xl text-[#FF6C2F]" />
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className={`flex flex-col md:flex-row ${
          edit?.width ? "gap-5" : "lg:gap-10 gap-2"
        }  mt-2 md:mt-10`}
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
            <h1 className="text-lg font-semibold">Delivered</h1>
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
          edit.width ? "gap-5" : "lg:gap-10 gap-2"
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
            <h1 className="text-lg font-semibold">Retrun Order</h1>
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
      </div> */}
    </div>
  );
};
