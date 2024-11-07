import React, { useEffect, useRef, useState } from "react";
import {
  getCategoryCardDesign,
  updateCategoryCardDesign,
} from "../../api/categoryCardDesign";
import { updateFile } from "../../api";
import { toast } from "react-toastify";

export const CategoryCard = () => {
  const [ids, setIds] = useState();
  const [singelFile, setSingelFile] = useState();
  const [editAble, setEditAble] = useState();
  const [categoryCardDesignData, setCategoryCardDesignData] = useState();
  const inputFile = useRef();

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setSingelFile(e.target.files[0]);
    }
  };
  const getCategoryCardDesignCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getCategoryCardDesign({ token });
    console.log(res);
    setCategoryCardDesignData(res?.data?.data);
  };

  useEffect(() => {
    getCategoryCardDesignCall();
  }, []);

  const singleImageHandelClick = () => {
    inputFile.current.click();
  };
  const updateFileCall = async (id) => {
    const token = localStorage.getItem("access_token");
    const fromData = new FormData();
    fromData.append("file", singelFile);
    const res = await updateFile({ fromData, token, id });
    if (res.status === 200) {
      toast("updated image CategoryCardDesign");
    }
  };
  useEffect(() => {
    console.log(singelFile);
    if (singelFile) {
      updateFileCall(ids);
      console.log(ids);
    }
  }, [singelFile]);

  const updateCategoryCardDesignCallCall = async (id, index) => {
    delete categoryCardDesignData[index]?.__v;
    delete categoryCardDesignData[index]?._id;
    const token = localStorage.getItem("access_token");
    if (editAble === index) {
      try {
        const updatedCategoryCardDesignData = {
          imageId: categoryCardDesignData[index].imageId._id,
          categoryCardDesignh1:
            categoryCardDesignData[index].categoryCardDesignh1,
          categoryCardDesignh2:
            categoryCardDesignData[index].categoryCardDesignh2,
        };
        const res = await updateCategoryCardDesign({
          updatedCategoryCardDesignData: updatedCategoryCardDesignData,
          id,
          token,
        });
        console.log(res);
        if (res.status === 200) {
          toast("updated CategoryCardDesign ");
          setEditAble(null);
          getCategoryCardDesignCall();
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex w-full justify-center items-center ">
      <div
        className="container p-4 h-auto xl:h-auto md:h-auto  gap-5 md:gap-10 flex-col md:flex-row"
        style={{ display: "flex" }}
      >
        {categoryCardDesignData &&
          categoryCardDesignData?.map((item, index) => (
            <div className="md:w-1/2 border-solid   border-[10px] h-[290px] border-[#232323] cursor-pointer overflow-hidden relative">
              {editAble === index ? (
                <div className="absolute top-3 z-40 left-3 ">
                  <button
                    className="bg-white px-4 py-2 rounded-lg "
                    onClick={() => {
                      setEditAble(null);
                      updateCategoryCardDesignCallCall(item?._id, index);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="absolute top-3 left-3 z-40">
                  <button
                    className="bg-white px-4 py-2 rounded-lg "
                    onClick={() => {
                      setEditAble(index);
                      getCategoryCardDesignCall();
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}

              {editAble === index ? (
                <div className="">
                  <div className="absolute top-5 right-5 bg-white px-3 py-2 rounded-lg">
                    <button onClick={singleImageHandelClick}>
                      File Upload
                    </button>
                    <input
                      type="file"
                      className="hidden"
                      ref={inputFile}
                      onChange={(e) => {
                        handleFileChange(e);
                        setIds(item?.imageId?._id);
                      }}
                    />
                  </div>
                  <img
                    src={
                      item?.imageId?._id === ids && singelFile
                        ? URL.createObjectURL(singelFile)
                        : `data:image/png;base64,${item.imageId?.image}`
                    }
                    className="w-full h-[290px]"
                  />
                </div>
              ) : (
                <div className="">
                  <img
                    src={`data:image/png;base64,${item?.imageId?.image}`}
                    className="w-full h-[290px]"
                  />
                </div>
              )}

              <div className=" absolute flex flex-col justify-center items-center top-6 md:top-10 xl:top-24  lg:top-14 left-5 md:left-10">
                {editAble === index ? (
                  <form action="">
                  <input
                    type="text"
                    className="bg-transparent border text-amber-500 lg:text-xl font-semibold italic"
                    name="categoryCardDesignh1"
                    value={item.categoryCardDesignh1}
                    required   min={5}
                    maxLength={20}
                    onChange={(e) =>
                      setCategoryCardDesignData((prevData) =>
                        prevData.map((item, idx) =>
                          idx === index
                            ? { ...item, [e.target.name]: e.target.value }
                            : item
                        )
                      )
                    }
                  />
                  </form>
                ) : (
                  <h1 className="text-amber-500 lg:text-xl font-semibold italic">
                    {item?.categoryCardDesignh1}
                  </h1>
                )}

                {editAble === index ? (
                  <form action="">
                  <input
                    type="text"
                    className="bg-transparent mt-2 border md:text-xl heading lg:text-3xl py-1  md:pb-2 font-semibold text-white lg:py-3"
                    name="categoryCardDesignh2"
                    value={item.categoryCardDesignh2}
                    required
                    min={5}
                    maxLength={20}
                    onChange={(e) =>
                      setCategoryCardDesignData((prevData) =>
                        prevData.map((item, idx) =>
                          idx === index
                            ? { ...item, [e.target.name]: e.target.value }
                            : item
                        )
                      )
                    }
                  />
                  </form>
                ) : (
                  <h1 className="md:text-xl heading lg:text-3xl py-1  md:pb-2 font-semibold text-white lg:py-3">
                    {item?.categoryCardDesignh2}
                  </h1>
                )}
                <h1 className="md:text-xl heading lg:text-3xl py-1  md:pb-2 font-semibold text-white lg:py-3 "></h1>
                <button className="shop-button px-2 py-1 lg:px-4 lg:py-2   bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white font-semibold  rounded-full flex justify-center items-center">
                  <span className="text-[10px] md:text-base">Shop Now</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
