import React, { useContext, useState } from "react";
import { Footer, Nav, SideNavbar } from "../components";
import AddContext from "../context/dashboard/AddContext";

export const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const data = useContext(AddContext);
  return (
    <div
      className={`flex  relative ${
        data.bodyColor ? "bg-[#111111]" : "bg-[#F9F7F7]"
      }`}
    >
      <div className={`${data.width ? "w-0" : "lg:w-[5%]"} `}>
        <SideNavbar isMobile={isMobile} setIsMobile={setIsMobile} />
      </div>
      <div
        className={`w-full lg:w-[95%]  min-h-screen ${
          data?.width ? "ml-[250px]" : "ml-0"
        } transition-all duration-700 z-30 ease-in-out `}
      >
        <Nav isMobile={isMobile} setIsMobile={setIsMobile} />
        <div
          className={`flex-grow mt-[64px] lg:p-10 min-h-[calc(100vh-130px)]`}
        >
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};
