import React, { useEffect, useRef, useState } from "react";
import {
  decorateLight1,
  dignoalLines,
  lightHouse,
  lightHouse2,
} from "../../assets";
import { getLightHouse, updateFile, updateLightHouse } from "../../api";
import { toast } from "react-toastify";

export const LightsHouse = () => {
  const [ids, setIds] = useState({ left: null, right: null });
  const [files, setFiles] = useState({ left: null, right: null });
  const [editAble, setEditAble] = useState(false);
  const [LightHouseData, setLightHouseData] = useState();
  const inputFileLeft = useRef();
  const inputFileRight = useRef();

  const getLightHouseCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getLightHouse({ token });
    setLightHouseData(res?.data?.data[0]);
  };

  useEffect(() => {
    getLightHouseCall();
  }, []);

  const updateLightHouseCall = async () => {
    const updateLightHouseData = {
      imageLeft: LightHouseData?.imageLeft?._id,
      imageRight: LightHouseData?.imageRight?._id,
      lightHouseh1: LightHouseData?.lightHouseh1,
      lightHouseh2: LightHouseData?.lightHouseh2,
    };
    const token = localStorage.getItem("access_token");
    const res = await updateLightHouse({
      updateLightHouseData,
      id: LightHouseData?._id,
      token,
    });
    if (res.status === 200) {
      toast("Updated Light House Data");
      setEditAble(false);
      getLightHouseCall();
    }
  };

  const handleFileChange = async (e, side) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles((prev) => ({ ...prev, [side]: file }));
      setIds((prev) => ({
        ...prev,
        [side]:
          LightHouseData[`image${side.charAt(0).toUpperCase() + side.slice(1)}`]
            ?._id,
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
    if (files.left) {
      updateFileCall(ids.left, files.left);
    }
  }, [files.left]);

  useEffect(() => {
    if (files.right) {
      updateFileCall(ids.right, files.right);
    }
  }, [files.right]);

  return (
    <div className="container mx-auto p-4 md:mt-0 pt-5 md:pt-20">
      {editAble ? (
        <div className="relative flex p-4 flex-col lg:flex-row items-center lg:items-start gap-4 text-white w-full">
          <div className="absolute z-40 top-[-40px]">
            <button
              className="bg-white px-4 py-2 rounded-lg text-black"
              onClick={updateLightHouseCall}
            >
              Save
            </button>
          </div>
          <div className="relative lg:w-[40%] w-full md:order-1 lg:order-none">
            <div className="absolute w-full h-full flex items-center justify-center">
              <img
                src={dignoalLines}
                alt=""
                className="relative md:right-5 right-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative flex items-center justify-center w-full h-full md:top-[-20px] top-0">
              <img
                src={
                  LightHouseData.imageLeft?._id === ids.left && files.left
                    ? URL.createObjectURL(files.left)
                    : `data:image/png;base64,${LightHouseData?.imageLeft?.image}`
                }
                alt="Light House 1"
                className="lg:w-[600px] md:w-[80%] lg:h-[500px] hover:scale-105 transform transition-transform duration-500"
              />
            </div>
            <button
              className="absolute text-black top-0 left-0 bg-white px-3 py-2 rounded-lg"
              onClick={() => inputFileLeft.current.click()}
            >
              File Upload
            </button>
            <input
              type="file"
              className="hidden"
              ref={inputFileLeft}
              onChange={(e) => handleFileChange(e, "left")}
            />
          </div>
          <div className="flex lg:w-[60%] w-full items-center justify-center flex-col md:flex-row md:order-2 lg:order-none pt-5 gap-5">
            <div className="relative w-full flex flex-col md:items-end items-start md:ml-0 px-6 md:w-[50%]">
              <input
                type="text"
                className="text-amber-500 bg-transparent px-3 border heading md:text-5xl text-3xl md:text-end text-start tracking-tighter font-bold w-full"
                value={LightHouseData?.lightHouseh1}
                name="lightHouseh1"
                onChange={(e) =>
                  setLightHouseData({
                    ...LightHouseData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <p className="italic mt-6 text-lg text-start w-full pl-4">
                <textarea
                  className="mt-6 h-40 italic text-lg text-start w-full border bg-transparent"
                  name="lightHouseh2"
                  value={LightHouseData?.lightHouseh2}
                  onChange={(e) =>
                    setLightHouseData({
                      ...LightHouseData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </p>
              <button className="shop-button w-28 px-2 py-3 bg-transparent border border-[#f99106] text-[#f99106] hover:text-white rounded-full md:mb-0 mb-4">
                <span>Shop Now</span>
              </button>
            </div>
            <div className="relative w-full md:w-[50%]">
              <img
                src={
                  LightHouseData.imageRight?._id === ids.right && files.right
                    ? URL.createObjectURL(files.right)
                    : `data:image/png;base64,${LightHouseData?.imageRight?.image}`
                }
                alt="Light House 2"
                className="relative top-0 w-full h-[400px] hover:scale-105 transform transition-transform duration-500"
              />
              <button
                className="absolute text-black top-0 right-0 bg-white px-3 py-2 rounded-lg"
                onClick={() => inputFileRight.current.click()}
              >
                File Upload
              </button>
              <input
                type="file"
                className="hidden"
                ref={inputFileRight}
                onChange={(e) => handleFileChange(e, "right")}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex p-4 flex-col lg:flex-row items-center lg:items-start gap-4 text-white w-full">
          <div className="absolute z-40 top-[-20px]">
            <button
              className="bg-white px-4 py-2 rounded-lg text-black"
              onClick={() => setEditAble(true)}
            >
              Edit
            </button>
          </div>
          <div className="relative lg:w-[40%] w-full md:order-1 lg:order-none">
            <div className="absolute w-full h-full flex items-center justify-center">
              <img
                src={dignoalLines}
                alt=""
                className="relative md:right-5 right-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative flex items-center justify-center w-full h-full md:top-[-20px] top-0">
              <img
                src={`data:image/png;base64,${LightHouseData?.imageLeft?.image}`}
                alt="Light House 1"
                className="lg:w-[600px] md:w-[80%] lg:h-[500px] hover:scale-105 transform transition-transform duration-500"
              />
            </div>
          </div>
          <div className="flex lg:w-[60%] w-full items-center justify-center flex-col md:flex-row md:order-2 lg:order-none pt-5 gap-5">
            <div className="relative w-full flex flex-col md:items-end items-start md:ml-0 px-6 md:w-[50%]">
              <h2
                className="md:text-5xl heading inline md:text-start text-start tracking-tighter font-bold w-full text-amber-500"
                style={{ fontSize: "45px" }}
              >
                {LightHouseData?.lightHouseh1}
              </h2>
              <p className="italic mt-6 text-lg text-start w-full pl-4">
                {LightHouseData?.lightHouseh2}
              </p>
              <button className="shop-button w-28 px-2 py-3 bg-transparent border border-[#f99106] text-[#f99106] hover:text-white rounded-full md:mb-0 mb-4">
                <span>Shop Now</span>
              </button>
            </div>
            <div className="md:w-[50%] w-full">
              <img
                src={`data:image/png;base64,${LightHouseData?.imageRight?.image}`}
                alt="Light House 2"
                className="relative top-0 w-full h-[400px] hover:scale-105 transform transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
