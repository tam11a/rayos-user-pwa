import React from "react";

// Swiper Component
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { rootURL } from "../../service/instance";
import { Box } from "@mui/material";

const ImageSlider = ({ homeImgList }) => {
  //   console.log(homeImgList);

  return (
    <Box
      sx={{
        mx: {
          xs: 1,
          md: 0,
        },
        "& .swiper-pagination-bullet": {
          bgcolor: "white.main",
          border: "1px solid #aaa",
        },
      }}
    >
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        spaceBetween={10}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <Box
            sx={{
              "& img": {
                width: "100%",
                borderRadius: "4px",
              },
            }}
          >
            <img src={rootURL + homeImgList.first_banner} alt={"home_splash"} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{
              "& img": {
                width: "100%",
                borderRadius: "4px",
              },
            }}
          >
            <img
              src={rootURL + homeImgList.second_banner}
              alt={"home_splash"}
            />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{
              "& img": {
                width: "100%",
                borderRadius: "4px",
              },
            }}
          >
            <img src={rootURL + homeImgList.third_banner} alt={"home_splash"} />
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default ImageSlider;
