import React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
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
import ReviewBoxs from "../../components/ReviewBoxs";

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
import { IoIosImages } from "react-icons/io";
import { useCreateCart } from "../../query/cart";
import { TbNoteOff } from "react-icons/tb";

const Index = () => {
  const { productId } = useParams();

  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const { mutateAsync: toggleBookmark, isLoading: bookmarkPressed } =
    useToggleBookmark();

  const {
    data: productInfo,
    isLoading,
    isRefetching,
    isError,
  } = useGetProductByID(productId);

  const [product, setProduct] = React.useState({});
  const [pickedPhoto, setPickedPhoto] = React.useState("");
  const [imgList, setImgList] = React.useState([]);

  React.useEffect(() => {
    if (isLoading || isError || isRefetching) return;
    if (!productInfo?.status) return;
    setProduct(productInfo?.data?.data);
  }, [isLoading, isRefetching]);
  // console.log(product);

  React.useEffect(() => {
    if (isLoading || isError) return;
    try {
      setImgList([
        ...(product && product?.image
          ? [
              {
                image: product?.image,
              },
            ]
          : []),
        ...(product ? product?.images : []),
      ]);
    } catch {}

    handleChange(
      {},
      product?.variants?.filter((v) => v.isActive && v.quantity)?.[0]?._id
    );
  }, [product]);

  React.useEffect(() => {
    setPickedPhoto(imgList[0]?.image);
  }, [imgList]);

  const [alignment, setAlignment] = React.useState();

  const handleChange = (event, newAlignment) => {
    if (!newAlignment) return;
    setAlignment(newAlignment);
    product?.variants?.map((variant) => {
      setNum(1);
      if (variant._id == newAlignment) {
        setMaxNum(variant.quantity || 0);
      }
    });
  };

  // increment and decrement fucntion

  let [num, setNum] = React.useState(product.quantity ? 1 : 0);
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

  const { mutateAsync: createCart, isLoading: cartCreationLoading } =
    useCreateCart();

  const postCart = async () => {
    const res = await responseHandler(
      () =>
        createCart({
          variantId: alignment,
          quantity: num,
        }),
      [201]
    );
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  return isError ? (
    <Container
      sx={{
        py: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "300px",
        rowGap: 1,
      }}
    >
      <Avatar
        sx={{
          width: "80vw",
          maxWidth: "300px",
          border: "1px solid",
          borderColor: "#00000011",
          minHeight: "450px",
          bgcolor: "transparent",
          color: "primary.dark",
        }}
        variant={"rounded"}
      >
        <TbNoteOff
          style={{
            fontSize: "5em",
          }}
        />
      </Avatar>
      <Alert
        severity="error"
        sx={{
          width: "100%",
        }}
      >
        No Product Found
      </Alert>
    </Container>
  ) : (
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
            variant={"square"}
            sx={{
              border: "1px solid",
              borderColor: "#00000011",
              width: "100%",
              // height: "max-content",
              minHeight: "450px",
              bgcolor: "transparent",
              color: "primary.dark",
            }}
          >
            <IoIosImages
              style={{
                fontSize: "3em",
              }}
            />
          </Avatar>
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
                      // variant={"outlined"}
                      color={"black"}
                      // disableElevation
                      onClick={() => setPickedPhoto(perImg.image)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textTransform: "unset",
                        rowGap: 1,
                        p: 0,
                        width: { xs: "60px", md: "80px" },
                        height: { xs: "60px", md: "80px" },
                        // color: "black.light",
                      }}
                    >
                      <Avatar
                        src={getAttachment(perImg.image)}
                        alt={perImg.image}
                        variant={"square"}
                        sx={{
                          width: { xs: "55px", md: "75px" },
                          height: { xs: "55px", md: "75px" },
                          bgcolor: "#00000011",
                          color: "primary.dark",
                        }}
                      >
                        <IoIosImages
                          style={{
                            fontSize: "1.2em",
                          }}
                        />
                      </Avatar>
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
                  value={product?.rating?.total || 0}
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
                  {isLoading ? (
                    <Skeleton variant={"text"} />
                  ) : (
                    product?.rating?.count?.all
                  )}{" "}
                  reviews
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
                  <MdCall />
                </IconButton>

                {/* <IconButton sx={{ color: "#5766CC" }}>
                  <Icon icon="jam:messages-f" />
                </IconButton> */}
              </Stack>
            ) : (
              <></>
            )}
          </Stack>
          {/* Created Size Variant */}

          {product.variants?.length ? (
            <>
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
                  sx={{
                    height: "35px",
                    columnGap: 0.5,
                    rowGap: 0.5,
                    "& .Mui-selected": {
                      borderColor: "#F49320 !important",
                      bgcolor: "transparent !important",
                    },
                  }}
                >
                  {product.variants?.map(
                    (variant) =>
                      variant.isActive && (
                        <ToggleButton
                          sx={{
                            border: "1px solid !important",
                            borderColor: "#00000044 !important",
                            borderRadius: "2px !important",
                          }}
                          value={variant._id}
                          disabled={!variant.quantity}
                          key={variant._id}
                        >
                          {variant.titleEn}
                        </ToggleButton>
                      )
                  )}
                </ToggleButtonGroup>
              </span>
            </>
          ) : (
            <></>
          )}

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
              <IconButton
                onClick={decNum}
                sx={{ pl: 0, color: "#69717D" }}
                disabled={!product.quantity}
              >
                <AiFillMinusSquare />
              </IconButton>
              <Typography variant="h6">{num}</Typography>
              <IconButton
                onClick={incNum}
                sx={{ color: "#69717D" }}
                disabled={!product.quantity}
              >
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
            disabled={!product.variants?.length || cartCreationLoading}
            onClick={authCntxt.isVerified ? postCart : authCntxt.handleOpen}
          >
            Add to cart
          </Button>
        </Grid>

        {/* Description part */}
        <Grid item xs={12} mb={1}>
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
        <Grid item xs={12} mb={4}>
          <Typography
            variant={"h6"}
            sx={{
              fontWeight: "700",
            }}
          >
            Ratings & Reviews:
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={"start"}
            justifyContent={"space-between"}
            width={"95vw"}
            maxWidth={"600px"}
            rowGap={1}
          >
            <Stack direction={"column"}>
              <Stack direction={"row"} alignItems={"baseline"}>
                <Typography variant={"h3"} sx={{ fontWeight: "500" }}>
                  {product?.rating?.total || 0}
                </Typography>
                <Typography variant={"h4"} color={"gray"}>
                  /5
                </Typography>
              </Stack>
              <Rating
                name="half-rating-read"
                value={product?.rating?.total || 0}
                precision={0.1}
                size="large"
                readOnly
              />
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#72808F",
                  paddingLeft: "8px",
                }}
              >
                {isLoading ? (
                  <Skeleton variant={"text"} />
                ) : (
                  product?.rating?.count?.all || 0
                )}
                {" Reviews"}
              </span>
            </Stack>
            <Stack direction={"column"}>
              <RatingLine
                ratingValue={5}
                count={product?.rating?.count?.five}
                total={product?.rating?.count?.all}
              />
              <RatingLine
                ratingValue={4}
                count={product?.rating?.count?.four}
                total={product?.rating?.count?.all}
              />

              <RatingLine
                ratingValue={3}
                count={product?.rating?.count?.three}
                total={product?.rating?.count?.all}
              />
              <RatingLine
                ratingValue={2}
                count={product?.rating?.count?.two}
                total={product?.rating?.count?.all}
              />
              <RatingLine
                ratingValue={1}
                count={product?.rating?.count?.one}
                total={product?.rating?.count?.all}
              />
            </Stack>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <ReviewBoxs />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const RatingLine = ({ ratingValue, count, total }) => {
  return (
    <Stack direction="row" alignItems={"center"} columnGap={1}>
      <Rating
        name="half-rating-read"
        value={ratingValue} // ratingValue
        precision={0.1}
        size="small"
        readOnly
      />
      <LinearProgress
        variant="determinate"
        value={total ? (count / total) * 100 : 0}
        sx={{ width: "200px", height: "10px", color: "gray" }}
        color="rating"
      />
      <Typography>{count}</Typography>
    </Stack>
  );
};

export default Index;
