import { apiRequest } from "../utils";

export const getSignUpNewLetter = async ({ token }) => {
  const res = await apiRequest({
    method: "GET",
    url: "http://localhost:5000/signUpNewLetter",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
export const updateSignUpNewLetter = async ({
  updateSignUpNewLetterData,
  id,
  token,
}) => {
  const res = await apiRequest({
    method: "Put",
    url: `http://localhost:5000/signUpNewLetter/${id}`,
    data: updateSignUpNewLetterData,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};
