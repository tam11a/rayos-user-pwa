import axios from "axios";

export const rootURL = "https://backend.pndservicebd.com/";
export const baseURL = rootURL + "api/backend/";

export const authRootURL = "https://oauth.pndservicebd.com/";
export const authURL = authRootURL + "api/auth/";

const instance = axios.create({
  // unauthorized instance
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});

export const updateInstance = () => {
  instance.interceptors.request.use(
    (req) => {
      req.headers["Authorization"] = `Bearer ${localStorage.getItem("tkn")}`;
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


export default instance;
