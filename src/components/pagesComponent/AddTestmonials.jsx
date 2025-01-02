import React, { useContext, useRef, useState } from "react";
import { WiCloudUp } from "react-icons/wi";
import AddContext from "../../context/dashboard/AddContext";
import { testimonial } from "../../api/testimonials";
import { createFile } from "../../api";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

export const AddTestimonials = () => {
  const [file, setFile] = useState();
  const [createTestimonialData, setCreateTestimonialData] = useState({});
  const inputFile = useRef(null);
  const data = useContext(AddContext);
  const hello = () => {
    inputFile.current.click();
  };
  const fileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const createTestimonialCall = async () => {
    const token = localStorage.getItem("access_token");
    const fromData = new FormData();
    fromData.append("file", file);
    const res = await createFile({ fromData, token });
    const avatarId = res?.data?.data?._id;
    const addAvatar = { ...createTestimonialData, avatar: avatarId };
    if (addAvatar) {
      const res = await testimonial({ data: addAvatar, token });
      if (res?.status === 201) {
        toast.success("Successfully Updated");
        data.getIDInUpdatedProduct("testimonials");
      }
    }
  };
  return (
    <div className="flex flex-col ">
      <div className="">
        <button
          className=""
          onClick={() => data.getIDInUpdatedProduct("testimonials")}
        >
          <FaArrowLeft size={30} className="text-amber-500" />
        </button>
      </div>
      <div
        className={`${
          data.bodyColor
            ? "bg-[#111111] border-[5px] border-[#232323]"
            : " bg-white shadow-lg rounded-lg"
        } w-full h-[350px]  flex flex-col`}
        onClick={hello}
      >
        <div className="w-full h-[15%] flex items-center justify-start border-b  border-[#232323]">
          <h1 className="text-amber-500 font-semibold md:px-5 ">
            Add Testimonials Photo
          </h1>
        </div>
        <div className="h-[85%] w-full flex justify-center items-center ">
          <div className="w-64 h-64 rounded-full flex-col flex justify-center items-center border-dashed border-2 border-zinc-700 cursor-pointer">
            <input
              type="file"
              id="imgupload"
              ref={inputFile}
              className={`hidden appearance-none`}
              onChange={fileUpload}
            />
            {file ? (
              <div className={`flex  w-full h-full rounded-full  p-1`}>
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full rounded-full "
                />
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center`}>
                <WiCloudUp className="text-5xl font-bold text-amber-500" />
                <h1
                  className={`${
                    data.width ? "text-2xl" : "text-3xl"
                  } text-white pt-5`}
                >
                  Add Image
                </h1>
                <h1 className="text-[12px] text-gray-400 font-semibold pt-3"></h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          data.bodyColor
            ? "bg-[#111111] border-[5px] border-[#232323]"
            : " bg-white shadow-lg rounded-lg"
        } w-full h-[350px]  flex flex-col mt-10`}
      >
        <div className="w-full h-[15%] flex items-center justify-start border-b border-[#232323] ">
          <h1 className="text-amber-500 font-semibold md:px-5">
            Add Testimonials Infromation
          </h1>
        </div>
        <div className="h-[85%] w-full flex flex-col md:px-5">
          <div className="flex gap-10">
            <div className="w-1/2 flex flex-col">
              <h1 className="py-2 text-white">Name</h1>
              <input
                type="text"
                className="text-white border border-[#232323]  rounded-md w-full p-2 focus:outline-none bg-transparent"
                name="name"
                onChange={(e) =>
                  setCreateTestimonialData({
                    ...createTestimonialData,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Name..."
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <h1 className="py-2 text-white">Rating</h1>
              <input
                type="number"
                className="text-white border border-[#232323]  rounded-md w-full p-2 focus:outline-none bg-transparent"
                name="rating"
                onChange={(e) =>
                  setCreateTestimonialData({
                    ...createTestimonialData,
                    [e.target.name]: parseInt(e.target.value),
                  })
                }
                placeholder="Rating..."
              />
            </div>
          </div>
          <div className="mt-5">
            <h1 className="py-2 text-white">Review</h1>
            <textarea
              className="text-white h-32 border  border-[#232323]  rounded-md w-full p-2  bg-transparent focus:outline-none"
              name="review"
              placeholder="Description..."
              onChange={(e) =>
                setCreateTestimonialData({
                  ...createTestimonialData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center py-5 md:py-10 gap-10">
        <button
          className="px-3 py-2 bg-amber-500 text-white rounded-lg"
          onClick={createTestimonialCall}
        >
          {" "}
          Submit
        </button>
        <button
          className="px-3  py-2 bg-slate-200 rounded-lg"
          onClick={() => data.getIDInUpdatedProduct("testimonials")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
