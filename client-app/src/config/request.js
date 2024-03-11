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
      console.log("aaaaaa :", res.data);
      return res.data;
    })
    .catch((error) => {
      // error
      console.log("bbbbbbbb ", error);
      var status = error.response.status;
      if (status == 404) {
        alert(error.message);
      } else if (status == 500) {
        alert(error.message);
      }
      return false;
    });
};
