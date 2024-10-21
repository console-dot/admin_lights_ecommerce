import axios from "axios";

export const apiRequest = ({ method, url, data = {}, headers = {}, params = {} }) => {
  return axios({
    method,
    url,
    data,
    headers,
    params,
  })
    .then((response) => {
      return response;
    })
    .catch((response) => {
      return response
    });
};
