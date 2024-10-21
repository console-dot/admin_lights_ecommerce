import { apiRequest } from "../utils";

export const getBlogs = async ({ token }) => {
  const res = await apiRequest({
    method: "GET",
    url: "http://localhost:5000/blogs",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
export const updateBlogs = async ({ updatedBlogsData, id, token }) => {
  const res = await apiRequest({
    method: "Put",
    url: `http://localhost:5000/blogs/${id}`,
    data: updatedBlogsData,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
