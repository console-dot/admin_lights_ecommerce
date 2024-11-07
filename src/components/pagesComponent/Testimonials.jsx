import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import AddContext from "../../context/dashboard/AddContext";
import {
  deleteTestimonial,
  getSingleTestimonial,
  getTestimonial,
  updateTestimonial,
} from "../../api/testimonials";
import { getAllFile, updateFile } from "../../api";
import { FaRegEye, FaSleigh } from "react-icons/fa";
import { BiCamera, BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { debounce } from "lodash";
import { DeleteModal } from "../resuableComponents/DeleteModal";
import { Loader } from "../resuableComponents/Loader";

export const Testimonials = () => {
  const data = useContext(AddContext);
  const [isLoder, setIsLoder] = useState(false);
  const [deleteModalOpen, setDeleteMoadalOpen] = useState();
  const [deleteModalId, setDeleteMoadalId] = useState();
  const [checkBox, setCheckBox] = useState();
  const [searchText, setSearchText] = useState("");
  const [testimonialId, setTestimonialId] = useState();
  const [singleTestimonialData, setSingleTestimonialData] = useState({});
  const [testmonialData, setTestmonialData] = useState([]);
  const [testimonialViewModal, setTestimonialViewModal] = useState(false);
  const [testimonialUpdateModal, setTestimonialUpdateModal] = useState(false);
  const [singelFile, setSingelFile] = useState();
  const inputFile = useRef(null);

  useEffect(() => {
    if (singelFile) {
      const fileUpload = async () => {
        const token = localStorage.getItem("access_token");
        const id = singleTestimonialData?.avatar?._id;
        const fromData = new FormData();
        fromData.append("file", singelFile);
        const res = await updateFile({ fromData, token, id });
      };
      fileUpload();
    }
  }, [singelFile]);

  const getTestmonials = async () => {
    setIsLoder(true);
    const token = localStorage.getItem("access_token");
    const testimonialsRes = await getTestimonial({ token });
    setTestmonialData(testimonialsRes?.data?.data);
    if (testimonialsRes.status === 200) {
      setIsLoder(false);
    }
  };
  useEffect(() => {
    getTestmonials();
  }, []);

  const viewTestimonialModalFun = async (id) => {
    const token = localStorage.getItem("access_token");
    const res = await getSingleTestimonial({ id, token });
    if (res.status === 200) {
      setSingleTestimonialData(res?.data?.data);
      setTestimonialViewModal(true);
    }
  };

  const updateTestimonisalFun = async (id) => {
    const token = localStorage.getItem("access_token");
    const res = await getSingleTestimonial({ id, token });
    if (res.status === 200) {
      setSingleTestimonialData(res.data?.data);
      setTestimonialId(id);
      setTestimonialUpdateModal(true);
    }
  };

  const updateTestimonisalCall = async (id) => {
    const token = localStorage.getItem("access_token");
    const { __v, _id, ...updatedData } = singleTestimonialData;
    const res = await updateTestimonial({ data: updatedData, id, token });
    if (res.status === 200) {
      toast("Updated testimonial");
      getTestmonials();
      setTestimonialUpdateModal(false);
    }
  };

  const handleSearchChange = debounce((value) => {
    setSearchText(value);
  }, 300);

  console.log(singleTestimonialData);
  const filteredTestimonials = useMemo(() => {
    return testmonialData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, testmonialData]);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSingelFile(e.target.files[0]);
    }
  };
  const singleImageClick = () => {
    inputFile.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1
          className={`${data.bodyColor ? "text-white" : "text-black"} text-2xl`}
        >
          Testimonials{" "}
          <span className="text-2xl text-amber-500">
            {searchText ? filteredTestimonials.length : testmonialData.length}
          </span>
        </h1>
        <input
          type="text"
          className={`${
            data.bodyColor ? "text-white" : "text-black"
          } bg-transparent px-4  rounded-md border-[#535353] border`}
          placeholder="Search"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button
          className="p-2 bg-amber-500 rounded-md text-white"
          onClick={() => data.getIDInUpdatedProduct("Add Testimonials")}
        >
          Add Testimonials
        </button>
      </div>
      <div
        className={`overflow-x-scroll md:overflow-hidden  mt-10 ${
          data.bodyColor
            ? "bg-[#111111] border-[5px] border-[#232323]"
            : " bg-white shadow-lg rounded-lg"
        }`}
      >
        <table className="w-full table-auto">
          <thead>
            <tr
              className={`${
                data.bodyColor ? "text-white" : "text-black"
              } text-start`}
            >
              <th className="pb-2">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => setCheckBox(!checkBox)}
                />
              </th>
              <th className="pb-2 whitespace-nowrap">Image</th>
              <th className="pb-2 whitespace-nowrap">Name</th>
              <th className="pb-2 whitespace-nowrap">Rating</th>
              <th className="pb-2 whitespace-nowrap">Review</th>
              <th className="pb-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((item) => (
                <tr
                  key={item._id}
                  className={`border-t border-[#232323] shadow-slate-50 ${
                    data.bodyColor ? "text-white" : "text-black"
                  }`}
                >
                  <td className="py-2 text-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={checkBox}
                    />
                  </td>
                  <td className="items-center">
                    <div className="w-full flex justify-center items-center">
                      <div className="w-14 h-14 rounded-xl bg-slate-200 flex justify-center items-center">
                        <img
                          src={`data:image/png;base64,${item?.avatar?.image}`}
                          className="w-full h-full rounded-xl"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="text-sm md:text-base font-normal whitespace-nowrap text-center">
                    {item.name}
                  </td>
                  <td className="text-center text-sm md:text-base font-normal whitespace-nowrap">
                    {item.rating}
                  </td>
                  <td className="text-sm md:text-base font-normal whitespace-nowrap text-center">
                    {item.review.substring(0, 15)}{" "}
                    <span className="text-[#777777]">.... more</span>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex justify-center items-center gap-5">
                      <FaRegEye
                        className="cursor-pointer text-lg hover:text-amber-500"
                        onClick={() => viewTestimonialModalFun(item._id)}
                      />
                      <BiEdit
                        className="cursor-pointer text-lg hover:text-amber-500"
                        onClick={() => updateTestimonisalFun(item._id)}
                      />
                      <MdDelete
                        className="cursor-pointer text-lg hover:text-amber-500"
                        onClick={() => {
                          setDeleteMoadalOpen(true);
                          setDeleteMoadalId(item?._id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : isLoder ? (
              ""
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-red-600 mt-5 text-2xl "
                >
                  Not Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* testimonial view modal */}
      {testimonialViewModal && (
        <div className="fixed flex justify-center items-center w-full h-screen z-40 bottom-[5%]">
          <div className="absolute w-72 sm:w-96   bg-[#262D34] rounded-lg p-5">
            <div className="flex flex-col relative">
              <div
                className="absolute top-2 right-0 cursor-pointer"
                onClick={() => setTestimonialViewModal(false)}
              >
                <ImCross className="text-white text-lg" />
              </div>
              <h1 className="text-white text-2xl text-center mb-5">
                View Testimonial
              </h1>
              <div>
                <div className="flex justify-center items-center">
                  <img
                    src={`data:image/png;base64,${singleTestimonialData?.avatar?.image}`}
                    className="w-[70%] h-60 rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <h1 className="text-white"> Name</h1>
                <h1 className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white">
                  {singleTestimonialData?.name}
                </h1>
              </div>
              <div className="flex flex-col mt-2">
                <h1 className="text-white">Review</h1>
                <h1 className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white">
                  {singleTestimonialData?.review}
                </h1>
              </div>
              <div className="flex flex-col mt-2">
                <h1 className="text-white">Rating</h1>
                <h1 className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white">
                  {singleTestimonialData?.rating}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* testimomnial update modal  */}
      {testimonialUpdateModal && (
        <div className="fixed flex justify-center items-center w-full h-screen z-40 bottom-[5%]">
          <div className="absolute w-72 sm:w-[400px]   bg-[#262D34] rounded-lg p-5">
            <div className="flex flex-col relative">
              <div
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => setTestimonialUpdateModal(false)}
              >
                <ImCross className="text-white text-lg" />
              </div>
              <h1 className="text-white text-2xl text-center">
                Update Testimonial
              </h1>
              <div>
                <div
                  className="flex relative justify-center rounded-full
                 items-center mt-4"
                >
                  <div className="absolute bottom-0 right-24">
                    <BiCamera
                      className="text-white text-3xl cursor-pointer"
                      onClick={singleImageClick}
                    />
                  </div>
                  <input
                    type="file"
                    id="imgupload"
                    ref={inputFile}
                    className={`hidden appearance-none`}
                    onChange={handleFileChange}
                  />
                  {singelFile ? (
                    <img
                      src={URL.createObjectURL(singelFile)}
                      className="w-[70%] h-60  rounded-full"
                    />
                  ) : (
                    <img
                      src={`data:image/png;base64,${singleTestimonialData?.avatar?.image}`}
                      className="w-[70%] h-60  rounded-full"
                    />
                  )}
                </div>
              </div>
              <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col mt-2">
                  <h1 className="text-white">Category Name</h1>
                  <input
                    type="text"
                    className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white"
                    placeholder="Category Name..."
                    value={singleTestimonialData?.name}
                    name="name"
                    required
                    onChange={(e) =>
                      setSingleTestimonialData({
                        ...singleTestimonialData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <h1 className="text-white">Review</h1>
                  <textarea
                    type="text"
                    className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white"
                    placeholder="review..."
                    value={singleTestimonialData?.review}
                    name="review"
                    required
                    onChange={(e) =>
                      setSingleTestimonialData({
                        ...singleTestimonialData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <h1 className="text-white">Rating</h1>
                  <input
                    type="number"
                    className="border border-gray-500 bg-transparent  rounded-md w-full p-2 focus:outline-none my-3 text-white"
                    placeholder="Category Name..."
                    value={singleTestimonialData?.rating}
                    name="rating"
                    required
                    onChange={(e) =>
                      setSingleTestimonialData({
                        ...singleTestimonialData,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex justify-center items-center ">
                  <button
                    type="submit"
                    className="text-white bg-amber-500 py-2 px-4 rounded-lg "
                    onClick={() => updateTestimonisalCall(testimonialId)}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <DeleteModal
          setDeleteMoadalOpen={setDeleteMoadalOpen}
          field={"testmoials"}
          deleteModalId={deleteModalId}
          fetchData={getTestmonials}
        />
      )}
      {isLoder && <Loader />}
    </div>
  );
};
