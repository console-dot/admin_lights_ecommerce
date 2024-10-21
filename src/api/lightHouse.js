import { apiRequest } from "../utils";

export const getLightHouse = async ({ token }) => {
  const res = await apiRequest({
    method: "GET",
    url: "http://localhost:5000/lightHouse",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
export const updateLightHouse = async ({ updateLightHouseData, id, token }) => {
  const res = await apiRequest({
    method: "Put",
    url: `http://localhost:5000/lightHouse/${id}`,
    data: updateLightHouseData,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
