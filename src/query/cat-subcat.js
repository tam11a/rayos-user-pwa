import { useQuery } from "react-query";
import instance from "../service/instance";

const getCategory = () => {
  return instance.get(`category/get-all-category-info`);
};

export const useGetCategory = () => {
  return useQuery("get-categories", () => getCategory(), {});
};

const getSubCategory = () => {
  return instance.get(`subcategory/get-all-subcategory-info`);
};

export const useGetSubcategory = () => {
  return useQuery("get-subcategories", () => getSubCategory(), {});
};

const getCategoryInfo = (id) => {
  return instance.get(`category/get-category-info/${id}`);
};

export const useGetCategoryInfo = (id) => {
  return useQuery(["get-category", id], () => getCategoryInfo(id), {});
};

const getSubCategoryInfo = (id) => {
  return instance.get(`subcategory/get-subcategory-info/${id}`);
};

export const useGetSubCategoryInfo = (id) => {
  return useQuery(["get-subcategory", id], () => getSubCategoryInfo(id), {});
};

const getSubCategoryListByCategory = (id) => {
  return instance.get(`subcategory/get-subcategory-info-by-category/${id}`);
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
  return useQuery("get-cat-prods", getCatScreenList, {});
};