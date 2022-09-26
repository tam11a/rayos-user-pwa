import {
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductBox from "../../components/ProductBox";
import { categoryContext } from "../../context/categoryProvider";
import snackContext from "../../context/snackProvider";
import {
  useGetCategoryInfo,
  useGetSubCategoryInfo,
  useGetSubCategoryListByCategory,
} from "../../query/cat-subcat";
import { useGetAllProdCat, useSearchProduct } from "../../query/product";

const SearchResults = ({ search }) => {
  return (
    <Container
      sx={{
        py: 1,
      }}
    >
      {search ? (
        <>
          {search.type === "q" ? (
            <SearchProduct name={search.value} />
          ) : search.type === "category" ? (
            <CategoryProduct id={search.value} />
          ) : search.type === "subcategory" ? (
            <SubcategoryProduct id={search.value} />
          ) : search.type === "all" ? (
            <ALlProductLayout />
          ) : (
            <></>
          )}
        </>
      ) : (
        <SearchSkeleton />
      )}
    </Container>
  );
};

const SearchProduct = ({ name }) => {
  const { createSnack } = React.useContext(snackContext);
  let [productList, setProductList] = React.useState([]);
  const { data, isLoading, isError, error } = useSearchProduct(name);

  React.useEffect(() => {
    if (isLoading) return;
    setProductList(data ? data?.data.value : []);
    if (isError)
      if (error.response.status === 400)
        createSnack(error?.response.data.msg, "error");
      else createSnack("Something Went Wrong!", "error");
  }, [data, error]);

  // console.log(productList);

  return (
    <>
      <Typography
        variant={"h6"}
        sx={{
          textTransform: "capitalize",
        }}
      >
        {isLoading ? <Skeleton width={"120px"} /> : "Search : " + name}
      </Typography>
      <Typography variant={"caption"}>
        {isLoading ? (
          <Skeleton width={"220px"} />
        ) : (
          `${productList?.length} Results Found`
        )}
      </Typography>
      <Grid
        container
        direction={"row"}
        rowGap={0.6}
        columnGap={0.6}
        flexWrap={"wrap"}
        sx={{
          my: 2,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <Skeleton
                key={num}
                variant="rectangular"
                component={Grid}
                item
                xs={5.9}
                sm={3.95}
                md={2.92}
                lg={1.97}
                sx={{
                  height: {
                    xs: "280px",
                    md: "310px",
                  },
                }}
              />
            ))}
          </>
        ) : (
          <>
            {productList?.map((product) => (
              <Grid
                key={product.id}
                item
                xs={5.9}
                sm={3.85}
                md={2.92}
                lg={2.3}
                sx={{
                  height: {
                    xs: "280px",
                    md: "310px",
                  },
                }}
              >
                <ProductBox product={product} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

const CategoryProduct = ({ id }) => {
  const { createSnack } = React.useContext(snackContext);
  let [info, setInfo] = React.useState({});
  let [suggestionList, setSuggestionList] = React.useState([]);
  let [productList, setProductList] = React.useState([]);
  const { data, isLoading, isError, error } = useGetCategoryInfo(id);

  React.useEffect(() => {
    if (isLoading) return;
    setInfo(data ? data?.data.value : {});
    setProductList(data ? data?.data.value.products : []);
    if (isError)
      if (error.response.status === 400)
        createSnack(error?.response.data.msg, "error");
      else createSnack("Something Went Wrong!", "error");
  }, [data]);

  const { data: sublistData } = useGetSubCategoryListByCategory(id);
  React.useEffect(() => {
    if (!sublistData) return;
    setSuggestionList(sublistData?.data?.value);
  }, [sublistData]);

  return (
    <>
      <Typography
        variant={"h6"}
        sx={{
          textTransform: "capitalize",
        }}
      >
        {isLoading ? (
          <Skeleton width={"120px"} />
        ) : (
          "Category : " + (info?.title_en || "Not Found")
        )}
      </Typography>
      <Typography variant={"caption"}>
        {isLoading ? (
          <Skeleton width={"220px"} />
        ) : (
          `${productList?.length} Results Found`
        )}
      </Typography>
      {suggestionList?.length ? (
        <>
          <br />
          <Stack
            direction={"row"}
            rowGap={1}
            columnGap={1}
            alignItems={"center"}
            flexWrap={"wrap"}
            sx={{
              pt: 1,
            }}
          >
            {/* <Typography variant="button">Subcategories: </Typography> */}
            {suggestionList?.map((suggestion) => (
              <Chip
                label={suggestion.title_en}
                key={suggestion.id}
                clickable
                component={Link}
                to={`/search?subcategory=${suggestion.id}`}
              />
            ))}
          </Stack>
        </>
      ) : (
        <></>
      )}
      <Grid
        container
        direction={"row"}
        rowGap={0.6}
        columnGap={0.6}
        flexWrap={"wrap"}
        sx={{
          my: 2,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <Skeleton
                key={num}
                variant="rectangular"
                component={Grid}
                item
                xs={5.9}
                sm={3.95}
                md={2.92}
                lg={1.97}
                sx={{
                  height: {
                    xs: "280px",
                    md: "310px",
                  },
                }}
              />
            ))}
          </>
        ) : (
          <>
            {productList?.map((product) => (
              <Grid
                key={product.id}
                item
                xs={5.9}
                sm={3.85}
                md={2.92}
                lg={2.3}
                sx={{
                  height: {
                    xs: "280px",
                    md: "310px",
                  },
                }}
              >
                <ProductBox product={product} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

const SubcategoryProduct = ({ id }) => {
  const { createSnack } = React.useContext(snackContext);
  let [info, setInfo] = React.useState({});
  let [productList, setProductList] = React.useState([]);
  const { data, isLoading, isError, error } = useGetSubCategoryInfo(id);

  React.useEffect(() => {
    if (isLoading) return;
    setInfo(data ? data?.data.value : {});
    setProductList(data ? data?.data.value.products : []);
    if (isError)
      if (error.response.status === 400)
        createSnack(error?.response.data.msg, "error");
      else createSnack("Something Went Wrong!", "error");
  }, [data]);

  return (
    <>
      <Typography
        variant={"h6"}
        sx={{
          textTransform: "capitalize",
        }}
      >
        {isLoading ? (
          <Skeleton width={"120px"} />
        ) : (
          "Subcategory : " + (info?.title_en || "Not Found")
        )}
      </Typography>
      <Typography variant={"caption"}>
        {isLoading ? (
          <Skeleton width={"220px"} />
        ) : (
          `${productList?.length} Results Found`
        )}
      </Typography>

      <Grid
        container
        direction={"row"}
        rowGap={0.6}
        columnGap={0.6}
        flexWrap={"wrap"}
        sx={{
          my: 2,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <Skeleton
                key={num}
                variant="rectangular"
                component={Grid}
                item
                xs={5.9}
                sm={3.95}
                md={2.92}
                lg={1.97}
                sx={{
                  height: {
                    xs: "280px",
                    md: "310px",
                  },
                }}
              />
            ))}
          </>
        ) : (
          <>
            {productList?.map((product) => (
              <Grid
                key={product.id}
                item
                xs={5.9}
                sm={3.85}
                md={2.92}
                lg={2.3}
                sx={{
                  height: {
                    xs: "280px",
                    md: "310px",
                  },
                }}
              >
                <ProductBox product={product} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export const ALlProductLayout = () => {
  const { categoryList, isLoading } = React.useContext(categoryContext);

  let [productList, setProductList] = React.useState([]);

  React.useEffect(() => {
    if (isLoading) return;
    setProductList(categoryList);
  }, [categoryList]);

  // console.log(productList);

  return (
    <>
      {isLoading ? (
        <SearchSkeleton />
      ) : (
        <>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 1,
              // pl: 1,
              pb: 1,
            }}
          >
            Products
          </Typography>
          <Divider />

          {productList?.map((perCat) => (
            <React.Fragment key={perCat.id}>
              {perCat.products.length ? (
                <>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{
                      my: 1,
                    }}
                  >
                    <Typography
                      variant={"h6"}
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      {perCat.titleEn}
                    </Typography>
                    <Button
                      variant={"contained"}
                      size={"small"}
                      component={Link}
                      to={`/search?category=${perCat.id}`}
                    >
                      See More
                    </Button>
                  </Stack>
                  <Divider />
                  <Stack
                    direction={"row"}
                    rowGap={1}
                    columnGap={1}
                    alignItems={"center"}
                    flexWrap={"wrap"}
                    sx={{
                      my: 1,
                    }}
                  >
                    {perCat?.subcategories?.map((perSubCat) => (
                      <Chip
                        label={perSubCat.titleEn}
                        key={perSubCat._id}
                        clickable
                        component={Link}
                        to={`/search?subcategory=${perSubCat._id}`}
                      />
                    ))}
                  </Stack>
                  <Grid
                    container
                    direction={"row"}
                    rowGap={0.6}
                    columnGap={0.6}
                    flexWrap={"wrap"}
                    sx={{
                      my: 2,
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {perCat?.products?.map((product) => (
                      <Grid
                        key={product.id}
                        item
                        xs={5.9}
                        sm={3.85}
                        md={2.92}
                        lg={2.3}
                        sx={{
                          height: {
                            xs: "280px",
                            md: "310px",
                          },
                        }}
                      >
                        <ProductBox product={product} />
                      </Grid>
                    ))}
                  </Grid>
                  <Divider />
                </>
              ) : (
                <></>
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

const SearchSkeleton = () => {
  return (
    <>
      <Typography variant={"h4"}>
        <Skeleton width={"120px"} />
      </Typography>
      <Typography variant={"h5"}>
        <Skeleton width={"220px"} />
      </Typography>
      <Grid
        container
        direction={"row"}
        rowGap={0.4}
        columnGap={0.4}
        flexWrap={"wrap"}
        sx={{
          my: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <Skeleton
            key={num}
            variant="rectangular"
            component={Grid}
            item
            xs={5.9}
            sm={3.95}
            md={2.96}
            lg={1.97}
            sx={{
              height: {
                xs: "280px",
                md: "310px",
              },
            }}
          />
        ))}
      </Grid>
    </>
  );
};

export default SearchResults;
