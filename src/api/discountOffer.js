import { apiRequest } from "../utils";

export const getDiscountOffer = async ({ token }) => {
  const res = await apiRequest({
    method: "GET",
    url: "http://localhost:5000/discountOffer",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
export const updateDiscountOffer = async ({
  updateDiscountOfferData,
  id,
  token,
}) => {
  const res = await apiRequest({
    method: "Put",
    url: `http://localhost:5000/discountOffer/${id}`,
    data: updateDiscountOfferData,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
