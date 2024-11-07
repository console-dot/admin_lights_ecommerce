import { apiRequest } from "../utils";

export const getCheckOut = async ({token}) => {
  const res = await apiRequest({
    method: "GET",
    url: "http://localhost:5000/checkout",
  headers: { Authorization: `Bearer ${token}` }
  });
  console.log(res);
  return res;
};