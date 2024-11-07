import React, { useContext, useEffect, useRef, useState } from "react";
import AddContext from "../../context/dashboard/AddContext";
import { CategoryModal } from "./CategoryModal";
import {
  createFile,
  getSingleProduct,
  updateFile,
  updateSingleProduct,
} from "../../api";
import { getCategory, getCategoryById } from "../../api/category";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";

export const EditProduct = () => {
  const [singelBgFile, setSingelBgFile] = useState();
  const [updateProductId, setupdateProductId] = useState();
  const [singelProductData, setSingelProductData] = useState();
  const [categoryName, setCategoryName] = useState();
  const [createProductData, setCreateProductData] = useState({});
  const [singelFile, setSingelFile] = useState();
  const [categoryData, setCategoryData] = useState();
  const [gallery, setGallery] = useState([]);
  const data = useContext(AddContext);
  const inputFile = useRef(null);
  const inputFiles = useRef(null);
  const inputBgFiles = useRef(null);
  // get call in product
  useEffect(() => {
    const getProductById = async () => {
      const token = localStorage.getItem("access_token");
      const productId = data?.updateProductId;
      const res = await getSingleProduct({ id: productId, token });
      if (res) {
        setSingelProductData(res?.data?.data);
      }
    };
    getProductById();
  }, []);
  useEffect(() => {}, [singelProductData]);

  // useEffect(() => {}, [createProductData, singelFile]);

  // update call in product
  const updateSingelProductCall = async (id) => {
    setupdateProductId(id);
    const avatarId = singelProductData?.avatar?._id;
    const bgImageId = singelProductData?.bgImage?._id;
    const galleryIds = [];
    for (let i = 0; i < singelProductData?.gallery?.length; i++) {
      galleryIds.push(singelProductData?.gallery[i]._id);
      const categoryId =
        singelProductData?.categoryId?._id || singelProductData?.categoryId;
      if (avatarId) {
        setSingelProductData({
          ...singelProductData,
          avatar: avatarId,
          categoryId: categoryId,
          bgImage: bgImageId,
          gallery: galleryIds,
        });
      }
    }
  };

  // useEffect(() => {
  //   const type = singelProductData?.categoryId;
  //   if (typeof type === "object") {
  //     const categoryId = singelProductData?.categoryId?._id;
  //     setSingelProductData({ ...singelProductData, categoryId: categoryId });
  //   }
  // }, [singelProductData?.categoryId]);
  const updateCall = async () => {
    console.log(singelProductData);
    const token = localStorage.getItem("access_token");
    const res = await updateSingleProduct({
      singelProductData: singelProductData,
      id: updateProductId,
      token,
    });
    if (res?.status === 200) {
      toast("product is updated");
      console.log(res.data.data);
      data.getIDInUpdatedProduct("Product list");
    } else {
      toast("product is not updated");
    }
  };
  useEffect(() => {
    if (updateProductId) {
      console.log(singelProductData);
      delete singelProductData?.__v;
      delete singelProductData?._id;
      updateCall();
    }
  }, [updateProductId]);

  // update single file call
  useEffect(() => {
    if (singelFile?.length > 0) {
      const fileUpload = async () => {
        const token = localStorage.getItem("access_token");
        const id = singelProductData?.avatar?._id;
        const fromData = new FormData();
        fromData.append("file", singelFile);
        const res = await updateFile({ fromData, token, id });
      };
      fileUpload();
    }
  }, [singelFile]);
  // update bgImage in  product
  useEffect(() => {
    if (singelBgFile?.length > 0) {
      const fileUpload = async () => {
        const token = localStorage.getItem("access_token");
        const id = singelProductData?.BgImage?._id;
        const fromData = new FormData();
        fromData.append("file", singelBgFile);
        const res = await updateFile({ fromData, token, id });
      };
      fileUpload();
    }
  }, [singelBgFile]);
  const galleryUpload = async () => {
    const galleryIds = [];
    const token = localStorage.getItem("access_token");
    for (let i = 0; i < gallery.length; i++) {
      const fromData = new FormData();
      fromData.append("file", gallery[i]);
      console.log(gallery[i]);
      try {
        const res = await createFile({ fromData, token });
        galleryIds.push(res?.data?.data);
        console.log(res);
      } catch (error) {
        console.error("Error:", error);
      }
      console.log(galleryIds);
    }
    setSingelProductData({
      ...singelProductData,
      gallery: galleryIds,
    });
  };
  useEffect(() => {
    galleryUpload();
  }, [gallery]);

  const handelGalleryFileChange = (e) => {
    const file = Array.from(e.target.files);
    setGallery((prevImages) => [...prevImages, ...file]);
  };

  // single image click
  const singleImageClick = () => {
    inputFile.current.click();
  };
  const singleBgImageClick = () => {
    inputBgFiles.current.click();
  };
  const multiplyImageClick = () => {
    inputFiles.current.click();
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSingelFile(e.target.files[0]);
    }
  };
  const handleBgFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSingelBgFile(e.target.files[0]);
    }
  };
  const deleteImge = (id) => {
    const deleteImage = singelProductData?.gallery?.filter(
      (item) => item?._id !== id
    );
    setSingelProductData({ ...singelProductData, gallery: deleteImage });
  };

  // get All Category call
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
  }, [createProductData?.categoryId, data.addCategoryModal]);

  // get single category Call
  useEffect(() => {
    if (createProductData?.categoryId) {
      const id = createProductData?.categoryId;

      const fetchSingleCategory = async () => {
        const token = localStorage.getItem("access_token");
        const res = await getCategoryById({ id, token });
        setCategoryName(res?.data?.data);
      };

      fetchSingleCategory();
    }
  }, [createProductData?.categoryId]);
  const sectionHandelChange = (section) => {
    console.log(section);
    setSingelProductData({
      ...singelProductData,
      section: section,
    });
  };
  return (
    <>
      <div className="w-full flex gap-5 ">
        {/* card view */}
        <div
          className={`hidden lg:flex ${data?.width ? "w-[40%]" : "w-[35%]"} ${
            data.bodyColor
              ? "bg-[#111111] border-[5px] border-[#232323]"
              : " bg-white shadow-lg rounded-lg"
          } h-[650px]  p-2 flex flex-col`}
        >
          <div className="w-full h-2/5 flex border-none justify-center items-center">
            <div className="w-full h-full rounded-xl border-none">
              {singelFile ? (
                <div className={`flex w-full h-full bg-slate-200 rounded-xl`}>
                  <img
                    src={URL.createObjectURL(singelFile)}
                    className="w-full h-full rounded-lg"
                  />
                </div>
              ) : (
                <div className={`flex  w-full  h-full bg-slate-200 rounded-xl`}>
                  <img
                    src={`data:image/png;base64,${singelProductData?.avatar?.image}`}
                    className="w-full h-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 flex flex-col">
            <h1
              className={`text-lg font-semibold ${
                data.bodyColor ? "text-white" : "text-black"
              }`}
            >
              {singelProductData?.name || "Name"}
            </h1>
            <h1 className="text-[#414141]">
              ({categoryName?.name || "category"})
            </h1>
          </div>
          <div className="mt-2">
            <h1
              className={`text-lg font-semibold ${
                data.bodyColor ? "text-white" : "text-black"
              }`}
            >
              Price :
            </h1>
            <h1 className="text-[#414141] font-semibold  flex gap-2 -tracking-tight">
              <span className="line-through ">
                {createProductData?.price || "Name"}
              </span>
              $80(30% Off)
            </h1>
          </div>
          <div className="mt-2 flex gap-2">
            <h1
              className={`text-lg font-semibold ${
                data.bodyColor ? "text-white" : "text-black"
              }`}
            >
              Brand :
            </h1>
            <h1 className="text-[#414141] font-semibold tracking-wide">
              Royal
            </h1>
          </div>
          <div className="mt-2 flex gap-2">
            <h1
              className={`text-lg font-semibold ${
                data.bodyColor ? "text-white" : "text-black"
              }`}
            >
              stock :
            </h1>
            <h1 className="text-[#414141] font-semibold tracking-wide">
              {createProductData?.stock || "Name"}
            </h1>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <h1
              className={`text-lg font-semibold ${
                data.bodyColor ? "text-white" : "text-black"
              }`}
            >
              More Images
            </h1>
            <div className="flex gap-5 overflow-x-scroll no-scrollbar">
              {gallery.length > 0
                ? gallery.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`upload-${index}`}
                      className="rounded-xl"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  ))
                : singelProductData?.gallery.map((image, index) => (
                    <>
                      <img
                        key={index}
                        src={`data:image/png;base64,${image?.image}`}
                        alt={`upload-${index}`}
                        className="rounded-xl"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </>
                  ))}
            </div>
          </div>
          <div className="mt-2 flex justify-between py-3">
            <button className="px-3 py-2 bg-amber-500 text-white rounded-lg">
              Update Product
            </button>
            <button className="px-3  py-2 bg-slate-200 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
        {/* compelete product add */}
        <div
          className={`w-full lg:${
            data?.width ? "w-[60%]" : "w-[65%]"
          } flex flex-col`}
        >
          {/* product add Image */}
          <div
            className={`${
              data.bodyColor
                ? "bg-[#111111] border-[5px] border-[#232323]"
                : " bg-white shadow-lg rounded-lg"
            }   w-full h-[350px] p-2 flex flex-col`}
            onClick={singleImageClick}
          >
            <div className="w-full h-[15%] flex items-center justify-start border-b md:px-5 border-[#5D5D5D] ">
              <h1
                className={`${
                  data.bodyColor ? "text-amber-500" : "text-black"
                } md:text-xl font-semibold`}
              >
                Add Product Photo
              </h1>
            </div>
            <div className="h-[85%] w-full flex justify-center items-center ">
              <div className="w-[90%] h-[90%] rounded-lg flex-col flex justify-center items-center border-dashed border-2 border-[#5D5D5D] cursor-pointer">
                <input
                  type="file"
                  id="imgupload"
                  ref={inputFile}
                  className={`hidden appearance-none`}
                  onChange={handleFileChange}
                />
                {singelFile ? (
                  <div className={`flex  w-32 h-32 bg-slate-200 rounded-xl`}>
                    <img
                      src={URL.createObjectURL(singelFile)}
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                ) : (
                  <div className={`flex  w-32 h-32 bg-slate-200 rounded-xl`}>
                    <img
                      src={`data:image/png;base64,${singelProductData?.avatar?.image}`}
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* product background Image */}
          <div
            className={`${
              data.bodyColor
                ? "bg-[#111111] border-[5px] border-[#232323]"
                : " bg-white shadow-lg rounded-lg"
            }   w-full h-[350px] p-2 flex flex-col`}
            onClick={singleBgImageClick}
          >
            <div className="w-full h-[15%] flex items-center justify-start border-b md:px-5 border-[#5D5D5D] ">
              <h1
                className={`${
                  data.bodyColor ? "text-amber-500" : "text-black"
                } md:text-xl font-semibold`}
              >
                Add Background Image
              </h1>
            </div>
            <div className="h-[85%] w-full flex justify-center items-center ">
              <div className="w-[90%] h-[90%] rounded-lg flex-col flex justify-center items-center border-dashed border-2 border-[#5D5D5D] cursor-pointer">
                <input
                  type="file"
                  id="imgupload"
                  ref={inputBgFiles}
                  className={`hidden appearance-none`}
                  onChange={handleBgFileChange}
                />
                {singelBgFile ? (
                  <div className={`flex  w-32 h-32 bg-slate-200 rounded-xl`}>
                    <img
                      src={URL.createObjectURL(singelBgFile)}
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                ) : (
                  <div className={`flex  w-32 h-32 bg-slate-200 rounded-xl`}>
                    <img
                      src={`data:image/png;base64,${singelProductData?.bgImage?.image}`}
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* add more Images */}
          <div
            className={`${
              data.bodyColor
                ? "bg-[#111111] border-[5px] border-[#232323]"
                : " bg-white shadow-lg rounded-lg"
            } w-full h-[350px]  mt-10 flex flex-col`}
          >
            <div className="w-full h-[15%] md:px-5 flex items-center justify-between border-b  border-[#414141] ">
              <h1
                className={`${
                  data.bodyColor ? "text-amber-500" : "text-black"
                } md:text-xl font-semibold`}
              >
                Add Product More Images
              </h1>
              <div className="" onClick={multiplyImageClick}>
                {" "}
                <button className="px-3 py-2 bg-amber-500 text-white rounded-lg">
                  Add More Image
                </button>
              </div>
            </div>
            <div className="h-[85%] w-full flex justify-center items-center ">
              <div
                className={`w-[90%] h-[90%] rounded-lg flex-col flex justify-center items-center border-dashed  border-2  border-[#414141] cursor-pointer ${
                  gallery.length > 5
                    ? "overflow-x-scroll"
                    : "overflow-x-hidden "
                }`}
              >
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={handelGalleryFileChange}
                    accept="image/*"
                    ref={inputFiles}
                    className="hidden z-30"
                  />
                  <div className="flex gap-3">
                    {gallery.length > 0
                      ? gallery.map((image, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`upload-${index}`}
                            className="rounded-xl"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              margin: "10px",
                            }}
                          />
                        ))
                      : singelProductData?.gallery.map((image, index) => (
                          <div className="w-full h-full relative z-30">
                            <div
                              className="absolute top-0 right-0 z-50 hover:text-amber-500"
                              onClick={() => {
                                deleteImge(image?._id);
                              }}
                            >
                              <ImCross className="text-white" />
                            </div>
                            <img
                              key={index}
                              src={`data:image/png;base64,${image?.image}`}
                              alt={`upload-${index}`}
                              className="rounded-xl"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                margin: "10px",
                              }}
                            />
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              data.bodyColor
                ? "bg-[#111111] border-[5px] border-[#232323]"
                : " bg-white shadow-lg rounded-lg"
            } w-full  mt-10 p-2 flex flex-col`}
          >
            <div className="w-full flex items-center justify-start border-b  border-[#414141]">
              <h1
                className={`${
                  data.bodyColor ? "text-amber-500" : "text-black"
                } md:text-xl  font-semibold pb-1`}
              >
                Product Section
              </h1>
            </div>
            <div
              className="flex justify-around items-center gap-4 py-4
               "
            >
              <div className="flex justify-start items-center gap-4">
                {" "}
                <input
                  type="radio"
                  name="new_arrivals"
                  value="new_arrivals"
                  checked={
                    singelProductData?.section === "new_arrivals" ? true : false
                  }
                  id="radio"
                  onChange={(e) => {
                    if (e.target.checked) {
                      sectionHandelChange(e.target.value);
                      // Send value if checked
                    } else {
                    }
                  }}
                />
                <h1 className="text-white"> NewArival </h1>
              </div>
              <div className="flex justify-start items-center gap-4">
                {" "}
                <input
                  type="radio"
                  name="feature"
                  checked={
                    singelProductData?.section === "feature" ? true : false
                  }
                  value="feature"
                  id="radio"
                  onChange={(e) => {
                    if (e.target.checked) {
                      sectionHandelChange(e.target.value); // Send value if checked
                    } else {
                    }
                  }}
                />
                <h1 className="text-white"> Feature </h1>
              </div>
              <div className="flex justify-start items-center gap-4">
                {" "}
                <input
                  type="radio"
                  name="sales"
                  value="sales"
                  checked={
                    singelProductData?.section === "sales" ? true : false
                  }
                  id="radio"
                  onChange={(e) => {
                    if (e.target.checked) {
                      sectionHandelChange(e.target.value); // Send value if checked
                    } else {
                    }
                  }}
                />
                <h1 className="text-white"> Sales </h1>
              </div>
              <div className="flex justify-start items-center gap-4">
                {" "}
                <input
                  type="radio"
                  name="none"
                  value="none"
                  checked={singelProductData?.section === "none" ? true : false}
                  id="radio"
                  onChange={(e) => {
                    if (e.target.checked) {
                      sectionHandelChange(e.target.value); // Send value if checked
                    } else {
                    }
                  }}
                />
                <h1 className="text-white">None </h1>
              </div>
            </div>
          </div>

          {/* product Description infromation */}
          <div
            className={`${
              data.bodyColor
                ? "bg-[#111111] border-[5px] border-[#232323]"
                : " bg-white shadow-lg rounded-lg"
            } w-full max-h-[1100px] md:max-h-[700px] mt-10 p-2 flex flex-col`}
          >
            <div className="w-full h-[5%] md:h-[10%] flex items-center justify-start border-b  border-[#414141]">
              <h1
                className={`${
                  data.bodyColor ? "text-amber-500" : "text-black"
                } md:text-xl  font-semibold`}
              >
                Product Information
              </h1>
            </div>
            <div className="h-[95%] md:h-[90%] w-full lg:p-5">
              <div className="w-full flex flex-col md:flex-row md:gap-10 ">
                <div className="w-full md:w-1/2 flex flex-col ">
                  <h1
                    className={`py-2 ${
                      data.bodyColor ? "text-white" : "text-black"
                    }`}
                  >
                    Product Name
                  </h1>
                  <input
                    type="text"
                    className={`p-2 rounded-md  border ${
                      data.bodyColor ? "text-white" : "text-black"
                    } border-[#414141]  bg-transparent focus:outline-none`}
                    name="name"
                    value={singelProductData?.name}
                    onChange={(e) =>
                      setSingelProductData({
                        ...singelProductData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Name..."
                  />
                </div>
                <div className="w-full md:w-1/2  flex flex-col relative">
                  <h1
                    className={`py-2 ${
                      data.bodyColor ? "text-white" : "text-black"
                    }`}
                  >
                    Prduct Category
                  </h1>
                  <select
                    className={`p-2 rounded-md  border ${
                      data.bodyColor ? "text-white" : "text-black"
                    } border-[#414141]  bg-transparent focus:outline-none`}
                    name="categoryId"
                    onChange={(e) =>
                      setSingelProductData({
                        ...singelProductData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    required
                  >
                    {singelProductData?.categoryId?.name ? (
                      <option value="" className="text-[#414141]">
                        {singelProductData?.categoryId?.name}
                      </option>
                    ) : (
                      <option value="" className="text-[#414141]">
                        Choose category
                      </option>
                    )}
                    {categoryData?.map((item) => (
                      <option value={item._id} className="text-black">
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full flex md:mt-5  flex-col md:flex-row md:gap-10 ">
                <div className="w-full md:w-1/2 ">
                  <h1
                    className={`py-2 ${
                      data.bodyColor ? "text-white" : "text-black"
                    }`}
                  >
                    Instock
                  </h1>
                  <input
                    type="text" // or 'radio', depending on what you need
                    className={`p-2 w-full rounded-md  border ${
                      data.bodyColor ? "text-white" : "text-black"
                    } border-[#414141]  bg-transparent focus:outline-none`}
                    name="inStock"
                    placeholder="Instock"
                    value={singelProductData?.Instock} // this assumes you have a state holding the value
                    onChange={(e) =>
                      setCreateProductData({
                        ...singelProductData,
                        [e.target.name]:
                          e.target.type === "radio"
                            ? e.target.checked
                            : Boolean(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="w-full md:w-1/2 ">
                  <h1
                    className={`py-2 w-full ${
                      data.bodyColor ? "text-white" : "text-black"
                    }`}
                  >
                    Stock
                  </h1>
                  <input
                    type="number"
                    className={`p-2 rounded-md  border ${
                      data.bodyColor ? "text-white" : "text-black"
                    } border-[#414141] w-full  bg-transparent focus:outline-none`}
                    placeholder="Quantity"
                    name="stock"
                    value={singelProductData?.stock}
                    onChange={(e) =>
                      setSingelProductData({
                        ...singelProductData,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="md:mt-5">
                <h1
                  className={`py-2 ${
                    data.bodyColor ? "text-white" : "text-black"
                  }`}
                >
                  Description
                </h1>
                <textarea
                  className={`p-2 h-20 md:h-32 w-full rounded-md  border ${
                    data.bodyColor ? "text-white" : "text-black"
                  } border-[#414141]  bg-transparent focus:outline-none`}
                  placeholder="given this short description about product"
                  name="description"
                  value={singelProductData?.description}
                  onChange={(e) =>
                    setSingelProductData({
                      ...singelProductData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          {/* price infromation */}
          <div
            className={`${
              data.bodyColor
                ? "bg-[#111111] border-[5px] border-[#232323]"
                : " bg-white shadow-lg rounded-lg"
            } w-full h-[310px] md:h-[200px] p-2 mt-10 flex flex-col`}
          >
            <div className="w-full h-[15%] md:h-[25%] flex items-center justify-start border-b  border-[#414141] ">
              <h1
                className={`${
                  data.bodyColor ? "text-amber-500" : "text-black"
                } md:text-xl  font-semibold`}
              >
                Pricing Details
              </h1>
            </div>
            <div className="h-[85%] md:h-[75%] w-full md:p-5">
              <div className="w-full flex flex-col md:flex-row md:gap-10">
                <div className="w-full md:w-1/3">
                  <h1
                    className={`py-2 ${
                      data.bodyColor ? "text-white" : "text-black"
                    }`}
                  >
                    Price
                  </h1>
                  <input
                    type="number"
                    className={`p-2 w-full rounded-md  border ${
                      data.bodyColor ? "text-white" : "text-black"
                    } border-[#414141]  bg-transparent focus:outline-none`}
                    placeholder="price.."
                    name="price"
                    value={singelProductData?.price}
                    onChange={(e) =>
                      setSingelProductData({
                        ...singelProductData,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="w-full md:w-1/3 ">
                  <h1
                    className={`py-2 ${
                      data.bodyColor ? "text-white" : "text-black"
                    }`}
                  >
                    Discount
                  </h1>
                  <input
                    type="text"
                    className={`p-2 w-full rounded-md  border ${
                      data.bodyColor ? "text-white" : "text-black"
                    } border-[#414141]  bg-transparent focus:outline-none`}
                    placeholder="discount..."
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <h1
                    className={`py-2 ${
                      data.bodyColor ? "text-white" : "text-black"
                    }`}
                  >
                    Tex
                  </h1>
                  <input
                    type="text"
                    className={`p-2 w-full rounded-md  border ${
                      data.bodyColor ? "text-white" : "text-black"
                    } border-[#414141]  bg-transparent focus:outline-none`}
                    placeholder="text.."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center py-5 gap-10">
            <button
              className="px-3 py-2 bg-amber-500 text-white rounded-lg"
              onClick={() => updateSingelProductCall(singelProductData?._id)}
            >
              Update Product
            </button>
            <button className="px-3  py-2 bg-slate-200 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <>{data?.addCategoryModal && <CategoryModal />}</>
    </>
  );
};
