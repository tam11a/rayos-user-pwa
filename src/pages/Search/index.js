import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Toolbar,
} from "@mui/material";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllProduct } from "../../query/product";
import SearchResults from "./SearchResults";

const Index = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = React.useState();

  React.useEffect(() => {
    if (searchParams.get("q"))
      setSearch({
        type: "q",
        value: searchParams.get("q"),
      });
    else if (searchParams.get("category"))
      setSearch({
        type: "category",
        value: searchParams.get("category"),
      });
    else if (searchParams.get("subcategory"))
      setSearch({
        type: "subcategory",
        value: searchParams.get("subcategory"),
      });
    else
      setSearch({
        type: "all",
      });
  }, [searchParams]);

  return (
    <>
      <SearchResults search={search} />
    </>
  );
};

export default Index;
