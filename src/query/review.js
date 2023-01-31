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

const createReview = (data) => instance.post(`review`, data);
export const useCreateReview = () => {
	const queryClient = useQueryClient();
	return useMutation(createReview, {
		onSuccess: () => {
			queryClient.invalidateQueries("get-all-order");
			queryClient.invalidateQueries("get-user-orderlist-by-id");
			queryClient.invalidateQueries("get-products-by-order-id");
		},
	});
};
