import axios from "axios";
import { Config } from "./helper";
import { message } from "antd";
export const request = async (url = "", method = "get", data = {}) => {
  var param_get = "";
  if (method === "get" && Object.keys(data).length > 0) {
    // data = {
    //     txt_search : "d",
    //     status : 1,
    //     brand : 1,
    //     group : 1,
    // }
    // ?txt_search=com&status=1&brand=a&group=b
    Object.keys(data).map((key, i) => {
      param_get += (i == 0 ? "?" : "&") + key + "=" + data[key];
    });
  }
  return axios({
    url: Config.base_url + url + param_get, //customer/getlist
    method: method,
    data: data,
    headers: {},
  })
    .then((res) => {
      // case api response
      // console.log("aaaaaa :", res.data);
      return res.data;
    })
    .catch((error) => {
      // error
      console.log("Unexpected Error ", error);
      message.error("Unexpected Error ", error);
      var status = error.response?.status;
      if (status == 404) {
        console.log(error.message);
        // message.error(error.message);
      } else if (status == 500) {
        console.log(error.message);
      }
      return false;
    });
};
