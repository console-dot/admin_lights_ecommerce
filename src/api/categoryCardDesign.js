import { apiRequest } from "../utils";

export const getCategoryCardDesign = async ({ token }) => {
  const res = await apiRequest({
    method: "GET",
    url: "http://localhost:5000/categoryCardDesign",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
export const updateCategoryCardDesign = async ({
  updatedCategoryCardDesignData,
  id,
  token,
}) => {
  const res = await apiRequest({
    method: "Put",
    url: `http://localhost:5000/categoryCardDesign/${id}`,
    data: updatedCategoryCardDesignData,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
