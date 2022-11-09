import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getReviewsByProductID = (id) => {
  return instance.get(`review/product/${id}`);
};

export const useGetReviewsByProductID = (id) => {
  return useQuery(
    ["get-review-by-prod-id", id],
    () => getReviewsByProductID(id),
    {
      enabled: !!id,
      retry: 1,
    }
  );
};
