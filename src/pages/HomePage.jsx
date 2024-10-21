import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../themes";
import {
  Banner,
  Blogs,
  CategoryCard,
  DecorateLight,
  DiscountOffer,
  FutureProducts,
  Gellary,
  LightsHouse,
  LuxuryStylist,
  NewArrivals,
  OurBenefits,
  SignUpNewsLetter,
} from "../components";

export const HomePage = () => {
  return (
    <>
      <Banner />
      <LuxuryStylist />
      <OurBenefits />
      <DecorateLight />
      <CategoryCard />
      <LightsHouse />
      <Blogs />
      <DiscountOffer />
      <SignUpNewsLetter />
    </>
  );
};
