import {
  Box,
  Button,
  Divider,
  Hidden,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { BsYoutube } from "react-icons/bs";
import { useGetHomeImg } from "../../query/home-img";
import { ALlProductLayout } from "../Search/SearchResults";
import CategoryFlexBoxs from "./CategoryFlexBoxs";
import ContentSlider from "./ContentSlider";
import ImageSlider from "./ImageSlider";
import OfferImages from "./OfferImages";

const Index = () => {
  const {
    data: homeImgData,
    isLoading: homeImgLoading,
    isError: homeImgError,
  } = useGetHomeImg();
  const [homeImgList, setHomeImgList] = React.useState();

  React.useEffect(() => {
    if (homeImgLoading || homeImgError) return;
    if (!homeImgData.data.status) return;
    setHomeImgList(homeImgData.data.value[0]);
  }, [homeImgLoading]);

  const [notice, setNotice] = React
    .useState
    // "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet error soluta ducimus sint. Dolorem est laborum laboriosam officiis ad incidunt!"
    ();

  return (
    <>
      {/* Home Images */}
      {homeImgList ? (
        <ImageSlider homeImgList={homeImgList} />
      ) : (
        <Skeleton
          variant={"rectangular"}
          height={"200px"}
          sx={{
            mb: 1,
          }}
        />
      )}
      {/* Notice.. If Available */}
      {notice ? (
        <Box
          sx={{
            border: "1px solid",
            borderColor: "primary.contrastText",
            mb: 1,
            pt: 0.5,
            maxWidth: "99vw",
            mx: "auto",
          }}
        >
          <marquee>{notice}</marquee>
        </Box>
      ) : (
        <></>
      )}


      {/* Three Cards Section */}
      {homeImgList ? (
        // <OfferImages homeImgList={homeImgList} />
        <></>
      ) : (
        <Stack
          direction={"row"}
          spacing={1}
          justifyContent={"center"}
          sx={{
            maxWidth: "100vw",
            overflow: "hidden",
          }}
        >
          <Skeleton
            variant={"rectangular"}
            height={"200px"}
            sx={{
              maxWidth: "200px",
              aspectRatio: "1/1",
              mb: 1,
              flex: 1,
            }}
          />
          <Skeleton
            variant={"rectangular"}
            height={"200px"}
            sx={{
              maxWidth: "200px",
              aspectRatio: "1/1",
              mb: 1,
              flex: 1,
            }}
          />
          <Skeleton
            variant={"rectangular"}
            height={"200px"}
            sx={{
              maxWidth: "200px",
              aspectRatio: "1/1",
              mb: 1,
              flex: 1,
            }}
          />
        </Stack>
      )}

      {/* Category List */}
      <CategoryFlexBoxs />

      {/* All Products Layout */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          mb: 1,
          pl: 1,
          pb: 1,
        }}
      >
        Products
      </Typography>
      <Box sx={{ my: 1, maxWidth: "99vw", mx: "auto", px: 1, mt: 2 }}>
        <Divider />
        <ALlProductLayout />
      </Box>
    </>
  );
};

export default Index;
