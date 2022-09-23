import React from "react";

// Swiper Component
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Box, Button, Fab, Typography } from "@mui/material";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoInformation } from "react-icons/io5";
import { CgFileDocument, CgShoppingBag } from "react-icons/cg";
import { MdOutlineLocalOffer, MdOutlinePrivacyTip } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const contents = [
  {
    icon: (
      <IoInformation
        style={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "About Us",
    to: "/about",
  },
  {
    icon: (
      <CgShoppingBag
        style={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Our Products",
    to: "/search",
  },
  {
    icon: (
      <MdOutlineLocalOffer
        style={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Special Offers",
  },
  {
    icon: (
      <TbTruckDelivery
        style={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Delivery Policy",
    to: "/delivery-policy",
  },
  {
    icon: (
      <MdOutlinePrivacyTip
        style={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Privacy Policy",
    to: "/privacy-policy",
  },
  {
    icon: (
      <CgFileDocument
        style={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Terms",
  },
  {
    icon: (
      <TbTruckReturn
        style={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Return Policy",
    to: "/return-policy",
  },
  {
    icon: (
      <FiMessageSquare
        style={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Contact",
  },
];

const ContentSlider = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <Box
      sx={{
        position: "relative",
        "& .swiper": {
          position: "relative",
          width: {
            xs: "99vw",
            md: "70vw",
            lg: "50vw",
          },
          border: "1px solid",
          borderColor: "primary.contrastText",
          borderRadius: "2px",
          p: 1,
        },
        "& .swiper-slide": { width: "fit-content" },
      }}
    >
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Autoplay, Navigation]}
      >
        {contents?.map((con, index) => (
          <SwiperSlide key={index}>
            <Button
              variant={"contained"}
              color={"secondary"}
              disableElevation
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "unset",
                rowGap: 1,
                width: { xs: "100px", md: "125px" },
                height: { xs: "100px", md: "125px" },
                // color: "black.light",
              }}
              component={con.to ? Link : Button}
              to={con.to}
              onClick={con.func}
            >
              {con.icon}
              <Typography
                variant={"caption"}
                sx={{
                  lineHeight: "0.9rem",
                  textAlign: "center",
                  // color: "primary.dark",
                }}
              >
                {con.title}
              </Typography>
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
      <Fab
        ref={navigationPrevRef}
        size={"small"}
        color={"black"}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translate(-50%, -50%)",
          display: { xs: "none", lg: "flex" },
        }}
      >
        <IoIosArrowBack />
      </Fab>
      <Fab
        ref={navigationNextRef}
        size={"small"}
        color={"black"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "100%",
          transform: "translate(-50%, -50%)",
          display: { xs: "none", lg: "flex" },
        }}
      >
        <IoIosArrowForward />
      </Fab>
    </Box>
  );
};

export default ContentSlider;
