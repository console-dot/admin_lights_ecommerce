import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { category } from "../../api/category";
import { toast } from "react-toastify";
import AddContext from "../../context/dashboard/AddContext";

export const CategoryModal = ({ fetchCategoryDataCall }) => {
  const edit = useContext(AddContext);
  const [categoryData, setCategoryData] = useState();
  const addCategory = async () => {
    const token = localStorage.getItem("access_token");
    const res = await category({ categoryData, token });
    if (res?.status === 201) {
      toast("Add Category");
      setCategoryData({
        name: "",
        description: "",
        stock: "",
      });
      fetchCategoryDataCall();
      edit.setAddCategoryModal(false);
    } else {
      toast("fill this input field");
    }
  };

  return (
    <div className="fixed flex justify-center items-center w-full h-screen z-40 bottom-[5%]">
      <div className="absolute w-72 sm:w-96   bg-[#262D34] rounded-lg p-5">
        <div className="flex flex-col relative">
          <div
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => edit.setAddCategoryModal(false)}
          >
            <ImCross className="text-white text-lg" />
          </div>
          <h1 className="text-white text-2xl text-center">Add Category</h1>

          <div className="flex flex-col mt-2">
            <h1 className="text-white">Category Name</h1>
            <input
              type="text"
              className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white"
              placeholder="Category Name..."
              value={categoryData?.name}
              name="name"
              onChange={(e) =>
                setCategoryData({
                  ...categoryData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col mt-2">
            <h1 className="text-white">description</h1>
            <textarea
              type="text"
              className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white"
              placeholder="description..."
              value={categoryData?.description}
              name="description"
              onChange={(e) =>
                setCategoryData({
                  ...categoryData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col mt-2">
            <h1 className="text-white">Stock</h1>
            <input
              type="number"
              className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white"
              placeholder="Category Name..."
              value={categoryData?.stock}
              name="stock"
              onChange={(e) =>
                setCategoryData({
                  ...categoryData,
                  [e.target.name]: parseInt(e.target.value),
                })
              }
            />
          </div>

          <div className="w-full flex justify-center items-center py-5 gap-10">
            <button
              className="px-3 py-2 bg-amber-500 text-white rounded-lg"
              onClick={addCategory}
            >
              Add Category
            </button>
            <button
              className="px-3  py-2 bg-slate-200 rounded-lg"
              onClick={() => edit.setAddCategoryModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
