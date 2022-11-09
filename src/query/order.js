import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllOrderForUser = (params) => {
  return instance.get(
    `order/user?${
      params.method && params.method !== "all" ? `status=${params.method}&` : ""
    }limit=${params.limit}&page=${params.page}`
  );
};

export const useGetAllOrderForUser = (params) => {
  return useQuery(
    ["get-all-order-for-user", params],
    () => getAllOrderForUser(params),
    {
      // refetchInterval: 20000,
    }
  );
};

const calculateOrder = (data) => {
  return instance.post("order/calculate", data);
};

export const useCalculateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(calculateOrder, {
    onSuccess: () => queryClient.invalidateQueries("get-order-calculate"),
  });
};

const createOrder = (data) => {
  return instance.post("order/create", data);
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-cart-by-user");
    },
  });
};

const getOrderCalculateByUser = () => {
  return instance.get(`order/calculate`);
};

export const useGetOrderCalculateByUser = () => {
  return useQuery(["get-order-calculate"], getOrderCalculateByUser, {
    retry: 1,
  });
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

const getProductsByOrderID = (order_id) => {
  return instance.get(`order/${order_id}`);
};

export const useGetProductsByOrderID = (order_id) => {
  return useQuery(
    ["get-products-by-order-id", order_id],
    () => getProductsByOrderID(order_id),
    {
      // refetchInterval: 20000,
    }
  );
};

// order status
const updateOrderStatus = ({ id, status }) => {
  return instance.put(`order/${id}?status=${status}`);
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-order");
      queryClient.invalidateQueries("get-user-orderlist-by-id");
      queryClient.invalidateQueries("get-products-by-order-id");
    },
  });
};
