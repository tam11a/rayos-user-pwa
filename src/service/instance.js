import axios from "axios";

export const rootURL = "http://api.rayosbd.com/";
export const baseURL = rootURL + "api";

const instance = axios.create({
  // unauthorized instance
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${localStorage.getItem("tkn")}`,
  },
});

export const updateInstance = () => {
  instance.interceptors.request.use(
    (req) => {
      if (localStorage.getItem("tkn"))
        req.headers["Authorization"] = `Bearer ${localStorage.getItem("tkn")}`;
      else req.headers["Authorization"] = undefined;

      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};


export const getAttachment = (attachmentId) => {
  return baseURL + "/attachments/" + attachmentId;
};

export default instance;
