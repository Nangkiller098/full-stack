export const Config = {
  base_url: "http://localhost:8081/api/",
  image_path: "",
  version: "",
  token: "",
};

export const getUser = () => {
  return localStorage.getItem("fullname");
};
