import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "./userSessionService";

export function configureHttp() {
  axios.interceptors.request.use(config => {
    const accessToken = getAccessToken();
    if (accessToken) config.headers["x-access-token"] = accessToken;
    return config;
  });

  axios.interceptors.response.use(null, error => {
    const res = error && (error.response as AxiosResponse);
    if (res && res.status >= 400 && res.status < 500)
      return Promise.reject({ message: res.data });
    return Promise.reject({ message: "Unexpected error occurred" });
  });
}
