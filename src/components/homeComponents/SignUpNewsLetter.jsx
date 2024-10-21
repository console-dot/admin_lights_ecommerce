import React, { useEffect, useRef, useState } from "react";
import { newLetterImage } from "../../assets";
import { CiMail } from "react-icons/ci";
import {
  getSignUpNewLetter,
  updateFile,
  updateSignUpNewLetter,
} from "../../api";
import { toast } from "react-toastify";

export const SignUpNewsLetter = () => {
  const [ids, setIds] = useState();
  const [singelFile, setSingleFile] = useState();
  const [signUpNewLetterData, setSignUpNewLetterData] = useState();
  const [editAble, setEditAble] = useState(false);
  const inputFile = useRef();

  const singleImageHandelClick = () => {
    inputFile.current.click();
  };

  const getSignUpNewLetterCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getSignUpNewLetter({ token });
    setSignUpNewLetterData(res?.data?.data[0]);
    console.log(res);
  };
  useEffect(() => {
    getSignUpNewLetterCall();
  }, []);

  const updateSignUpNewLetterCall = async (id) => {
    console.log(id);
    const updateSignUpNewLetterData = {
      imageId: signUpNewLetterData?.imageId?._id, // Send only the image ID
      signUpNewLetterh1: signUpNewLetterData?.signUpNewLetterh1,
      signUpNewLetterh2: signUpNewLetterData?.signUpNewLetterh2,
    };
    console.log(updateSignUpNewLetterData);
    const token = localStorage.getItem("access_token");
    const res = await updateSignUpNewLetter({
      updateSignUpNewLetterData: updateSignUpNewLetterData,
      id,
      token,
    });
    if (res.status === 200) {
      toast("updated SignUpNewLetter ");
      setEditAble(false);
      getSignUpNewLetterCall();
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
      toast("updated SignUpNewLetter image");
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
    <div className="flex justify-center items-center ">
      <div className="container p-4 ">
        {editAble === true ? (
          <div className="flex relative h-[300px] justify-center items-center flex-col md:flex-row w-full  bg-[#171717] overflow-hidden ">
            <div className="absolute w-full flex justify-between z-40 top-5 left-5">
              <button
                onClick={singleImageHandelClick}
                className="bg-white px-4 py-2 mr-10 rounded-lg"
              >
                File Upload
              </button>
              <input
                type="file"
                className="hidden"
                ref={inputFile}
                onChange={(e) => {
                  handleFileChange(e);
                  setIds(signUpNewLetterData?.imageId?._id);
                }}
              />
              <button
                className="bg-white px-4 py-2 mr-10 rounded-lg"
                onClick={() => {
                  updateSignUpNewLetterCall(signUpNewLetterData?._id);
                  setEditAble(false);
                }}
              >
                Save
              </button>
            </div>

            <div className="md:w-1/2 overflow-hidden">
              <img
                src={
                  signUpNewLetterData?.imageId?._id === ids && singelFile
                    ? URL.createObjectURL(singelFile)
                    : `data:image/png;base64,${signUpNewLetterData.imageId?.image}`
                }
                className="hover:scale-110 transition hover:ease-in ease-out duration-500  overflow-hidden cursor-pointer"
              />
            </div>
            <div className="md:w-1/2 md:px-10  px-4 flex justify-center flex-col pt-5 ">
              <div className="flex flex-row lg:flex-col items-center lg:items-start gap-2">
                <CiMail className="text-[#CCCCCC] text-3xl  font-extrabold " />{" "}
                <input
                  type="text"
                  className="text-amber-500 bg-transparent border heading  md:text-xl lg:text-3xl text-extrabold py-2"
                  name="signUpNewLetterh1"
                  value={signUpNewLetterData?.signUpNewLetterh1}
                  onChange={(e) =>
                    setSignUpNewLetterData({
                      ...signUpNewLetterData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <h1 className="text-[#CCCCCC] italic  ">
                <input
                  type="text"
                  className="text-[#CCCCCC] italic border bg-transparent mt-3 "
                  name="signUpNewLetterh2"
                  value={signUpNewLetterData?.signUpNewLetterh2}
                  onChange={(e) =>
                    setSignUpNewLetterData({
                      ...signUpNewLetterData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </h1>
              <div className=" border-b border-white relative lg:pt-5 pt-2 pb-1">
                <input
                  type="text"
                  placeholder="enter your email"
                  className="input input-bordered text-white input-primary w-full  focus:outline-none border-none bg-transparent"
                />
                <div className="absolute bottom-2.5 right-0">
                  <button className="shop-button px-2 py-1   bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white rounded-full">
                    <span className="text-white ">Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex relative justify-center  h-[300px] items-center flex-col md:flex-row w-full  bg-[#171717] overflow-hidden ">
            <div className="absolute z-40 top-5 left-5">
              <button
                className="bg-white px-4 py-2 rounded-lg"
                onClick={() => setEditAble(true)}
              >
                Edit{" "}
              </button>
            </div>

            <div className="md:w-1/2 overflow-hidden">
              <img
                src={`data:image/png;base64,${signUpNewLetterData?.imageId?.image}`}
                className="hover:scale-110 transition hover:ease-in ease-out duration-500  overflow-hidden cursor-pointer"
              />
            </div>
            <div className="md:w-1/2 md:px-10  px-4 flex justify-center flex-col pt-5 ">
              <div className="flex flex-row lg:flex-col items-center lg:items-start gap-2">
                <CiMail className="text-[#CCCCCC] text-3xl  font-extrabold " />
                <h1 className="text-amber-500 heading  md:text-xl lg:text-3xl text-extrabold py-2">
                  {" "}
                  {signUpNewLetterData?.signUpNewLetterh1}
                </h1>
              </div>
              <h1 className="text-[#CCCCCC] italic  ">
                {signUpNewLetterData?.signUpNewLetterh2}
              </h1>
              <div className=" border-b border-white relative lg:pt-5 pt-2 pb-1">
                <input
                  type="text"
                  placeholder="enter your email"
                  className="input input-bordered text-white input-primary w-full  focus:outline-none border-none bg-transparent"
                />
                <div className="absolute bottom-2.5 right-0">
                  <button className="shop-button px-2 py-1   bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white rounded-full">
                    <span className="text-white ">Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
