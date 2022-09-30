import React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import AddProductButton from "../../components/ProductBox/AddProductButton";
import { authContext } from "../../context/authProvider";
import { useGetProductByID } from "../../query/product";
import { rootURL } from "../../service/instance";
import { getAttachment } from "../../service/instance";

import {
  AiFillHeart,
  AiFillMinusSquare,
  AiFillPlusSquare,
} from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdShare } from "react-icons/md";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { Icon } from "@iconify/react";
import { useState } from "react";

const Index = () => {
  const { productId } = useParams();
  const {
    data: productInfo,
    isLoading,
    isError,
  } = useGetProductByID(productId);

  const [product, setProduct] = React.useState({});
  console.log(product);

  const [pickedPhoto, setPickedPhoto] = React.useState("");
  const [imgList, setImgList] = React.useState([]);
  // console.log(size);

  React.useEffect(() => {
    if (isLoading || isError) return;
    if (!productInfo?.status) return;
    setProduct(productInfo?.data?.data);
  }, [isLoading]);

  // console.log(getAttachment(pickedPhoto));

  React.useEffect(() => {
    setImgList(
      product.multiimgs
        ? [
            {
              _id: product.image,
            },
            ...product.multiimgs,
          ]
        : [
            {
              _id: product.image,
            },
          ]
    );
    handleChange({}, product?.variants?.[0]?._id);
  }, [product]);

  React.useEffect(() => {
    setPickedPhoto(imgList[0]?._id);
  }, [imgList]);

  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setNum(1);
    product?.variants?.map((variant) => {
      if (variant._id == newAlignment) {
        setMaxNum(variant.quantity || 0);
      }
    });
  };

  // increment and decrement fucntion

  let [num, setNum] = React.useState(1);
  let [maxNum, setMaxNum] = React.useState(0);
  let incNum = () => {
    if (num < maxNum) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };
  let handleChangeNum = (e) => {
    setNum(e.target.value);
  };
  // console.log(total);
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
            src={getAttachment(pickedPhoto)}
            alt={product.title_en}
            sx={{
              border: "1px solid",
              borderRadius: 0,
              width: "100%",
              height: "max-content",
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
                <SwiperSlide key={perImg._id}>
                  <Button
                    variant={"outlined"}
                    color={"black"}
                    // disableElevation
                    onClick={() => setPickedPhoto(perImg._id)}
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
                      src={getAttachment(perImg._id)}
                      alt={perImg._id}
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
        <Grid item xs={12} sm={6.5}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Box>
              <Typography
                variant={"h5"}
                sx={{
                  fontWeight: "700",
                }}
              >
                {product.titleEn}
              </Typography>

              <Stack direction="row" spacing={0.5} alignItems={"center"}>
                <Rating
                  name="half-rating-read"
                  defaultValue={4.6}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 1,
                    fontWeight: "600",
                    color: "primary.main",
                  }}
                >
                  14 ratings
                </Typography>
              </Stack>
            </Box>
            <Stack direction="row" spacing={0.5} alignItems={"center"}>
              <Box>
                <IconButton color="primary" aria-label="share">
                  <MdShare />
                </IconButton>
              </Box>
              <Box>
                <IconButton color="primary" aria-label="add to favorite">
                  <AiFillHeart />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
          <Divider
            sx={{
              my: 1.5,
            }}
          />
          {/* <br /> */}

          {/* Selling Price Option */}
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction="row" alignItems={"center"}>
              <Typography
                variant={"h3"}
                sx={{
                  fontWeight: "600",
                  color: "primary.main",
                }}
              >
                {product.sellPrice}
              </Typography>
              <Typography
                variant={"h4"}
                sx={{
                  fontWeight: "600",
                  color: "primary.main",
                }}
              >
                ৳
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems={"center"}>
              <Box>
                <IconButton sx={{ color: "#018037" }}>
                  <LocalPhoneRoundedIcon />
                </IconButton>
              </Box>
              <Box>
                <IconButton sx={{ color: "#5766CC" }}>
                  <Icon icon="jam:messages-f" />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
          {/* Created Size Variant */}

          <Stack>
            <Typography
              variant={"h6"}
              sx={{
                fontWeight: "600",
                color: "primary.main",
              }}
            >
              Size:
            </Typography>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{
                height: "35px",
                columnGap: 1,
                rowGap: 1,
                "& .Mui-selected": {
                  borderColor: "#F49320 !important",
                  bgcolor: "transparent !important",
                },
              }}
            >
              {product.variants?.map((variant) => (
                <ToggleButton
                  sx={{
                    // mr: 1,
                    border: "1px solid !important",
                    borderRadius: "2px !important",
                  }}
                  value={variant._id}
                  disabled={!variant.quantity}
                >
                  {variant.titleEn}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>

          {/* Create Quantity */}
          <Stack>
            <Typography
              variant={"h6"}
              sx={{
                fontWeight: "600",
                color: "primary.main",
                mt: 2,
              }}
            >
              Quantity:
            </Typography>

            <Stack direction="row" alignItems={"center"}>
              <IconButton onClick={decNum} sx={{ pl: 0, color: "#69717D" }}>
                <AiFillMinusSquare />
              </IconButton>
              <Typography variant="h6">{num}</Typography>
              <IconButton onClick={incNum} sx={{ color: "#69717D" }}>
                <AiFillPlusSquare />
              </IconButton>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontWeight: "500",
                  color: "#72808F",
                }}
              >
                ({maxNum} items available)
              </Typography>
            </Stack>
          </Stack>
          {/* Total Price Section */}

          <Typography
            variant={"h6"}
            sx={{
              fontWeight: "600",
              color: "primary.main",
            }}
          >
            Total Price:{" "}
            <span
              style={{
                fontWeight: "500",
                color: "#72808F",
              }}
            >
              {product?.sellPrice * num || 0}
            </span>
          </Typography>
        </Grid>

        {/* Description part */}
        <Grid item xs={12}>
          <Typography
            variant={"h6"}
            sx={{
              fontWeight: "700",
            }}
          >
            Overview:
          </Typography>
          <Typography
            variant={"body1"}
            sx={{
              textAlign: "justify !important",
              fontWeight: "500",
            }}
          >
            {product.descriptionEn}
          </Typography>
          <br />
          <br />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
