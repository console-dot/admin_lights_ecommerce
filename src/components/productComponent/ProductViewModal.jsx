import React, { useContext } from "react";
import AddContext from "../../context/dashboard/AddContext";
import { ImCross } from "react-icons/im";

export const ProductViewModal = ({ setProductModal, singelProductData }) => {
  const data = useContext(AddContext);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl bg-[#262D34]   p-6 max-h-[500px] overflow-y-scroll custom-scrollbar custom-scrollbar-sm">
        {/* Header with close button */}
        <div className="absolute top-4 right-4">
          <ImCross
            className="cursor-pointer text-gray-400 hover:text-amber-500"
            onClick={() => setProductModal(false)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-4">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 ">
            {singelProductData?.avatar?.image && (
              <img
                src={`data:image/png;base64,${singelProductData.avatar.image}`}
                alt="Product"
                className="w-full h-80 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Right side - Product Details */}
          <div className="w-full md:w-1/2 p-4 border-[0.5px] rounded-lg">
            {/* Product Label */}
            <div className="inline-block px-3 py-1 bg-gray-900 text-white text-sm rounded-md mb-4">
              {singelProductData?.name || "Product Name"}
            </div>

            {/* Product Title */}
            <h2 className="text-3xl font-bold text-white mb-2">
              {singelProductData?.name || "Product Name"}
            </h2>
            <p className="text-amber-500 mb-4">
              {singelProductData?.categoryId?.name || "Category"}
            </p>

            {/* Price */}
            <div className="mb-4">
              <span className="text-2xl font-bold text-white">
                PKR:{singelProductData?.price || "0.00"}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  singelProductData?.stock != 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {singelProductData?.stock != 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-amber-500 mb-6">
              {singelProductData?.description || "No description available"}
            </p>

            {/* Gallery */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-white mb-2">
                Product Gallery
              </h3>
              <div className="flex gap-2 overflow-x-auto">
                {singelProductData?.gallery?.map((item, index) => (
                  <img
                    key={index}
                    src={`data:image/png;base64,${item?.image}`}
                    alt={`Gallery ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
