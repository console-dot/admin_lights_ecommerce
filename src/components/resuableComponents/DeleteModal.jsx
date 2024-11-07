import React from "react";
import { deleteCategoryById } from "../../api/category";
import { toast } from "react-toastify";
import { deleteTestimonial } from "../../api/testimonials";
import { deleteSingleProduct } from "../../api";

export const DeleteModal = ({
  setDeleteMoadalOpen,
  field,
  deleteModalId,
  fetchData,
}) => {
  const deleteSingelCategoryCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await deleteCategoryById({ id: deleteModalId, token });

    if (res?.status === 200) {
      fetchData();
      setDeleteMoadalOpen(false);
      toast("Delete Category", { className: "text-red" });
    }
  };
  const deleteSingelTestimonialsCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await deleteTestimonial({ id: deleteModalId, token });
    if (res.status === 200) {
      toast("Deleted testimonial");
      setDeleteMoadalOpen(false);
      fetchData();
    }
  };
  const deleteSingelProductCall = async () => {
    const token = localStorage.getItem("access_token");
    const res = await deleteSingleProduct({ id:deleteModalId, token });
    if (res) {
      fetchData()
      toast("Product Deleted");
      setDeleteMoadalOpen(false)
    }
  };
  const deleteCall = () => {
    if (field === "category") {
      deleteSingelCategoryCall();
    } else if (field === "testmoials") {
      deleteSingelTestimonialsCall();
    } else if (field === "product") {
      deleteSingelProductCall();
    }
  };
  return (
    <div className="fixed flex justify-center items-center w-full h-screen z-40 bottom-[5%] right-0">
      <div className="absolute w-72 sm:w-80 flex flex-col justify-center items-center bg-[#262D34] rounded-lg p-5">
        <div className=" "></div>
        <h1 className="text-3xl text-white">Are You Sure</h1>

        <div className="flex justify-between w-full mt-5">
          <button
            className="p-2 rounded-lg bg-red-700 text-white"
            onClick={deleteCall}
          >
            Delete
          </button>
          <button
            className="bg-white p-2 rounded-lg"
            onClick={() => setDeleteMoadalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
