import axios from "axios";
import { Config } from "./helper";

export const request = async (url = "", method = "get", data = {}) => {
  return axios({
    url: Config.base_url + url, //customer/getlist
    method: method,
    data: data,
    headers: {},
  })
    .then((res) => {
      // case api response
      return res.data;
    })
    .catch((error) => {
      // error
      var status = error.response.status;
      if (status == 404) {
        alert(error.message);
      }
      console.log(error);
      return false;
    });
};
