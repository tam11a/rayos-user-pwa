import { useQuery } from "react-query";
import instance from "../service/instance";

const getProductByID = (id) => {
  return instance.get(`product/${id}`);
};

export const useGetProductByID = (id) => {
  return useQuery(["get-prod-by-id", id], () => getProductByID(id), {
    enabled: !!id,
    retry: 1,
  });
};

const getAllProduct = () => {
  return instance.get(`product/get-all-product-info`);
};

export const useGetAllProduct = () => {
  return useQuery("get-all-products", () => getAllProduct(), {});
};

const searchProduct = (name) => {
  return instance.get(`product/search-product?type=name&keyword=${name}`);
};

export const useSearchProduct = (name) => {
  return useQuery(["search-product", name], () => searchProduct(name), {});
};

const allProdCat = () => {
  return instance.get(`category/get-all-category-info-with-prod-sub`);
};

export const useGetAllProdCat = () => {
  return useQuery(["all-prod-cat"], () => allProdCat(), {});
};
