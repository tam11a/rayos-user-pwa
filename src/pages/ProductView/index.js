import { Avatar, Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Index = (product) => {
  const [pickedPhoto, setPickedPhoto] = React.useState("");
  const [imgList, setImgList] = React.useState(
    product.multiimgs
      ? [
          {
            photo_name: product.photo,
          },
          ...product.multiimgs,
        ]
      : [
          {
            photo_name: product.photo,
          },
        ]
  );

  return (
    <Container>
      <Grid
        container
        direction={{
          xs: "column",
          sm: "row",
        }}
        rowGap={3}
        columnGap={2}
      >
        <Grid
          item
          xs={12}
          sm={4.5}
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Avatar
            // src={rootURL + pickedPhoto}
            // alt={product.title_en}
            sx={{
              borderRadius: 0,
              width: "100%",
              height: "350px",
            }}
          />
          <Box
            sx={{
              position: "relative",
              my: 2,
              "& .swiper": {
                position: "relative",
                maxWidth: {
                  xs: "85vw",
                  sm: "35vw",
                  md: "300px",
                },
              },
              "& .swiper-slide": { width: "fit-content" },
            }}
          >
            <Swiper slidesPerView={"auto"} spaceBetween={10}>
              {imgList?.map((perImg) => (
                <SwiperSlide key={perImg.photo_name}>
                  <Button
                    variant={"outlined"}
                    color={"black"}
                    // disableElevation
                    onClick={() => setPickedPhoto(perImg.photo_name)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textTransform: "unset",
                      rowGap: 1,
                      width: { xs: "60px", md: "80px" },
                      height: { xs: "60px", md: "80px" },
                      // color: "black.light",
                    }}
                  >
                    <Avatar
                      // src={rootURL + perImg.photo_name}
                      alt={perImg.photo_name}
                      sx={{
                        width: { xs: "55px", md: "75px" },
                        height: { xs: "55px", md: "75px" },
                        borderRadius: 0,
                      }}
                    />
                  </Button>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
