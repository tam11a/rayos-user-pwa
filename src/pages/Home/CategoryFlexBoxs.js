import { Avatar, Paper, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { categoryContext } from "../../context/categoryProvider";
import { rootURL } from "../../service/instance";

const CategoryFlexBoxs = () => {
  const { categoryList, isLoading, isError } =
    React.useContext(categoryContext);

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          mt: 2,
          mb: 1,
          pl: 1,
          pb: 1,
        }}
      >
        {isLoading ? (
          <Skeleton width={"150px"} />
        ) : categoryList.length ? (
          "Categories"
        ) : (
          ""
        )}
      </Typography>
      <Stack
        sx={{ my: 1, maxWidth: "99vw", mx: "auto" }}
        direction={"row"}
        rowGap={1}
        columnGap={1}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" height={"130px"} width={"130px"} />
            <Skeleton variant="rectangular" height={"130px"} width={"130px"} />
            <Skeleton variant="rectangular" height={"130px"} width={"130px"} />
            <Skeleton variant="rectangular" height={"130px"} width={"130px"} />
            <Skeleton variant="rectangular" height={"130px"} width={"130px"} />
            <Skeleton variant="rectangular" height={"130px"} width={"130px"} />
            <Skeleton variant="rectangular" height={"130px"} width={"130px"} />
            <Skeleton variant="rectangular" height={"130px"} width={"130px"} />
          </>
        ) : (
          <>
            {categoryList?.map((category) => (
              <Paper
                key={category.id}
                index={category.id}
                elevation={0}
                sx={{
                  height: {
                    xs: "110px",
                    md: "130px",
                  },
                  width: {
                    xs: "110px",
                    md: "130px",
                  },
                  boxShadow: "2",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid",
                  borderColor: "primary.contrastText",
                  rowGap: 1,
                  textDecoration: "none",
                }}
                component={Link}
                to={"/search?category=" + category.id}
              >
                <Avatar
                  alt={category.title_en}
                  src={rootURL + category.photo}
                  sx={{
                    borderRadius: 0,
                    p: 0.7,
                    width: "100%",
                    height: "100%",
                    maxWidth: {
                      xs: "50px",
                      md: "80px",
                    },
                    maxHeight: {
                      xs: "50px",
                      md: "80px",
                    },
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    textAlign: "center",
                    mx: "3px",
                    lineHeight: "1rem",
                  }}
                >
                  {category.title_en}
                </Typography>
              </Paper>
            ))}
          </>
        )}
      </Stack>
    </>
  );
};

export default CategoryFlexBoxs;
