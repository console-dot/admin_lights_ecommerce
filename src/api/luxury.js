import { apiRequest } from "../utils";

export const getLuxury = async ({ token }) => {
  const res = await apiRequest({
    method: "GET",
    url: "http://localhost:5000/luxury",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
export const updateLuxury = async ({ updateLuxuryData, id, token }) => {
  const res = await apiRequest({
    method: "Put",
    url: `http://localhost:5000/luxury/${id}`,
    data: updateLuxuryData,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
