import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import "./Benner.css";
import { getBanner, updateBanner, updateFile } from "../../api";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

export const Banner = () => {
  const [isLoder, setIsLoder] = useState();
  const [singelFile, setSingelFile] = useState();
  const inputFile = useRef();
  const [ids, setIds] = useState();
  const [editAble, setEditAble] = useState();
  const [bannerData, setBannerData] = useState();

  const singleImageHandelClick = () => {
    inputFile.current.click();
  };

  const clickEditable = (id, index) => {
    setEditAble(index);
  };

  const getBannerCall = async () => {
    setIsLoder(true);
    const token = localStorage.getItem("access_token");
    const res = await getBanner({ token });
    setBannerData(res?.data?.data);
    if (res.status === 200) {
      setIsLoder(false);
    }
  };
  useEffect(() => {
    getBannerCall();
  }, []);

  const updateBannerCall = async (id, index) => {
    delete bannerData[index]?.__v;
    delete bannerData[index]?._id;
    const token = localStorage.getItem("access_token");
    if (editAble === index) {
      try {
        const updatedBanner = {
          imageId: bannerData[index].imageId._id, // Send only the image ID
          bannerh1: bannerData[index].bannerh1,
          bannerh2: bannerData[index].bannerh2,
          bannerh3: bannerData[index].bannerh3,
          bannerh4: bannerData[index].bannerh4,
        };
        console.log(updatedBanner);
        const res = await updateBanner({
          updatedBanner: updatedBanner,
          id,
          token,
        });
        console.log(res);
        if (res.status === 200) {
          toast.success("Successfully Updated");
          setEditAble(null);
          getBannerCall();
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setSingelFile(e.target.files[0]);
    }
  };

  const updateFileCall = async (id) => {
    const token = localStorage.getItem("access_token");
    const fromData = new FormData();
    fromData.append("file", singelFile);
    const res = await updateFile({ fromData, token, id });
    if (res.status === 200) {
      toast.success("Successfully Updated");
    }
  };
  useEffect(() => {
    console.log(singelFile);
    if (singelFile) {
      updateFileCall(ids);
      console.log(ids);
    }
  }, [singelFile]);

  const handleSubmit = (e, id, index) => {
    e.preventDefault(); // Prevent default form submission
  };
  return (
    <div className="flex flex-col gap-10 ">
      {bannerData?.length > 0
        ? bannerData.map((i, index) => (
            <div className="relative w-full flex bg-[#162528] h-[500px]">
              <div className="absolute z-10 w-full top-5 ">
                {editAble === index ? (
                  <button
                    type="submit"
                    className=" absolute top-[3%] hover:cursor-pointer hover:scale-105 right-[3%] bg-white px-4 py-2 rounded-lg"
                    onClick={() => updateBannerCall(i?._id, index)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className=" absolute top-[3%] hover:cursor-pointer hover:scale-105 right-[3%] bg-white px-4 py-2 rounded-lg"
                    onClick={() => {
                      clickEditable(i?._id, index);
                      getBannerCall();
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="relative w-3/5 flex justify-center items-center">
                {editAble === index && (
                  <div className="absolute top-5 left-5 bg-white px-3 py-2 rounded-lg">
                    <button onClick={singleImageHandelClick}>
                      File Upload
                    </button>
                    <input
                      type="file"
                      className="hidden"
                      ref={inputFile}
                      onChange={(e) => {
                        handleFileChange(e);
                        setIds(i?.imageId?._id);
                      }}
                    />
                  </div>
                )}

                <img
                  src={
                    i?.imageId?._id === ids && singelFile
                      ? URL.createObjectURL(singelFile)
                      : `data:image/png;base64,${i.imageId?.image}`
                  }
                  className="w-[80%] h-[90%] object-cover"
                  alt="Banner"
                />
              </div>
              <div
                className={` w-2/5
                   justify-center  flex  flex-col delay-700 transform duration-700  -translate-x-[2%] ease-in-out  md:p-4 `}
              >
                {editAble === index ? (
                  <form onSubmit={(e) => handleSubmit(e, i?._id, index)}>
                    <>
                      {" "}
                      <input
                        required
                        type="text"
                        className="font-mono bg-transparent border text-white text-[10px] md:text-2xl 2xl:text-5xl italic"
                        name="bannerh1"
                        value={i.bannerh1}
                        min={5}
                        maxLength={20}
                        onChange={(e) =>
                          setBannerData((prevData) =>
                            prevData.map((item, idx) =>
                              idx === index
                                ? { ...item, [e.target.name]: e.target.value }
                                : item
                            )
                          )
                        }
                      />
                      <input
                        required
                        type="text"
                        className="heading w-full text-white md:text-6xl bg-transparent border font-extrabold md:mt-5 2xl:text-9xl"
                        name="bannerh2"
                        value={i.bannerh2}
                        min={5}
                        maxLength={15}
                        onChange={(e) =>
                          setBannerData((prevData) =>
                            prevData.map((item, idx) =>
                              idx === index
                                ? { ...item, [e.target.name]: e.target.value }
                                : item
                            )
                          )
                        }
                      />
                      <div className="flex md:mt-6">
                        <h1 className="lg:border-r-2 heading md:text-5xl font-bold border-amber-500 text-amber-500 pr-3 2xl:text-9xl">
                          Sale
                        </h1>
                        <div className="md:px-2 text-white hidden lg:flex flex-col items-start 2xl:text-5xl">
                          <input
                            type="text"
                            required
                            className="italic bg-transparent border"
                            name="bannerh3"
                            value={i.bannerh3}
                            min={5}
                            maxLength={40}
                            onChange={(e) =>
                              setBannerData((prevData) =>
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
                        </div>
                      </div>
                      <div className="md:pt-5">
                        <input
                          name="bannerh4"
                          required
                          value={i.bannerh4}
                          min={5}
                          maxLength={20}
                          onChange={(e) =>
                            setBannerData((prevData) =>
                              prevData.map((item, idx) =>
                                idx === index
                                  ? { ...item, [e.target.name]: e.target.value }
                                  : item
                              )
                            )
                          }
                          className="md:px-6 italic px-2 md:py-2 bg-amber-500 text-black font-bold text-[9px] md:text-xl 2xl:text-5xl"
                        />
                      </div>
                    </>
                  </form>
                ) : (
                  <>
                    <h1 className="font-mono text-white text-[10px] md:text-2xl 2xl:text-3xl italic">
                      {i?.bannerh1}
                    </h1>
                    <h1 className="heading text-white md:text-4xl  font-extrabold md:mt-5 2xl:text-6xl">
                      {i?.bannerh2}
                    </h1>
                    <div className="flex md:mt-6">
                      <h1 className="lg:border-r-2 heading md:text-3xl font-bold border-amber-500 text-amber-500 pr-3 2xl:text-9xl">
                        Sale
                      </h1>
                      <div className="md:px-2 text-white hidden lg:flex flex-col items-start 2xl:text-xl">
                        <h1 className="italic">{i?.bannerh3}</h1>
                      </div>
                    </div>
                    <div className="md:pt-5">
                      <button disabled className="md:px-6 italic px-2 md:py-2 bg-amber-500 text-black font-bold text-[9px] md:text-xl 2xl:text-4xl">
                        {i?.bannerh4}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        : ""}

      {isLoder && <Loader />}
    </div>
  );
};
