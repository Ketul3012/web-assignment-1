import axios from "axios";

axios.defaults.baseURL =
  "https://stoplight.io/mocks/web-assignment-1/web-assignment-1/322535152";

export const getRequest = <T>(endPoint: string) => {
  return axios.get<T>(endPoint);
};
