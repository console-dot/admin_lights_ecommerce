import React from "react";

export const Loader = () => {
  return (
    <div className="w-full h-screen fixed top-0 right-0 z-50">
        <div className="absolute w-full h-full bg-white opacity-5 right-0"></div>
      <div class="flex absolute w-full h-full ">
        <div class="relative  flex justify-center items-center left-[50%]">
          <div
            class="w-12 h-12 rounded-full absolute
                            border-[4px] border-solid border-gray-200"
          ></div>

          <div
            class="w-12 h-12 rounded-full animate-spin absolute
                            border-[4px] border-solid border-yellow-500 border-t-transparent shadow-md"
          ></div>
        </div>
      </div>
    </div>
  );
};
