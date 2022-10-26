import { useQuery } from "react-query";
import instance from "../service/instance";

const getCategory = () => {
  return instance.get(`category`);
};

export const useGetCategory = () => {
  return useQuery("get-categories", () => getCategory(), {});
};

const getSubCategory = () => {
  return instance.get(`subcategory`);
};

export const useGetSubcategory = () => {
  return useQuery("get-subcategories", () => getSubCategory(), {});
};

const getCategoryInfo = (id) => {
  return instance.get(`category/${id}`);
};

export const useGetCategoryInfo = (id) => {
  return useQuery(["get-category", id], () => getCategoryInfo(id), {});
};

const getSubCategoryInfo = (id) => {
  return instance.get(`subcategory/${id}`);
};

export const useGetSubCategoryInfo = (id) => {
  return useQuery(["get-subcategory", id], () => getSubCategoryInfo(id), {});
};

const getProductListByCategory = (id) => {
  return instance.get(`category/${id}/products`);
};

export const useGetProductListByCategory = (id) => {
  return useQuery(
    ["get-product-list-by-category", id],
    () => getProductListByCategory(id),
    {}
  );
};

const getProductListBySubcategory = (id) => {
  return instance.get(`subcategory/${id}/products`);
};

export const useGetProductListBySubcategory = (id) => {
  return useQuery(
    ["get-product-list-by-subcategory", id],
    () => getProductListBySubcategory(id),
    {}
  );
};

const getSubCategoryListByCategory = (id) => {
  return instance.get(`category/${id}/subcategories`);
};

export const useGetSubCategoryListByCategory = (id) => {
  return useQuery(
    ["get-subcategory-list-by-category", id],
    () => getSubCategoryListByCategory(id),
    {}
  );
};

const getCatScreenList = () => {
  return instance.get("feed");
};

export const useGetCatScreenList = () => {
  return useQuery("get-feed", getCatScreenList, {});
};
