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
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import AddProductButton from "../../components/ProductBox/AddProductButton";
import { authContext } from "../../context/authProvider";
import { useGetProductByID } from "../../query/product";
import { rootURL } from "../../service/instance";
import { getAttachment } from "../../service/instance";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdShare } from "react-icons/md";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { Icon } from "@iconify/react";

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
  }, [product]);
  React.useEffect(() => {
    setPickedPhoto(imgList[0]?._id);
  }, [imgList]);

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

          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              variant={"h3"}
              sx={{
                mt: 1,
                fontWeight: "700",
                color: "primary.main",
              }}
            >
              {product.sellPrice} ৳
            </Typography>
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

          <Stack
            direction={"row"}
            sx={{
              my: 1,
            }}
            columnGap={2}
            alignItems={"center"}
          >
            {product.quantity ? (
              <>
                <Chip label={"In Stock"} color={"primary"} />
                <Typography variant={"subtitle2"}>
                  <b>Quantity:</b> {product.quantity}
                </Typography>
              </>
            ) : (
              <>
                <Chip label={"Out of Stock"} color={"error"} />
              </>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6.5}>
          <Typography
            variant={"h6"}
            sx={{
              fontWeight: "700",
            }}
          >
            Overview:
          </Typography>
          <Typography variant={"normal"}>{product.descriptionEn}</Typography>
          <br />
          <br />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
