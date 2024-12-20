import React, { useContext, useEffect, useState } from "react";
import { RiRefund2Fill } from "react-icons/ri";
import { TbShoppingCartCancel, TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import AddContext from "../../context/dashboard/AddContext";
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

  // Fetch data for categories, products, testimonials, and orders
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

  useEffect(() => {
    const fetchProductData = async () => {
      const token = localStorage.getItem("access_token");
      const res = await getAllProduct({ token });
      setProductLength(res?.data?.data);
    };
    fetchProductData();
  }, []);

  useEffect(() => {
    const getTestmonials = async () => {
      const token = localStorage.getItem("access_token");
      const testimonialsRes = await getTestimonial({ token });
      setTestmonialLength(testimonialsRes?.data?.data);
    };
    getTestmonials();
  }, []);

  useEffect(() => {
    const getCheckOutCall = async () => {
      const token = localStorage.getItem("access_token");
      const res = await getCheckOut({ token });
      setOrderLength(res?.data?.data?.checkout);
    };
    getCheckOutCall();
  }, []);

  // Create an array for cards
  const cardData = [
    {
      title: "Total Product",
      value: productLength?.length,
      icon: <RiRefund2Fill className="text-3xl text-[#FF6C2F]" />,
      component: "Product list",
    },
    {
      title: "Total Testimonials",
      value: testmonialLength?.length,
      icon: <TbShoppingCartCancel className="text-3xl text-[#FF6C2F]" />,
      component: "testimonials",
    },
    {
      title: "Total Categories",
      value: categoryLength?.length,
      icon: <BsBoxSeam className="text-3xl text-[#FF6C2F]" />,
      component: "category",
    },
    {
      title: "Total Order",
      value: orderLength?.length,
      icon: <TbTruckDelivery className="text-3xl text-[#FF6C2F]" />,
      component: "order list",
    },
  ];

  // Handle card click to update selected component in context
  const handleCardClick = (component) => {
    edit.setSelectedComponent(component);
  };

  return (
    <div>
      <div
        className={`flex flex-col md:flex-row ${edit?.width ? "gap-5" : "lg:gap-10 gap-2"}`}
      >
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.component)} // Card click handler
            className={`${
              edit.bodyColor
                ? "bg-[#111111] border-[5px] border-[#232323] hover:scale-105 hover:shadow-lg hover:shadow-white/20 hover:translate-y-2"
                : "bg-white shadow-lg rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-balck hover:translate-y-2"
            } flex shadow-lg p-4 w-full md:w-1/4 h-[140px] cursor-pointer`} // Add cursor pointer for click
          >
            <div
              className={`w-1/2 flex justify-center flex-col ${edit.bodyColor ? "text-white" : "text-black"}`}
            >
              <h1 className="text-lg font-semibold">{card.title}</h1>
              <h1 className="text-xl font-semibold text-gray-500 py-2">{card.value || "loading..."}</h1>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <div className="w-16 h-16 bg-[#FFF0E9] rounded-lg flex justify-center items-center">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
