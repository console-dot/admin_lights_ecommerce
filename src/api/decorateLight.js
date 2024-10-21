import { apiRequest } from "../utils";

export const getDecorateLight = async ({ token }) => {
  const res = await apiRequest({
    method: "GET",
    url: "http://localhost:5000/decorateLight",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
export const updateDecorateLight = async ({ updateDecorateLightData, id, token }) => {
  const res = await apiRequest({
    method: "Put",
    url: `http://localhost:5000/decorateLight/${id}`,
    data: updateDecorateLightData,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
