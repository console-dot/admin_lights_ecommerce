import React, { useContext, useEffect, useState } from "react";
import {
  deleteCategoryById,
  getCategory,
  getCategoryById,
  updateCategoryById,
} from "../../api/category";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import AddContext from "../../context/dashboard/AddContext";
import { CategoryModal } from "../productComponent/CategoryModal";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Category = () => {
  const [isOpenFilterCategoryModal, setIsOpenFilterCategoryModal] = useState();
  const [selectOption, setSelectOption] = useState("All Category");
  const [categoryUpdateId, setCategoryUpdateId] = useState();
  const [categoryViewModal, setCategoryViewModal] = useState(false);
  const [categoryUpdateModal, setCategoryUpdateModal] = useState(false);
  const [singleCateagoryData, setSingelCategoryDta] = useState();
  const [categoryData, setCategoryData] = useState();
  const edit = useContext(AddContext);
  const fetchCategoryData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await getCategory({ token });
      setCategoryData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const deleteSingelCategoryCall = async (id) => {
    const token = localStorage.getItem("access_token");
    const res = await deleteCategoryById({ id, token });

    if (res?.status === 200) {
      fetchCategoryData();
      toast("Delete Category", { className: "text-red" });
    }
  };
  const getSingelCategoryCall = async (id) => {
    const token = localStorage.getItem("access_token");
    const res = await getCategoryById({ id, token });
    setSingelCategoryDta(res?.data?.data);
  };
  const updateSingelCategoryCall = async (id) => {
    delete singleCateagoryData?.__v;
    delete singleCateagoryData?._id;
    const token = localStorage.getItem("access_token");
    const res = await updateCategoryById({
      data: singleCateagoryData,
      id,
      token,
    });

    if (res?.status === 200) {
      toast("Category Updated");
      fetchCategoryData();
      setCategoryUpdateModal(false);
    }
  };

  const viewCategoryFun = (id) => {
    setCategoryViewModal(true);
    getSingelCategoryCall(id);
  };
  const updateCategoryFun = (id) => {
    setCategoryUpdateModal(true);
    getSingelCategoryCall(id);
    setCategoryUpdateId(id);
  };
  const filteredData =
    selectOption === "All Category"
      ? categoryData
      : categoryData?.filter((item) => item.name === selectOption);
  return (
    <div
      className={`${
        edit.bodyColor
          ? "bg-[#111111] border-[5px] border-[#232323]"
          : " bg-white shadow-lg rounded-lg"
      } w-full `}
    >
      <div className="w-full ">
        <div className="flex justify-between items-center p-4 border-b border-[#232323]">
          <div>
            <h1
              className={`${
                edit.bodyColor ? "text-white" : " text-black"
              } text-lg font-semibold `}
            >
              All Category List{" "}
              <span className="text-amber-500">{filteredData?.length}</span>
            </h1>
          </div>
          <div className=" flex gap-2">
            <button
              className={`${
                edit.bodyColor ? "text-white" : " text-black"
              } bg-amber-500 p-2 rounded-lg text-white `}
              onClick={() => edit?.setAddCategoryModal(true)}
            >
              Add Category
            </button>
            <div
              className="rounded-md h-full cursor-pointer  bg-amber-500 p-2 relative"
              onClick={() =>
                setIsOpenFilterCategoryModal(!isOpenFilterCategoryModal)
              }
            >
              <div className="flex justify-between w-36 items-center">
                <h1 className="text-white">{selectOption}</h1>
                {isOpenFilterCategoryModal ? (
                  <IoIosArrowUp className="text-white text-center" />
                ) : (
                  <IoIosArrowDown className="text-white" />
                )}
              </div>

              {isOpenFilterCategoryModal && (
                <div
                  className="  text-white w-40  border-none rounded-md focus:outline-none bg-transparent absolute right-0 top-9 h-52 "
                  name="categoryId"
                >
                  <div
                    className="bg-[#333333] border-none h-full overflow-y-auto  rounded-md p-1"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    <div
                      value=""
                      className="text-white border-none cursor-pointer hover:bg-slate-600 py-1 hover:rounded-md px-2"
                      onClick={() => setSelectOption("All Category")}
                    >
                      All Category
                    </div>
                    {categoryData?.map((item) => (
                      <option
                        value={item?.name}
                        className="text-white border-none hover:bg-slate-600 hover:rounded-md  cursor-pointer py-1 px-2"
                        onClick={() => setSelectOption(item?.name)}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-x-scroll md:overflow-hidden">
          <table className="w-full  table-auto">
            <thead>
              <tr
                className={`${
                  edit.bodyColor ? "text-white" : " text-black"
                } text-start`}
              >
                <th className="pb-2">
                  <input type="checkbox" className="cursor-pointer" />
                </th>
                <th className="pb-2 whitespace-nowrap">Name</th>
                <th className="pb-2 whitespace-nowrap">StocK</th>
                <th className="pb-2 whitespace-nowrap">Description</th>
                <th className="pb-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {filteredData?.map((item) => (
                <tr
                  className={`border-t border-[#232323] shadow-slate-50 ${
                    edit.bodyColor ? "text-white" : " text-black"
                  }`}
                >
                  <td className="py-2 text-center">
                    <input type="checkbox" className="cursor-pointer" />
                  </td>
                  <td className="text-sm md:text-base font-normal whitespace-nowrap text-center">
                    {item?.name}
                  </td>
                  <td className="text-center text-sm md:text-base font-normal whitespace-nowrap">
                    {item?.stock}
                  </td>
                  <td className="text-sm md:text-base font-normal whitespace-nowrap text-center">
                    {item?.description}
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex justify-center items-center gap-5">
                      <FaRegEye
                        className="cursor-pointer text-lg hover:text-amber-500"
                        onClick={() => viewCategoryFun(item?._id)}
                      />
                      <BiEdit
                        className="cursor-pointer text-lg hover:text-amber-500"
                        onClick={() => updateCategoryFun(item?._id)}
                      />
                      <MdDelete
                        className="cursor-pointer text-lg hover:text-amber-500"
                        onClick={() => deleteSingelCategoryCall(item?._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {categoryViewModal && (
        <div className="fixed flex justify-center items-center w-full h-screen z-40 bottom-[5%]">
          <div className="absolute w-72 sm:w-96   bg-[#262D34] rounded-lg p-5">
            <div className="flex flex-col relative">
              <div
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => setCategoryViewModal(false)}
              >
                <ImCross className="text-white text-lg" />
              </div>
              <h1 className="text-white text-2xl text-center">View Category</h1>

              <div className="flex flex-col mt-2">
                <h1 className="text-white">Category Name</h1>
                <h1 className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white">
                  {singleCateagoryData?.name}
                </h1>
              </div>
              <div className="flex flex-col mt-2">
                <h1 className="text-white">description</h1>
                <h1 className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white">
                  {singleCateagoryData?.description}
                </h1>
              </div>
              <div className="flex flex-col mt-2">
                <h1 className="text-white">Stock</h1>
                <h1 className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white">
                  {singleCateagoryData?.stock}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
      {categoryUpdateModal && (
        <div className="fixed flex justify-center items-center w-full h-screen z-40 bottom-[5%]">
          <div className="absolute w-72 sm:w-96   bg-[#262D34] rounded-lg p-5">
            <div className="flex flex-col relative">
              <div
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => setCategoryUpdateModal(false)}
              >
                <ImCross className="text-white text-lg" />
              </div>
              <h1 className="text-white text-2xl text-center">
                Update Category
              </h1>

              <div className="flex flex-col mt-2">
                <h1 className="text-white">Category Name</h1>
                <input
                  type="text"
                  className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white"
                  placeholder="Category Name..."
                  value={singleCateagoryData?.name}
                  name="name"
                  onChange={(e) =>
                    setSingelCategoryDta({
                      ...singleCateagoryData,
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
                  value={singleCateagoryData?.description}
                  name="description"
                  onChange={(e) =>
                    setSingelCategoryDta({
                      ...singleCateagoryData,
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
                  value={singleCateagoryData?.stock}
                  name="stock"
                  onChange={(e) =>
                    setSingelCategoryDta({
                      ...singleCateagoryData,
                      [e.target.name]: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex justify-center items-center ">
                <button
                  className="text-white bg-amber-500 py-2 px-4 rounded-lg "
                  onClick={() => updateSingelCategoryCall(categoryUpdateId)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-full relative">
        {edit.addCategoryModal && (
          <CategoryModal fetchCategoryDataCall={fetchCategoryData} />
        )}
      </div>
    </div>
  );
};
