import React, { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { blog1, blog2, blog3, commercialLightbg } from "../../assets";

import { toast } from "react-toastify";
import { getBlogs, updateBlogs, updateFile } from "../../api";

export const Blogs = () => {
  const [ids, setIds] = useState();
  const [singelFile, setSingelFile] = useState();
  const [editAble, setEditAble] = useState();
  const [blogsData, setBlogsData] = useState();
  const inputFile = useRef();

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setSingelFile(e.target.files[0]);
    }
  };
  const getBlogsCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getBlogs({ token });
    console.log(res);
    setBlogsData(res?.data?.data);
  };

  useEffect(() => {
    getBlogsCall();
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
      toast("updated image Blogs");
    }
  };
  useEffect(() => {
    console.log(singelFile);
    if (singelFile) {
      updateFileCall(ids);
      console.log(ids);
    }
  }, [singelFile]);

  const updateBlogsCall = async (id, index) => {
    delete blogsData[index]?.__v;
    delete blogsData[index]?._id;
    const token = localStorage.getItem("access_token");
    if (editAble === index) {
      try {
        const updatedBlogsData = {
          imageId: blogsData[index].imageId._id,
          blogsh1: blogsData[index].blogsh1,
          blogsh2: blogsData[index].blogsh2,
        };
        const res = await updateBlogs({
          updatedBlogsData: updatedBlogsData,
          id,
          token,
        });
        console.log(res);
        if (res.status === 200) {
          toast("updated Blogs ");
          setEditAble(null);
          getBlogsCall();
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="md:pb-10  flex justify-center items-center">
      <div className="container  p-4 relative">
        <div className="flex justify-center items-center ">
          <h1 className="heading text-center text-3xl md:text-5xl uppercase text-amber-500 tracking-wide  md:py-10">
            Latest News
          </h1>
        </div>

        <div className="w-full py-10 cursor-pointer relative ">
          <Swiper
            breakpoints={{
              10: {
                slidesPerView: 1,
              },

              320: {
                slidesPerView: 1,
                // Hide navigation for viewports <= 640px
              },
              640: {
                centeredSlides: false,
                slidesPerView: 1,
                // Hide navigation for viewports <= 640px
              },
              1024: {
                slidesPerView: 2,
                // Hide navigation for viewports <= 640px
              },
              1100: {
                slidesPerView: 2,
                // Hide navigation for viewports <= 640px
              },
            }}
            navigation={true}
            spaceBetween={10}
            // centeredSlides={true}
            modules={[Navigation, Pagination]}
            className="mySwiper"
          >
            {blogsData &&
              blogsData?.map((item, index) => (
                <SwiperSlide
                  className={`w-full gap-4  md:py-4 relative flex flex-col `}
                  style={{ display: "flex" }}
                >
                  {editAble === index ? (
                    <div className="absolute top-8 left-5 z-40  ">
                      <button
                        className="bg-white px-4 py-2 rounded-lg "
                        onClick={() => {
                          setEditAble(null);
                          updateBlogsCall(item?._id, index);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="absolute top-8 left-5 z-40">
                      <button
                        className="bg-white px-4 py-2 rounded-lg "
                        onClick={() => {
                          setEditAble(index);
                          getBlogsCall();
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}

                  {editAble === index ? (
                    <div className="">
                      <div className="absolute top-8 right-5 bg-white px-3 py-2 z-40 rounded-lg">
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
                      <div className=" w-full border-[10px]  border-[#232323] overflow-hidden cursor-pointer ">
                        <img
                          src={
                            item?.imageId?._id === ids && singelFile
                              ? URL.createObjectURL(singelFile)
                              : `data:image/png;base64,${item.imageId?.image}`
                          }
                          className=" w-full h-[350px] hover:scale-110 transition hover:ease-in ease-out duration-500  overflow-hidden"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className=" w-full border-[10px] border-[#232323] overflow-hidden cursor-pointer ">
                      <img
                        src={`data:image/png;base64,${item?.imageId?.image}`}
                        className=" w-full h-[350px] hover:scale-110 transition hover:ease-in ease-out duration-500  overflow-hidden"
                      />
                    </div>
                  )}

                  <div className="lg:absolute w-full lg:w-80 bottom-0 right-0 bg-black flex justify-center items-center flex-col py-3">
                    <h1 className="text-white text-lg font-semibold ">
                      {editAble === index ? (
                        <input
                          type="text"
                          className="bg-transparent border text-white text-lg font-semibold"
                          name="blogsh1"
                          value={item.blogsh1}
                          onChange={(e) =>
                            setBlogsData((prevData) =>
                              prevData.map((item, idx) =>
                                idx === index
                                  ? { ...item, [e.target.name]: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      ) : (
                        <h1 className="text-white text-lg font-semibold">
                          {item?.blogsh1}
                        </h1>
                      )}
                    </h1>
                    <div className="flex justify-center items-center text-center">
                      {" "}
                      <p className="text-[#CCCC] py-3 italic">
                        {editAble === index ? (
                          <input
                            type="text"
                            className="bg-transparent border text-[#CCCC] py-3 italic"
                            name="blogsh2"
                            value={item.blogsh2}
                            onChange={(e) =>
                              setBlogsData((prevData) =>
                                prevData.map((item, idx) =>
                                  idx === index
                                    ? {
                                        ...item,
                                        [e.target.name]: e.target.value,
                                      }
                                    : item
                                )
                              )
                            }
                          />
                        ) : (
                          <p className="text-[#CCCC] py-3 italic">
                            {item?.blogsh2}
                          </p>
                        )}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            {/* <SwiperSlide
              className={`w-full   md:py-4 relative flex flex-col `}
              style={{ display: "flex" }}
            >
              <div className="lg:w-4/5 w-full border-[10px] border-[#232323] overflow-hidden cursor-pointer ">
                <img
                  src={commercialLightbg}
                  className="w-full hover:scale-110 transition hover:ease-in ease-out duration-500  overflow-hidden"
                />
              </div>
              <div className="lg:absolute w-full lg:w-80 bottom-0 right-0 bg-black flex justify-center items-center flex-col py-3">
                <h1 className="text-white text-lg font-semibold ">
                  How To Survive Air Travel With An
                </h1>
                <div className="flex justify-center items-center text-center italic">
                  {" "}
                  <p className="text-[#CCCC] py-3">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu{" "}
                  </p>
                </div>
              </div>
            </SwiperSlide> */}
            {/* <SwiperSlide
              className={`w-full md:py-4 relative flex flex-col `}
              style={{ display: "flex" }}
            >
              <div className="lg:w-4/5 w-full border-[10px] border-[#232323] overflow-hidden cursor-pointer ">
                <img
                  src={blog3}
                  className="w-full hover:scale-110 transition hover:ease-in ease-out duration-500  overflow-hidden"
                />
              </div>
              <div className="lg:absolute w-full lg:w-80 bottom-0 right-0 bg-black flex justify-center items-center flex-col py-3">
                <h1 className="text-white text-lg font-semibold ">
                  How To Survive Air Travel With An
                </h1>
                <div className="flex justify-center items-center text-center italic">
                  {" "}
                  <p className="text-[#CCCC] py-3">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu{" "}
                  </p>
                </div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
