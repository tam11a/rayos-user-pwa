import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { authContext } from "../../context/authProvider";
import { useGetProductByID, useToggleBookmark } from "../../query/product";
import { getAttachment } from "../../service/instance";

import {
  AiFillHeart,
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiOutlineHeart,
} from "react-icons/ai";
import { MdCall, MdShare } from "react-icons/md";
// import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { Icon } from "@iconify/react";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";

const Index = () => {
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);
  const { mutateAsync: toggleBookmark, isLoading: bookmarkPressed } =
    useToggleBookmark();

  const { productId } = useParams();

  const {
    data: productInfo,
    isLoading,
    isError,
  } = useGetProductByID(productId);

  const [product, setProduct] = React.useState({});

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
    <Container
      sx={{
        py: 1,
      }}
    >
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
              {imgList?.map((perImg, index) => (
                <React.Fragment key={index}>
                  <SwiperSlide>
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
                </React.Fragment>
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
                {isLoading ? <Skeleton variant={"text"} /> : product.titleEn}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems={"center"}>
                <Rating
                  name="half-rating-read"
                  defaultValue={4.6}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <span
                  style={{
                    fontWeight: "500",
                    color: "#72808F",
                  }}
                >
                  {isLoading ? <Skeleton variant={"text"} /> : "14 ratings"}
                </span>
              </Stack>
            </Box>
            <Stack direction="row" spacing={0.5} alignItems={"center"}>
              <IconButton color="primary" aria-label="share">
                <MdShare />
              </IconButton>
              {authCntxt.isVerified ? (
                <IconButton
                  color="error"
                  aria-label="add to favorite"
                  disabled={bookmarkPressed}
                  onClick={async () => {
                    const res = await responseHandler(() =>
                      toggleBookmark(productId)
                    );
                    if (res.status) {
                      snack.createSnack(res.msg);
                    } else {
                      snack.createSnack(res.msg, "error");
                    }
                  }}
                >
                  {authCntxt.userInfo?.bookmarks?.includes(productId) ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </IconButton>
              ) : (
                <></>
              )}
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
                  fontWeight: "500",
                  fontSize: "2.5em",
                  color: "primary.main",
                }}
              >
                ৳
              </Typography>
            </Stack>
            {authCntxt.isVerified ? (
              <Stack direction="row" spacing={0.5} alignItems={"center"}>
                <IconButton sx={{ color: "#018037" }}>
                  {/* <LocalPhoneRoundedIcon /> */}
                  <MdCall />
                </IconButton>

                <IconButton sx={{ color: "#5766CC" }}>
                  <Icon icon="jam:messages-f" />
                </IconButton>
              </Stack>
            ) : (
              <></>
            )}
          </Stack>
          {/* Created Size Variant */}

          <span>
            <Typography
              variant={"h6"}
              sx={{
                fontWeight: "600",
                color: "primary.main",
              }}
            >
              {product.variantType}:
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
                    border: "1px solid !important",
                    borderRadius: "2px !important",
                  }}
                  value={variant._id}
                  disabled={!variant.quantity}
                  key={variant._id}
                >
                  {variant.titleEn}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </span>

          {/* Create Quantity */}
          <Stack sx={{ mt: 1 }}>
            <Typography
              variant={"h6"}
              sx={{
                fontWeight: "600",
                color: "primary.main",
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
              mt: 1,
            }}
          >
            Total Price:{" "}
            <span
              style={{
                fontWeight: "500",
                color: "#72808F",
              }}
            >
              {product?.sellPrice * num || 0}৳
            </span>
          </Typography>

          <Button
            variant="contained"
            startIcon={<Icon icon="ic:round-add-shopping-cart" />}
            color={"warning"}
            sx={{
              mt: 1,
            }}
          >
            Add to cart
          </Button>
        </Grid>

        {/* Description part */}
        <Grid item xs={12} mb={4}>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
