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

const updateCart = ({ cartId, quantity }) => {
  return instance.patch(`cart/${cartId}?quantity=${quantity}`);
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCart, {
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

