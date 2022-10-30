import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { cartContext } from "../../context/cartProvider";
import noProduct from "../../assets/3298065 1.svg";
import { getAttachment } from "../../service/instance";
import snackContext from "../../context/snackProvider";
import { responseHandler } from "../../utilities/response-handler";
import { useDeleteCart, useUpdateCart } from "../../query/cart";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoIosImages } from "react-icons/io";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import {
  useCalculateOrder,
  useCreateOrder,
  useGetOrderCalculateByUser,
} from "../../query/order";
import orderContext from "../../context/orderProvider";

const Index = () => {
  const navigate = useNavigate();
  const cartCntxt = React.useContext(cartContext);
  const snack = React.useContext(snackContext);
  const { mutateAsync: calculateOrder, isLoading } = useCalculateOrder();
  const [searchParams] = useSearchParams();
  const [openCalculation, setOpenCalculation] = React.useState(false);
  const handleOpenCalculation = () => navigate("");

  React.useEffect(() => {
    if (!searchParams.get("confirm")) setOpenCalculation(false);
    else setOpenCalculation(true);
  }, [searchParams]);

  const onCalculateOrder = async () => {
    const res = await responseHandler(
      () =>
        calculateOrder({
          carts: Array.from([...cartCntxt.cartList], (c) => {
            return {
              id: c._id,
            };
          }),
          paymentMethod: "COD",
          shipping: "Dhaka, Bangladesh",
        }),
      [201]
    );
    if (res.status) {
      navigate("?confirm=1");
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  return (
    <>
      <Container>
        <Grid
          container
          sx={{
            mt: 2,
          }}
          rowGap={2}
        >
          <Grid item xs={12} md={8}>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: "bold",
              }}
            >
              Product Items
            </Typography>
            <Paper
              elevation={0}
              sx={{
                boxShadow: {
                  xs: 0,
                  md: 5,
                },
              }}
            >
              <List disablePadding>
                {cartCntxt.isLoading ? (
                  <>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Skeleton variant={"circular"} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Skeleton variant={"text"} width={100} />}
                        secondary={<Skeleton variant={"text"} />}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Skeleton variant={"circular"} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Skeleton variant={"text"} width={100} />}
                        secondary={<Skeleton variant={"text"} />}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Skeleton variant={"circular"} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Skeleton variant={"text"} width={100} />}
                        secondary={<Skeleton variant={"text"} />}
                      />
                    </ListItem>
                  </>
                ) : cartCntxt.total ? (
                  <>
                    {cartCntxt.cartList?.map((cart) => (
                      <React.Fragment key={cart.id}>
                        <ProductItem cart={cart} />
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <>
                    <ListItem>
                      <Stack
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        spacing={2}
                        sx={{
                          flex: 1,
                          my: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: "220px",
                            height: "180px",
                            borderRadius: 0,
                          }}
                          src={noProduct}
                        />
                        <Alert severity="error">No Product in Cart!</Alert>
                      </Stack>
                    </ListItem>
                  </>
                )}
              </List>
            </Paper>
            <Hidden smDown>
              <Stack
                direction={"row"}
                sx={{
                  my: 2,
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Button
                    color={"black"}
                    variant={"contained"}
                    size={"small"}
                    startIcon={<MdOutlineAddShoppingCart />}
                    component={Link}
                    to={"/search"}
                  >
                    Continue Shopping
                  </Button>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    maxWidth: { xs: "unset", sm: "250px" },
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography variant="button">Subtotal :</Typography>
                    <Typography>{cartCntxt.subtotalAmount} ৳</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography variant="button">Delivery :</Typography>
                    <Typography>{0} ৳</Typography>
                  </Stack>
                  <Divider
                    sx={{
                      my: 1,
                    }}
                  />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{
                      width: "100%",
                      mb: 2,
                    }}
                  >
                    <Typography variant="button">total :</Typography>
                    <Typography>{cartCntxt.subtotalAmount} ৳</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Hidden>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              pl: {
                xs: 0,
                md: 2,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: "bold",
              }}
            >
              Payment & Shipping
            </Typography>
            <Paper
              elevation={0}
              sx={{
                mb: 1,
                boxShadow: {
                  xs: 0,
                  md: 5,
                },
              }}
            >
              <List>
                <ListItem>
                  <Typography variant={"body1"} fontWeight={"bold"}>
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    pt: 0,
                  }}
                >
                  <RadioGroup
                    defaultValue="cod"
                    sx={{
                      "& *": {
                        fontWeight: "600",
                      },
                    }}
                  >
                    <FormControlLabel
                      value="cod"
                      control={<Radio color={"warning"} />}
                      label="Cash On Delivery"
                    />
                  </RadioGroup>
                </ListItem>
                {/* <Divider />
              <ListItem>
                <Typography variant={"body1"} fontWeight={"bold"}>
                  Shipping Info
                </Typography>
              </ListItem> */}
              </List>
            </Paper>
            <Hidden xsUp>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  width: "100%",
                }}
              >
                <Typography variant="button">Subtotal :</Typography>
                <Typography>{cartCntxt.subtotalAmount} ৳</Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  width: "100%",
                }}
              >
                <Typography variant="button">Delivery :</Typography>
                <Typography>{0} ৳</Typography>
              </Stack>
              <Divider
                sx={{
                  my: 1,
                }}
              />
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  width: "100%",
                  mb: 2,
                }}
              >
                <Typography variant="button">total :</Typography>
                <Typography>{cartCntxt.subtotalAmount} ৳</Typography>
              </Stack>
            </Hidden>
            <Button
              variant={"contained"}
              color={"black"}
              disabled={!cartCntxt.total || isLoading}
              fullWidth
              onClick={onCalculateOrder}
            >
              Proceed to Checkout
            </Button>
          </Grid>
        </Grid>
      </Container>
      {openCalculation && (
        <CalculationDialog
          open={openCalculation}
          onClose={handleOpenCalculation}
        />
      )}
    </>
  );
};

const CalculationDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const snack = React.useContext(snackContext);
  const congrats = React.useContext(orderContext);
  const [order, setOrder] = React.useState();
  const { data, isLoading, isError } = useGetOrderCalculateByUser();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    if (isError) {
      snack.createSnack("Something went wrong", "error");
      onClose();
    }
    if (!data) return;
    if (!data.data.success) {
      snack.createSnack(data?.data?.message || "Something went wrong", "error");
      onClose();
    }

    setOrder(data.data?.data);
  }, [isError, data]);

  const { mutateAsync: createOrder, isLoading: createLoading } =
    useCreateOrder();

  const onConfirmOrder = async () => {
    const res = await responseHandler(() => createOrder({}), [201]);
    if (res.status) {
      onClose();
      snack.createSnack(res.msg);
      navigate("/user/order");
      congrats.pop();
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  return isLoading ? (
    <>
      <Backdrop
        open={true}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  ) : (
    <>
      <Dialog
        open={open}
        // onClose={onClose}
        PaperProps={{
          sx: {
            width: "100vw",
          },
        }}
        fullScreen={fullScreen}
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Order Details</span>
          {/* <span>{order?.total} ৳</span> */}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <List disablePadding>
            {order?.carts?.map?.((cart) => (
              <React.Fragment key={cart._id}>
                <ListItem
                  sx={{
                    p: 0,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={getAttachment(cart.variant?.product?.image)}
                      sx={{
                        borderRadius: 1,
                        height: "70px",
                        width: "70px",
                        background: "transparent",
                        color: "primary.dark",
                        mr: 2,
                      }}
                    >
                      <IoIosImages
                        style={{
                          fontSize: "1.8em",
                        }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      flex: 1,
                    }}
                    primary={
                      <>
                        <b>{cart.variant?.product?.titleEn || "-"}</b>
                      </>
                    }
                    secondary={
                      <>
                        {cart.variant?.product?.variantType || "Variant"}:{" "}
                        <span
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          {cart.variant?.titleEn || "-"}
                        </span>
                        <br />
                        <span
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          {cart.quantity || 0}
                        </span>{" "}
                        items &times;{" "}
                        <span
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          {cart.variant?.product?.price || 0}
                        </span>{" "}
                        ৳
                      </>
                    }
                    primaryTypographyProps={{
                      noWrap: true,
                      sx: {
                        color: "black.main",
                        textDecoration: "none",
                      },
                    }}
                    secondaryTypographyProps={{
                      noWrap: true,
                      sx: {
                        textDecoration: "none",
                        "& span": {
                          color: "black.main",
                        },
                      },
                    }}
                  />
                  <ListItemText
                    primary={
                      <>{cart.quantity * cart.variant?.product?.price} ৳</>
                    }
                    primaryTypographyProps={{
                      noWrap: true,
                      sx: {
                        color: "black.main",
                        fontWeight: "600",
                        textAlign: "right",
                      },
                    }}
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
          <Divider
            sx={{
              my: 2,
            }}
          />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="button">Payment Method :</Typography>
            <b>Cash On Delivery</b>
          </Stack>
          <Divider
            sx={{
              my: 2,
            }}
          />
          <Typography variant="button">Shipping Address :</Typography>
          <Typography variant="body1" fontWeight={500}>
            {order?.shipping}
          </Typography>

          <Divider
            sx={{
              my: 2,
            }}
          />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="button">Subtotal :</Typography>
            <Typography>{order?.sellPrice || 0} ৳</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="button">Delivery Fee :</Typography>
            <Typography>{order?.shippingFee || 0} ৳</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="button">Discount :</Typography>
            <Typography>- {order?.discount || 0} ৳</Typography>
          </Stack>
          <Divider
            sx={{
              my: 1,
            }}
          />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
              mb: 2,
            }}
          >
            <Typography variant="button">
              <b>total :</b>
            </Typography>
            <Typography>
              <b>{order?.total || 0}</b> ৳
            </Typography>
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant={"outlined"} color={"error"} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={"contained"}
            color={"black"}
            onClick={onConfirmOrder}
            disabled={createLoading || isLoading}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const ProductItem = ({ cart }) => {
  const snack = React.useContext(snackContext);

  const { mutateAsync: deleteCart, isLoading } = useDeleteCart();
  const onDeleteCart = async () => {
    const res = await responseHandler(() =>
      deleteCart({
        cartId: cart._id,
      })
    );
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  const { mutateAsync: updateCart, isLoading: isCartLoading } = useUpdateCart();
  const onUpdateCart = async (quantity) => {
    const res = await responseHandler(
      () =>
        updateCart({
          cartId: cart?._id,
          quantity,
        }),
      [201]
    );
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  return (
    <>
      <ListItem
        key={cart._id}
        disablePadding
        sx={{
          px: 1,
          pr: { xs: 1, md: 2 },
          py: 0.5,
        }}
      >
        <ListItemAvatar>
          <Avatar
            src={getAttachment(cart.variant?.product?.image)}
            sx={{
              borderRadius: 1,
              height: "55px",
              width: "55px",
              background: "transparent",
              color: "primary.dark",
              mr: 1,
            }}
            component={Link}
            to={`/product/${cart?.variant?.product?._id}`}
          >
            <IoIosImages
              style={{
                fontSize: "1.8em",
              }}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{
            flex: 1,
          }}
          primary={
            <>
              <b>{cart.variant?.product?.titleEn || "-"}</b>
            </>
          }
          secondary={
            <>
              {cart.variant?.product?.variantType}:{" "}
              <span
                style={{
                  fontWeight: 600,
                }}
              >
                {cart.variant?.titleEn || "-"}
              </span>{" "}
              &times;{" "}
              <span
                style={{
                  fontWeight: 600,
                }}
              >
                {cart.variant?.product?.sellPrice || 0}
              </span>{" "}
              ৳
            </>
          }
          primaryTypographyProps={{
            noWrap: true,
            sx: {
              color: "black.main",
              textDecoration: "none",
            },
            component: Link,
            to: `/product/${cart?.variant?.product?._id}`,
          }}
          secondaryTypographyProps={{
            noWrap: true,
            sx: {
              textDecoration: "none",
              "& span": {
                color: "black.main",
              },
            },
            component: Link,
            to: `/product/${cart?.variant?.product?._id}`,
          }}
        />
        <IconButton
          sx={{ pl: 0 }}
          color={"black"}
          size={"small"}
          onClick={() => onUpdateCart(cart?.quantity - 1)}
          disabled={!(cart?.quantity - 1) || isLoading || isCartLoading}
        >
          <AiFillMinusSquare />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            minWidth: "15px",
            textAlign: "center",
          }}
        >
          {cart?.quantity || 0}
        </Typography>
        <IconButton
          color={"black"}
          size={"small"}
          onClick={() => onUpdateCart(cart?.quantity + 1)}
          disabled={
            cart?.quantity >= cart?.variant.quantity ||
            isLoading ||
            isCartLoading
          }
        >
          <AiFillPlusSquare />
        </IconButton>
        <IconButton
          sx={{
            ml: 1,
          }}
          color={"error"}
          size={"small"}
          onClick={() => onDeleteCart(cart._id)}
          disabled={isLoading || isCartLoading}
        >
          <RiDeleteBinLine />
        </IconButton>
      </ListItem>
    </>
  );
};

export default Index;
