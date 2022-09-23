import React from "react";

// Swiper Component
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";

import { rootURL } from "../../service/instance";
import { Box, Paper } from "@mui/material";

const OfferImages = ({ homeImgList }) => {
  //   console.log(homeImgList);

  return (
    <Box
      sx={{
        width: "fit-content",
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide
          style={{
            width: "fit-content",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              width: "fit-content",
              "& img": {
                width: {
                  xs: "150px",
                  md: "250px",
                },
              },
            }}
            component={Paper}
            elevation={4}
          >
            <img src={rootURL + homeImgList.first_card} alt={"home_splash"} />
          </Box>
        </SwiperSlide>
        <SwiperSlide
          style={{
            width: "fit-content",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              width: "fit-content",
              "& img": {
                width: {
                  xs: "150px",
                  md: "250px",
                },
              },
            }}
            component={Paper}
            elevation={4}
          >
            <img src={rootURL + homeImgList.second_card} alt={"home_splash"} />
          </Box>
        </SwiperSlide>
        <SwiperSlide
          style={{
            width: "fit-content",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              width: "fit-content",
              "& img": {
                width: {
                  xs: "150px",
                  md: "250px",
                },
              },
            }}
            component={Paper}
            elevation={4}
          >
            <img src={rootURL + homeImgList.third_card} alt={"home_splash"} />
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default OfferImages;
