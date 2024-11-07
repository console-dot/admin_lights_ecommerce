import React, { useEffect, useRef, useState } from "react";
import { blog1 } from "../../assets";
import { getLuxury, updateFile, updateLuxury } from "../../api";
import { toast } from "react-toastify";

export const LuxuryStylist = () => {
  const [ids, setIds] = useState();
  const [singelFile, setSingleFile] = useState();
  const [luxuryData, setLuxuryData] = useState();
  const [editAble, setEditAble] = useState(false);
  const inputFile = useRef();

  const singleImageHandelClick = () => {
    inputFile.current.click();
  };

  const getLuxuryCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getLuxury({ token });
    setLuxuryData(res?.data?.data[0]);
    console.log(res);
  };
  useEffect(() => {
    getLuxuryCall();
  }, []);

  const updateLuxuryCall = async (id) => {
    console.log(id);
    const updateLuxuryData = {
      imageId: luxuryData?.imageId?._id, // Send only the image ID
      luxuryh1: luxuryData?.luxuryh1,
      luxuryh2: luxuryData?.luxuryh2,
    };
    console.log(updateLuxuryData);
    const token = localStorage.getItem("access_token");
    const res = await updateLuxury({
      updateLuxuryData: updateLuxuryData,
      id,
      token,
    });
    if (res.status === 200) {
      toast("updated luxury ");
      setEditAble(false);
      getLuxuryCall();
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setSingleFile(e.target.files[0]);
    }
  };

  const updateFileCall = async (id) => {
    const token = localStorage.getItem("access_token");
    const fromData = new FormData();
    fromData.append("file", singelFile);
    const res = await updateFile({ fromData, token, id });
    if (res.status === 200) {
      toast("updated luxury image");
    }
  };
  useEffect(() => {
    console.log(singelFile);
    if (singelFile) {
      updateFileCall(ids);
      console.log(ids);
    }
  }, [singelFile]);
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="container h-[300px] sm:h-[400px] bg-[#171717] relative">
        {editAble ? (
          <div className="w-full h-full flex md:flex-row flex-col">
            <div className="absolute w-full top-[3%] left-[3%]">
              {editAble === true ? (
                <>
                  <button
                  type="submit"
                    className="bg-white px-4 rounded-lg py-2"
                    onClick={() => updateLuxuryCall(luxuryData?._id)}
                  >
                    Save
                  </button>

                  <div className="absolute top-0 right-14 bg-white px-3 py-2 rounded-lg">
                    <button onClick={singleImageHandelClick}>
                      File Upload
                    </button>
                    <input
                      type="file"
                      className="hidden"
                      ref={inputFile}
                      onChange={(e) => {
                        handleFileChange(e);
                        setIds(luxuryData?.imageId?._id);
                      }}
                    />
                  </div>
                </>
              ) : (
                <button
                  className="bg-white px-4 rounded-lg py-2"
                  onClick={() => setEditAble(true)}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="md:w-1/2 w-full h-full flex flex-col items-center justify-center bg-[#171717] order-2 md:order-none py-4 md:py-0">
              <div className="w-full lg:w-[70%] flex flex-col items-start justify-center px-5 sm:px-10">
                <form action="">
                  <div className="z-40">
                    <input
                      type="text"
                      className="text-white z-40 pl-2 border bg-transparent heading text-2xl md:text-5xl"
                      name="luxuryh1"
                      min={5}
                      maxLength={30}
                      required
                      value={luxuryData?.luxuryh1}
                      onChange={(e) =>
                        setLuxuryData({
                          ...luxuryData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="w-full lg:ml-48 md:ml-32 h-[1px] my-5 bg-[#2F2F2F] z-30"></div>
                  <div>
                    <input
                      type="text"
                      className="text-lg pl-2 border italic h-full bg-transparent text-[#C0C0BB]"
                      name="luxuryh2"
                      value={luxuryData?.luxuryh2}
                      min={5}
                      maxLength={100}
                      required
                      onChange={(e) =>
                        setLuxuryData({
                          ...luxuryData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
                <div className="mt-5">
                  <button className="shop-button px-4 py-2 bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white rounded-full">
                    <span>Read More</span>
                  </button>
                </div>
              </div>
            </div>
            <div className=" hidden md:flex   md:w-1/2 w-full order-1 md:order-none">
              <img
                src={
                  singelFile
                    ? URL.createObjectURL(singelFile)
                    : `data:image/png;base64,${luxuryData?.imageId?.image}`
                }
                className="w-full h-full"
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex md:flex-row flex-col">
            <div className="absolute top-[3%] left-[3%]">
              {editAble === true ? (
                <button
                  className="bg-white px-4 rounded-lg py-2"
                  onClick={() => setEditAble(false)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-white px-4 rounded-lg py-2"
                  onClick={() => setEditAble(true)}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="md:w-1/2 w-full h-full flex flex-col items-center justify-center bg-[#171717] order-2 md:order-none py-4 md:py-0">
              <div className="w-full lg:w-[70%] flex flex-col items-start justify-center px-5 sm:px-10">
                <div>
                  <h1 className="text-white heading text-2xl md:text-5xl">
                    {luxuryData?.luxuryh1}
                  </h1>
                </div>
                <div className="w-full lg:ml-48 md:ml-32 h-[1px] my-5 bg-[#2F2F2F] z-30"></div>
                <div>
                  <h1 className="text-lg italic text-[#C0C0BB]">
                    {luxuryData?.luxuryh2}
                  </h1>
                </div>
                <div className="mt-5">
                  <button className="shop-button px-4 py-2 bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white rounded-full">
                    <span>Read More</span>
                  </button>
                </div>
              </div>
            </div>
            <div className=" hidden md:flex   md:w-1/2 w-full order-1 md:order-none">
              <img
                src={`data:image/png;base64,${luxuryData?.imageId?.image}`}
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
