import { useQuery } from "react-query";
import instance from "../service/instance";

const getHomeImg = () => {
  return instance.get(`feed/image`);
};

export const useGetHomeImg = () => {
  return useQuery("get-home-img", () => getHomeImg(), {});
};
