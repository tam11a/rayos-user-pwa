import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getCartByUser = () => {
  return instance.get(`cart`);
};

export const useGetCartByUser = (check) => {
  return useQuery(["get-cart-by-user", check], () => getCartByUser(), {
    enabled: check,
    // refetchInterval: 20000,
  });
};

const createCart = ({ variantId, quantity }) => {
  return instance.post(`cart/${variantId}?quantity=${quantity}`);
};

export const useCreateCart = () => {
  const queryClient = useQueryClient();
  return useMutation(createCart, {
    onSuccess: () => queryClient.invalidateQueries("get-cart-by-user"),
  });
};

const deleteCart = ({ cartId }) => {
  return instance.delete(`cart/${cartId}`);
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
