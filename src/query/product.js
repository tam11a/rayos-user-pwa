import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
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

const searchProduct = ({ queryKey, pageParam = 1 }) => {
  return instance.get(`search`, {
    params: {
      search: queryKey[1],
      page: pageParam,
    },
  });
};

export const useInfiniteSearch = ({ search }) => {
  return useInfiniteQuery(["Infinite-Subcatprod-List", search], searchProduct, {
    select: (data) => {
      return data.pages.flatMap((p) => p.data.data);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page * lastPage.data.limit < lastPage.data.total)
        return lastPage.data.page + 1;
    },
    enabled: !!search,
  });
};
const toggleBookmark = (id) => {
  return instance.put(`bookmark/${id}`);
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries("user-validate");
      queryClient.invalidateQueries("Bookmark-List");
      queryClient.invalidateQueries("Infinite-Bookmark-List");
    },
  });
};

const getBookmarkList = ({ pageParam = 1, limit }) => {
  return instance.get(`bookmark`, {
    params: {
      page: pageParam,
      limit,
    },
  });
};

export const useGetBookmarkList = ({ page = 1, limit }) => {
  return useQuery(
    ["Bookmark-List", page, limit],
    () => getBookmarkList({ pageParam: page, limit }),
    {}
  );
};

export const useInfiniteBookmarkList = () => {
  return useInfiniteQuery(["Infinite-Bookmark-List"], getBookmarkList, {
    select: (data) => {
      return data.pages.flatMap((p) => p.data.data);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page * lastPage.data.limit < lastPage.data.total)
        return lastPage.data.page + 1;
    },
  });
};
