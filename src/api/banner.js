import { apiRequest } from "../utils";

export const getBanner = async ({token}) => {
  const res = await apiRequest({
    method: "GET",
    url: "http://localhost:5000/banner",
  headers: { Authorization: `Bearer ${token}` }
  });
  console.log(res);
  return res;
};
export const updateBanner = async ({updatedBanner,id,token}) => {
  const res = await apiRequest({
    method: "Put",
    url:`http://localhost:5000/banner/${id}`,
    data: updatedBanner,
  headers: { Authorization: `Bearer ${token}` }
  });
  console.log(res);
  return res;
};
