import {
  Alert,
  AlertTitle,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { MdClose, MdOutlineAddShoppingCart } from "react-icons/md";
import { TbCopy } from "react-icons/tb";
import { notificationContext } from "../../context/notificationProvider";
import { rootURL } from "../../service/instance";
import AddProductButton from "./AddProductButton";

import FavIcon from "../../assets/pnd-favicon.png";
import { authContext } from "../../context/authProvider";
import { useCreateCart } from "../../query/cart";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";

// Import Swiper

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const ProductDialog = ({ open, handleClose, product }) => {
  const notification = React.useContext(notificationContext);
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

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

  const [colors, setColors] = React.useState({});

  React.useEffect(() => {
    setColors(JSON.parse(product.color_product_details).color);
  }, [product]);

  const [pickedColors, setPickedColors] = React.useState({});
  const [totalPick, setTotalPick] = React.useState(0);

  React.useEffect(() => {
    var tempTotal = 0;
    Object.keys(pickedColors)?.map((picked) => {
      tempTotal += pickedColors[picked];
    });
    setTotalPick(tempTotal);
    // console.log(pickedColors);
  }, [pickedColors]);

  React.useEffect(() => {
    // console.log(imgList);
    setPickedColors({});
    setPickedPhoto(imgList[0].photo_name);
  }, [open]);

  const { mutateAsync: createCart, isLoading } = useCreateCart();

  const removeZero = (item) =>
    Object.keys(item)
      .filter((key) => item[key] !== 0)
      .reduce(
        (newObj, key) => ({
          ...newObj,
          [key]: item[key],
        }),
        {}
      );

  const onCreateCart = async () => {
    const res = await responseHandler(() =>
      createCart({
        product_id: product.id,
        price: product.sell_price,
        quantity: totalPick,
        cart_info: JSON.stringify({
          color: removeZero(pickedColors),
        }),
        user_id: authCntxt.userId,
      })
    );

    if (res.status) {
      notification.show("New Product on Cart", {
        body: `${totalPick} ${product.title_en} added to Cart.`,
        icon: FavIcon,
        badge: FavIcon,
        image: rootURL + product.photo,
        tag: "product-add-cart",
        renotify: true,
      });
      handleClose();
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: {
              xs: "95vw",
              md: "800px",
            },
            maxWidth: { xs: "95vw", md: "800px" },
            maxHeight: {
              xs: "97vh",
            },
            minHeight: {
              xs: "97vh",
              sm: "unset",
            },
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <IconButton onClick={handleClose} size={"small"} color={"error"}>
              <MdClose />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
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
                src={rootURL + pickedPhoto}
                alt={product.title_en}
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
                          src={rootURL + perImg.photo_name}
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
            <Grid item xs={12} sm={6.5}>
              <Typography
                variant={"h5"}
                sx={{
                  fontWeight: "700",
                }}
              >
                {product.title_en}
              </Typography>
              {/* <br /> */}
              {authCntxt.isVerified ? (
                <Typography
                  variant={"h4"}
                  sx={{
                    mt: 1,
                    fontWeight: "700",
                    color: "primary.main",
                  }}
                >
                  {product.sell_price} ৳
                </Typography>
              ) : (
                <></>
              )}
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
              <Typography
                variant={"h6"}
                sx={{
                  fontWeight: "700",
                }}
              >
                Overview:
              </Typography>
              <Typography variant={"normal"}>
                {product.description_en}
              </Typography>
              <br />
              <br />
              {Object.keys(colors).length ? (
                <>
                  <TableContainer
                    sx={{
                      maxHeight: {
                        sm: "350px",
                      },
                      width: "100%",
                    }}
                  >
                    <Table
                      sx={{
                        "& tr:last-child td, & tr:last-child th": {
                          border: "none",
                        },
                      }}
                    >
                      <TableHead
                        sx={{
                          bgcolor: "#00000011",
                        }}
                      >
                        <TableRow>
                          <TableCell align="center">Color</TableCell>
                          <TableCell align="center" colSpan={2}>
                            Quantity
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(colors)?.map((color) => (
                          <React.Fragment key={product.id + color}>
                            <TableRow>
                              <TableCell align="center">{color}</TableCell>
                              <TableCell
                                align="right"
                                sx={{
                                  fontWeight: "800",
                                }}
                              >
                                {colors[color]}
                              </TableCell>
                              <TableCell align="center">
                                <AddProductButton
                                  max={parseInt(colors[color])}
                                  disabled={!colors[color]}
                                  onChange={(newValue) => {
                                    setPickedColors({
                                      ...pickedColors,
                                      [color]: newValue,
                                    });
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <></>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        {/* <Divider /> */}
        {authCntxt.isVerified ? (
          <DialogActions
            sx={{
              pr: totalPick > 9 ? 2.5 : totalPick > 0 ? 2 : 1,
            }}
          >
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}?product=${product.id}`
                );
                snack.createSnack("Copied URL!");
              }}
              variant={"outlined"}
              color={"black"}
              startIcon={<TbCopy />}
              sx={{
                mr: 1,
              }}
            >
              Copy Link
            </Button>
            <Badge
              overlap={"rectangular"}
              badgeContent={totalPick}
              color="black"
            >
              <Button
                variant={"contained"}
                color={"warning"}
                startIcon={<MdOutlineAddShoppingCart />}
                disabled={!totalPick || isLoading}
                onClick={onCreateCart}
              >
                Add to Cart
              </Button>
            </Badge>
          </DialogActions>
        ) : (
          <Alert
            sx={{
              m: 1,
              mx: 1,
            }}
            color={"error"}
            action={
              <Stack direction={"row"} alignItems={"center"} columnGap={1}>
                <Hidden smDown>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}?product=${product.id}`
                      );
                      snack.createSnack("Copied URL!");
                    }}
                    variant={"outlined"}
                    color={"black"}
                    size={"small"}
                    startIcon={<TbCopy />}
                  >
                    Copy Link
                  </Button>
                </Hidden>
                <Hidden smUp>
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}?product=${product.id}`
                      );
                      snack.createSnack("Copied URL!");
                    }}
                    color={"black"}
                    size={"small"}
                  >
                    <TbCopy />
                  </IconButton>
                </Hidden>
                <Button
                  color={"black"}
                  size={"small"}
                  variant={"contained"}
                  onClick={authCntxt.handleOpen}
                >
                  Sign In
                </Button>
              </Stack>
            }
          >
            Sign in to See Price &amp; Order
          </Alert>
        )}
      </Dialog>
    </>
  );
};

export default ProductDialog;
