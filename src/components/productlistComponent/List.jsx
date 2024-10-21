import React, { useContext, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import AddContext from "../../context/dashboard/AddContext";
import "./List.css";
import { ProductViewModal } from "../productComponent/ProductViewModal";
import {
  deleteSingleProduct,
  getAllProduct,
  getFile,
  getSingleProduct,
} from "../../api";
import { toast } from "react-toastify";
import { getCategory } from "../../api/category";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
export const List = () => {
  const [fetchCategoryData, setFetchCategoryData] = useState();
  const [categoryData, setCategoryData] = useState();
  const [selectOption, setSelectOption] = useState("All Category");
  const [avatar, setAvatar] = useState();
  const [singelProductData, setSingelProductData] = useState();
  const [productModal, setProductModal] = useState(false);
  const [allProduct, setAllProduct] = useState();
  const [deleteProduct, setDeleteProduct] = useState();
  const edit = useContext(AddContext);
  const [isOpenFilterCategoryModal, setIsOpenFilterCategoryModal] = useState();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await getCategory({ token });
        setCategoryData(res?.data?.data);
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
      setAllProduct(res?.data?.data);
    };
    fetchProductData();
  }, [deleteProduct]);

  useEffect(() => {
    if (allProduct?.length) {
      const ids = allProduct.map((item) => item.avatar);
      const fetchImage = async () => {
        const image = [];
        for (let i = 0; i < ids.length; i++) {
          try {
            const res = await getFile({ id: ids[i] });
            image.push(res?.data?.data);
          } catch (error) {
            console.error("Error fetching image:", error);
          }
        }
        setAvatar(image);
      };

      fetchImage();
    }
  }, [allProduct]);

  const singelProductCall = async (id) => {
    const token = localStorage.getItem("access_token");
    setProductModal(true);
    const res = await getSingleProduct({ id, token });
    setSingelProductData(res?.data?.data);
  };

  const deleteSingelProductCall = async (id) => {
    const token = localStorage.getItem("access_token");
    const res = await deleteSingleProduct({ id, token });
    setDeleteProduct(res);
    if (res) {
      toast("Product Deleted");
    }
  };

  const getCategoryItem = (nameCategory) => {
    setSelectOption(nameCategory);
  };

  const filteredData =
    selectOption === "All Category"
      ? allProduct
      : allProduct?.filter((item) => item?.categoryId?.name === selectOption);
  return (
    <div
      className={`${
        edit.bodyColor
          ? "bg-[#111111] border-[5px] border-[#232323]"
          : " bg-white shadow-lg rounded-lg"
      } w-full pb-4`}
    >
      <div className="w-full ">
        <div className="flex justify-between items-center p-4">
          <div>
            <h1
              className={`${
                edit.bodyColor ? "text-white" : " text-black"
              } text-lg font-semibold `}
            >
              All Product List{" "}
              <span className="text-amber-500">{filteredData?.length}</span>
            </h1>
          </div>
          <div className=" flex gap-2">
            <button
              className={`${
                edit.bodyColor ? "text-white" : " text-black"
              } bg-amber-500 p-2 rounded-lg text-white `}
              onClick={() => edit.getIDInUpdatedProduct("create Product")}
            >
              Add Product
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
                <>
                  <div
                    className="  text-white w-40  border-none rounded-md focus:outline-none bg-transparent absolute z-50 right-0 top-9 h-52 "
                    name="categoryId"
                  >
                    <div
                      className="bg-[#333333] border-none h-full overflow-y-auto  rounded-md p-1"
                      style={{ scrollbarWidth: "thin" }}
                    >
                      <div
                        value=""
                        className="text-white border-none cursor-pointer hover:bg-slate-600 py-1 hover:rounded-md px-2"
                        onClick={() => getCategoryItem("All Category")}
                      >
                        All Category
                      </div>
                      {categoryData?.map((item) => (
                        <option
                          value={item?.name}
                          className="text-white border-none hover:bg-slate-600 hover:rounded-md  cursor-pointer py-1 px-2"
                          onClick={() => getCategoryItem(item?.name)}
                        >
                          {item?.name}
                        </option>
                      ))}
                    </div>
                  </div>
                </>
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
                <th className="pb-2 whitespace-nowrap text-start pl-5">
                  Product Name & Size
                </th>
                <th className="pb-2 whitespace-nowrap">Price</th>
                <th className="pb-2 whitespace-nowrap">Stock</th>
                <th className="pb-2 whitespace-nowrap">Category</th>
                <th className="pb-2 whitespace-nowrap">Rating</th>
                <th className="pb-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {filteredData?.length > 0 ? (
                filteredData?.map((item) => (
                  <tr
                    className={`border-t border-[#232323] shadow-slate-50 ${
                      edit.bodyColor ? "text-white" : " text-black"
                    }`}
                  >
                    <td className="py-2 text-center">
                      <input type="checkbox" className="cursor-pointer" />
                    </td>
                    <td>
                      <div className="flex justify-start items-center gap-2  whitespace-nowrap">
                        <div className="w-14 h-14 rounded-xl bg-slate-200 flex justify-center items-center ml-10">
                          <img
                            src={`data:image/png;base64,${item?.image}`}
                            className="w-full h-full rounded-lg"
                            alt="Product Avatar"
                          />
                        </div>
                        <h1
                          className={`${
                            edit.bodyColor ? "text-amber-500" : " text-black"
                          } text-sm md:text-base font-normal text-center`}
                        >
                          {item?.name}
                        </h1>
                      </div>
                    </td>
                    <td className="text-sm md:text-base font-normal whitespace-nowrap text-center">
                      {item?.price}
                    </td>
                    <td className="text-center text-sm md:text-base font-normal whitespace-nowrap">
                      {item?.stock}
                    </td>
                    <td className="text-sm md:text-base font-normal whitespace-nowrap text-center">
                      {item?.categoryId?.name}
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="flex text-sm md:text-base font-normal justify-center items-center">
                        <h1>{item.review}</h1>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="flex justify-center items-center gap-5">
                        <FaRegEye
                          className="cursor-pointer text-lg hover:text-amber-500"
                          onClick={() => singelProductCall(item?._id)}
                        />
                        <BiEdit
                          className="cursor-pointer text-lg hover:text-amber-500"
                          onClick={() =>
                            edit.getIDInUpdatedProduct(
                              "edit Product",
                              item?._id
                            )
                          }
                        />
                        <MdDelete
                          className="cursor-pointer text-lg hover:text-amber-500"
                          onClick={() => deleteSingelProductCall(item?._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-red-600 mt-5 text-2xl "
                  >
                    Not Found Produuct
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className=" fixed h-full w-full "
        onClick={() => {
          setIsOpenFilterCategoryModal(false);
        }}
      ></div>
      {productModal && (
        <ProductViewModal
          setProductModal={setProductModal}
          singelProductData={singelProductData}
        />
      )}
    </div>
  );
};
