import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getCartByUser = (userId) => {
  return instance.get(`cart/get-cart-info-by-userid/${userId}`);
};

export const useGetCartByUser = (userId) => {
  return useQuery(["get-cart-by-user", userId], () => getCartByUser(userId), {
    enabled: !!userId,
    retry: 0,
    // refetchInterval: 20000,
  });
};

const createCart = (data) => {
  return instance.post("cart/create", data);
};

export const useCreateCart = () => {
  const queryClient = useQueryClient();
  return useMutation(createCart, {
    onSuccess: () => queryClient.invalidateQueries("get-cart-by-user"),
  });
};

const deleteCart = ({ cartId }) => {
  return instance.delete(`cart/delete/${cartId}`);
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCart, {
    onSuccess: () => queryClient.invalidateQueries("get-cart-by-user"),
  });
};

export const calculateOrder = (data) => {
  return instance.post("order/calculate", data);
};

export const createOrder = (data) => {
  return instance.post("order/create", data);
};
