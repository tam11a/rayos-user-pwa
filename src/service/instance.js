import axios from "axios";

export const rootURL = "http://api.rayosbd.com/";
export const baseURL = rootURL + "api";

export const authRootURL = "https://oauth.pndservicebd.com/";
export const authURL = authRootURL + "api/auth/";

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

export const authInstance = axios.create({
  // authentication instance
  baseURL: authURL,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});

export const updateAuthInstance = () => {
  authInstance.interceptors.request.use(
    (req) => {
      req.headers["Authorization"] = `Bearer ${localStorage.getItem("tkn")}`;
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
