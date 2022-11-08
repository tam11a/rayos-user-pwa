import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAddressByUser = () => {
  return instance.get(`address`);
};

export const useGetAddressByUser = () => {
  return useQuery(["get-address-by-user"], () => getAddressByUser(), {
    // refetchInterval: 20000,
  });
};

const createAddress = (data) => {
  return instance.put(`address`, data);
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(createAddress, {
    onSuccess: () => queryClient.invalidateQueries("get-address-by-user"),
  });
};

// 148/2, Abed Dhali Road, Lake Circus, Kalabagan, Dhaka
