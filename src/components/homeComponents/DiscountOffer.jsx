import React, { useEffect, useRef, useState } from "react";
import { parallax } from "../../assets";
import { getDiscountOffer, updateDiscountOffer } from "../../api/discountOffer";
import { toast } from "react-toastify";
import { updateFile } from "../../api";

export const DiscountOffer = () => {
  const [ids, setIds] = useState();
  const [singelFile, setSingleFile] = useState();
  const [discountOfferData, setDiscountOfferData] = useState();
  const [editAble, setEditAble] = useState(false);
  const inputFile = useRef();

  const singleImageHandelClick = () => {
    inputFile.current.click();
  };

  const getDiscountOfferCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getDiscountOffer({ token });
    setDiscountOfferData(res?.data?.data[0]);
    console.log(res);
  };
  useEffect(() => {
    getDiscountOfferCall();
  }, []);

  const updateDiscountOfferCall = async (id) => {
    console.log(id);
    const updateDiscountOfferData = {
      imageId: discountOfferData?.imageId?._id, // Send only the image ID
      discountOfferh1: discountOfferData?.discountOfferh1,
      discountOfferh2: discountOfferData?.discountOfferh2,
      discountOfferh3: discountOfferData?.discountOfferh3,
    };
    console.log(updateDiscountOfferData);
    const token = localStorage.getItem("access_token");
    const res = await updateDiscountOffer({
      updateDiscountOfferData: updateDiscountOfferData,
      id,
      token,
    });
    if (res.status === 200) {
      toast("updated DiscountOffer ");
      setEditAble(false);
      getDiscountOfferCall();
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
      toast("updated DiscountOffer image");
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
    <>
      {editAble === true ? (
        <div
          className="relative h-auto md:py-28 py-5 bg-fixed bg-center bg-cover object-cover flex items-center justify-center mx-auto"
          style={{
            backgroundImage: singelFile
              ? `url(${URL.createObjectURL(singelFile)})`
              : `url(data:image/png;base64,${discountOfferData?.imageId.image})`,
          }}
        >
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
                setIds(discountOfferData?.imageId?._id);
              }}
            />
            <button
              type="submit"
              className="bg-white px-4 py-2 mr-10 rounded-lg"
              onClick={() => {
                updateDiscountOfferCall(discountOfferData?._id);
                setEditAble(false);
              }}
            >
              Save
            </button>
          </div>
          <div className="absolute bg-black opacity-20 inset-0"></div>
          <div className="relative flex mx-auto w-full max-w-[1200px] justify-between px-4 md:px-8">
            <form action="">
              <div className="relative text-start text-white p-6 flex flex-col justify-end">
                <h1 className="heading md:text-7xl text-4xl text-[#F99106] text-center font-bold mb-4">
                  <input
                    type="text"
                    className="heading bg-transparent border md:text-7xl text-4xl text-[#F99106] text-center font-bold mb-4"
                    name="discountOfferh1"
                    required
                    min={5}
                    maxLength={30}
                    value={discountOfferData?.discountOfferh1}
                    onChange={(e) =>
                      setDiscountOfferData({
                        ...discountOfferData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </h1>
                <div className="w-[2px] bg-white h-10 mx-auto md:my-4 my-1"></div>

                <input
                  type="text"
                  className="text-lg text-[#CCCCCC] tracking-tighter italic mb-4 bg-transparent border text-center"
                  name="discountOfferh2"
                  value={discountOfferData?.discountOfferh2}
                  required
                  min={5}
                  maxLength={50}
                  onChange={(e) =>
                    setDiscountOfferData({
                      ...discountOfferData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  className="text-xl bg-transparent border font-semibold text-center heading"
                  name="discountOfferh3"
                  value={discountOfferData?.discountOfferh3}
                  required
                  min={5}
                  maxLength={30}
                  onChange={(e) =>
                    setDiscountOfferData({
                      ...discountOfferData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />

                <div className="flex justify-center">
                  <button className="shop-button mt-6 w-28 px-2 py-3   bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white  rounded-full">
                    <span>Shop Now</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="hidden md:block w-[50%]"></div>
          </div>
        </div>
      ) : (
        <div
          className="relative h-auto md:py-28 py-5 bg-fixed bg-center bg-cover flex items-center justify-center mx-auto"
          style={{
            backgroundImage: `url(data:image/png;base64,${discountOfferData?.imageId.image})`,
          }}
        >
          <div className="absolute top-5 z-10 left-5 ">
            <button
              className="bg-white px-4 py-2 rounded-lg"
              onClick={() => setEditAble(true)}
            >
              Edit{" "}
            </button>
          </div>
          <div className="absolute bg-black opacity-20 inset-0"></div>
          <div className="relative flex mx-auto w-full max-w-[1200px] justify-between px-4 md:px-8">
            <div className="relative text-start text-white p-6 flex flex-col justify-end">
              <h1 className="heading md:text-7xl text-4xl text-[#F99106] text-center font-bold mb-4">
                {discountOfferData?.discountOfferh1}
              </h1>
              <div className="w-[2px] bg-white h-10 mx-auto md:my-4 my-1"></div>
              <p className="text-lg text-[#CCCCCC] tracking-tighter italic mb-4 text-center">
                {discountOfferData?.discountOfferh2}
              </p>
              <p className="text-xl font-semibold text-center heading">
                {discountOfferData?.discountOfferh3}
              </p>
              <div className="flex justify-center">
                <button className="shop-button mt-6 w-28 px-2 py-3   bg-transparent border border-[#f99106]  text-[#f99106] hover:text-white  rounded-full">
                  <span>Shop Now</span>
                </button>
              </div>
            </div>
            <div className="hidden md:block w-[50%]"></div>
          </div>
        </div>
      )}
    </>
  );
};
