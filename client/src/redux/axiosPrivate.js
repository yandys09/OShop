import axios from "axios";
import { BASEURL } from "../constants/baseURL";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const axiosPrivate = axios.create({
  baseURL: `${BASEURL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = store?.getState()?.auth?.credentials?.accessToken;
    if (accessToken) {
      console.log(accessToken);
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;
