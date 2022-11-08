import { Button } from "@mui/material";
import React from "react";
import { useInfiniteBookmarkList } from "../query/product";

const Test = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetched,
    isFetchingNextPage,
  } = useInfiniteBookmarkList();

  React.useEffect(() => {
    console.log(data);
    if (hasNextPage) fetchNextPage();
  }, [isFetched, hasNextPage]);

  return <div></div>;
};

export default Test;
