import { useQuery } from "react-query";
import instance from "../service/instance";

const getWalletByUser = (userId) => {
  return instance.get(`info/get-user/${userId}`);
};

export const useGetWalletByUser = (userId) => {
  return useQuery(
    ["get-wallet-by-user", userId],
    () => getWalletByUser(userId),
    {
      enabled: !!userId,
    }
  );
};

const getOrderListByUser = (params) => {
  return instance.get(
    `order/get-all-order-user/${params.uid}?orders=created_at-DESC&limit=${
      params.limit || 5
    }&page=${params.page || 1}`
  );
};

export const useGetOrderListCartByUser = (params) => {
  return useQuery(
    ["get-orderlist-by-user", params],
    () => getOrderListByUser(params),
    {
      enabled: !!params.uid,
    }
  );
};
