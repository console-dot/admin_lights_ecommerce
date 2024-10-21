import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { LiaRocketSolid } from "react-icons/lia";
import { MdWallet } from "react-icons/md";
import { SlSocialDropbox } from "react-icons/sl";

const benefitsData = [
  {
    icon: <LiaRocketSolid size={60} />,
    heading: "WORLDWIDE DELIVERY",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    icon: <MdWallet size={60} />,
    heading: "GREAT SAVINGS",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    icon: <SlSocialDropbox size={60} />,
    heading: "GIFT VOUCHER",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    icon: <FaWhatsapp size={60} />,
    heading: "24*7 SUPPORT",
    description: "Lorem ipsum dolor sit amet.",
  },
];

// Individual benefit card component
const BenefitCard = ({ icon, heading, description }) => (
  <div className="flex flex-col justify-center items-center p-4 group md:max-w-screen-lg max-w-screen-sm">
    <div className="mb-2 group-hover:text-[#F99106] transition-all duration-500">
      {icon}
    </div>
    <div>
      <span className="text-lg heading group-hover:text-[#F99106]">
        {heading}
      </span>
    </div>
    <div>
      <span className="text-sm italic text-[#CCCCCC]">
        {description}
      </span>
    </div>
  </div>
);

export const OurBenefits = () => {
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);

  // Effect to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll logic for mobile view
  useEffect(() => {
    if (isMobile) {
      const scrollContainer = scrollContainerRef.current;
      const scrollInterval = setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += scrollContainer.offsetWidth;
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.offsetWidth) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 3000); // Auto-scroll every 3 seconds
      return () => clearInterval(scrollInterval);
    }
  }, [isMobile]);

  return (
    <div className="bg-[#111111] md:pt-20 pt-10 text-white w-full  mx-auto">
      {isMobile ? (
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto rtl"
          style={{ direction: "rtl" }}
        >
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
              style={{ minWidth: "80%" }}
            >
              <BenefitCard
                icon={benefit.icon}
                heading={benefit.heading}
                description={benefit.description}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex  justify-center items-center md:gap-4">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="flex justify-center items-center group">
              <BenefitCard
                icon={benefit.icon}
                heading={benefit.heading}
                description={benefit.description}
              />
              {index < benefitsData.length - 1 && (
                <div className="md:flex hidden w-[1px] bg-gray-800 h-28 mx-10"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
