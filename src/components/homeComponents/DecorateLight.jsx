import React, { useEffect, useRef, useState } from "react";
import { dignoalLines } from "../../assets";
import { getDecorateLight, updateDecorateLight, updateFile } from "../../api";
import { toast } from "react-toastify";

export const DecorateLight = () => {
  const [ids, setIds] = useState({ left: null, right: null });
  const [singelFile, setSingleFile] = useState({ left: null, right: null });
  const [editAble, setEditAble] = useState(false);
  const [decorateLightData, setDecorateLightData] = useState();
  const inputFilelLeft = useRef();
  const inputFileRight = useRef();

  const getDecorateLightCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getDecorateLight({ token });
    setDecorateLightData(res?.data?.data[0]);
  };

  useEffect(() => {
    getDecorateLightCall();
  }, []);

  console.log(decorateLightData);
  const updateDecorateLightCall = async (id) => {
    console.log(id);
    const updateDecorateLightData = {
      imageLeft: decorateLightData?.imageLeft?._id, // Send only the image ID
      imageRight: decorateLightData?.imageRight?._id, // Send only the image ID
      decorateLighth1: decorateLightData?.decorateLighth1,
      decorateLighth2: decorateLightData?.decorateLighth2,
    };
    console.log(updateDecorateLightData);
    const token = localStorage.getItem("access_token");
    const res = await updateDecorateLight({
      updateDecorateLightData: updateDecorateLightData,
      id: decorateLightData?._id,
      token,
    });
    if (res.status === 200) {
      toast("updated DecorateLight ");
      setEditAble(false);
      getDecorateLightCall();
    }
  };

  const singleImageHandelClickLeft = () => {
    inputFilelLeft.current.click();
  };
  const singleImageHandelClickRight = () => {
    inputFileRight.current.click();
  };

  const handleFileChange = async (e, side) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSingleFile((prev) => ({ ...prev, [side]: file }));
      setIds((prev) => ({
        ...prev,
        [side]:
          decorateLightData[
            `image${side.charAt(0).toUpperCase() + side.slice(1)}`
          ]?._id,
      }));
    }
  };

  const updateFileCall = async (id, file) => {
    console.log(file);
    if (!file) return;
    const token = localStorage.getItem("access_token");
    const fromData = new FormData();
    fromData.append("file", file);
    console.log(fromData);
    const res = await updateFile({ fromData, token, id });
    if (res.status === 200) {
      toast(`Updated ${id === ids.left ? "Left" : "Right"} image`);
    }
  };
  useEffect(() => {
    if (singelFile.left) {
      updateFileCall(ids.left, singelFile.left);
    }
  }, [singelFile.left]);

  useEffect(() => {
    if (singelFile.right) {
      updateFileCall(ids.right, singelFile.right);
    }
  }, [singelFile.right]);

  return (
    <div className="container mx-auto  p-4  md:mt-20 w-[100%] ">
      {editAble ? (
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start  gap-4  text-white w-[100%]">
          <div className="absolute top-[-40px]">
            <button
              className="bg-white px-4 py-2 rounded-lg text-black"
              type="submit"
              onClick={() => updateDecorateLightCall(decorateLightData?._id)}
            >
              Save
            </button>
          </div>
          {/* Right Image */}
          <div className="flex lg:w-[60%] w-full items-center justify-center flex-col  md:flex-row md:order-2 lg:order-none pt-20 gap-5 relative">
            <div className="absolute z-40 top-10 left-0 bg-white px-3 py-2 rounded-lg">
              <button
                onClick={singleImageHandelClickLeft}
                className="text-black"
              >
                File Upload
              </button>
              <input
                type="file"
                className="hidden"
                ref={inputFilelLeft}
                onChange={(e) => {
                  handleFileChange(e, "left");
                }}
              />
            </div>
            <div className="md:w-[50%] w-full">
              <img
                src={
                  decorateLightData.imageLeft?._id === ids.left &&
                  singelFile.left
                    ? URL.createObjectURL(singelFile.left)
                    : `data:image/png;base64,${decorateLightData?.imageLeft?.image}`
                }
                alt="Light House 2"
                className=" relative md:top-[-50px] top-0 w-full bg-[#171717] lg:h-[400px]  h-full hover:scale-105 transform transition-transform duration-500"
              />
            </div>
            {/* Text Section */}
            <form action="">
              <div className="relative w-full flex flex-col md:items-end items-start md:ml-0 px-6 md:w-[50%] ">
                <input
                  type="text"
                  className="text-amber-500 bg-transparent px-3 border heading md:text-5xl text-3xl md:text-end text-start tracking-tighter font-bold   w-full"
                  value={decorateLightData?.decorateLighth1}
                  name="decorateLighth1"
                  required
                  min={5}
                  maxLength={20}
                  onChange={(e) =>
                    setDecorateLightData({
                      ...decorateLightData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />

                <div className="md:w-[80%] w-[60%]  md:mt-0 mt-1 h-[1px] bg-gray-600 absolute md:left-[-25%] z-20  md:top-[13%] top-8 "></div>
                <p className=" mt-6 italic text-lg md:text-end text-start  w-full">
                  <textarea
                    type="text"
                    className=" mt-6 h-40 italic text-lg text-start  w-full border bg-transparent "
                    name="decorateLighth2"
                    value={decorateLightData?.decorateLighth2}
                    required
                    min={5}
                    maxLength={100}
                    onChange={(e) =>
                      setDecorateLightData({
                        ...decorateLightData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </p>
                <div className="md:h-16 h-8  w-[1px] my-4   bg-gray-600 md:mr-6 mr-0 md:ml-0 ml-6"></div>
                <button className="shop-button  w-28 px-2 py-3  bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white rounded-full md:mb-0 mb-4">
                  <span>Shop Now</span>
                </button>
              </div>
            </form>
          </div>
          {/* Right Image with Diagonal Lines */}
          <div className="relative lg:w-[40%] w-full md:order-1 lg:order-none">
            <div className="absolute w-full h-full flex items-center justify-center ">
              <img
                src={dignoalLines}
                alt=""
                className="relative md:right-5 right-0 w-full h-full  object-cover "
              />
            </div>
            <div className="relative  flex items-center justify-center w-full  h-full md:top-[-20px] top-0">
              <div className="absolute  top-0 right-0 z-40 bg-white px-3 py-2 rounded-lg">
                <button
                  onClick={singleImageHandelClickRight}
                  className="text-black"
                >
                  File Upload
                </button>
                <input
                  type="file"
                  className="hidden"
                  ref={inputFileRight}
                  onChange={(e) => {
                    handleFileChange(e, "right");
                  }}
                />
              </div>
              <img
                src={
                  decorateLightData.imageRight?._id === ids.right &&
                  singelFile.right
                    ? URL.createObjectURL(singelFile.right)
                    : `data:image/png;base64,${decorateLightData?.imageRight?.image}`
                }
                alt="Light House 1"
                className="lg:w-[600px] md:w-[80%] bg-[#171717] lg:h-[500px] hover:scale-105 transform transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex relative flex-col lg:flex-row items-center lg:items-start  gap-4  text-white w-[100%]">
          <div className="absolute top-[-20px]">
            <button
              className="bg-white px-4 py-2 rounded-lg text-black"
              onClick={() => setEditAble(true)}
            >
              Edit
            </button>
          </div>
          {/* Right Image */}
          <div className="flex lg:w-[60%] w-full items-center justify-center flex-col  md:flex-row md:order-2 lg:order-none pt-20 gap-5 ">
            <div className="md:w-[50%] h-full w-full">
              <img
                src={`data:image/png;base64,${decorateLightData?.imageLeft?.image}`}
                alt="Light House 2"
                className=" relative top-0 w-full md:top-[-50px] bg-[#171717] lg:h-[400px] hover:scale-105 transform transition-transform duration-500"
              />
            </div>
            {/* Text Section */}
            <div className="relative w-full flex flex-col md:items-end items-start md:ml-0 px-6 md:w-[50%] ">
              <h2 className="text-amber-500 heading md:text-5xl text-3xl md:text-end text-start tracking-tighter font-bold w-full ">
                {decorateLightData?.decorateLighth1}
              </h2>

              <div className="md:w-[80%] w-[60%]  md:mt-0 mt-1 h-[1px] bg-gray-600 absolute md:left-[-25%] z-20  md:top-[13%] top-8 "></div>
              <p className=" mt-6 italic text-lg md:text-end text-start w-full">
                {decorateLightData?.decorateLighth2}
              </p>
              <div className="md:h-16 h-8  w-[1px] my-4   bg-gray-600 md:mr-6 mr-0 md:ml-0 ml-6"></div>
              <button className="shop-button  w-28 px-2 py-3  bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white rounded-full md:mb-0 mb-4">
                <span>Shop Now</span>
              </button>
            </div>
          </div>
          {/* Right Image with Diagonal Lines */}
          <div className="relative lg:w-[40%] w-full md:order-1 lg:order-none">
            <div className="absolute w-full h-full flex items-center justify-center ">
              <img
                src={dignoalLines}
                alt=""
                className="relative md:right-5 right-0 w-full h-full  object-cover "
              />
            </div>
            <div className="relative  flex items-center justify-center w-full  h-full md:top-[-20px] top-0">
              <img
                src={`data:image/png;base64,${decorateLightData?.imageRight?.image}`}
                alt="Light House 1"
                className="lg:w-[600px] md:w-[80%] bg-[#171717] lg:h-[500px] hover:scale-105 transform transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
