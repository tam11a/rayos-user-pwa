import {
  Alert,
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";
import { authContext } from "../authProvider";
import notFound from "../../assets/undraw_mobile_login_re_9ntv.svg";
import noProduct from "../../assets/3298065 1.svg";
import { RiDeleteBinLine } from "react-icons/ri";
import { getAttachment, rootURL } from "../../service/instance";
import { useDeleteCart } from "../../query/cart";
import snackContext from "../snackProvider";
import { responseHandler } from "../../utilities/response-handler";
import LoadingDivider from "../../components/LoadingDivider";
import { IoIosImages } from "react-icons/io";
import { cartContext } from ".";
import { Link } from "react-router-dom";

const CartDrawer = ({ open, onClose }) => {
  const cartInfo = React.useContext(cartContext);
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const { mutateAsync: deleteCart, isLoading } = useDeleteCart();
  const onDeleteCart = async (cartId) => {
    const res = await responseHandler(() =>
      deleteCart({
        cartId,
      })
    );
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "95vw",
            maxWidth: "320px",
          },
        }}
      >
        <List
          disablePadding
          sx={{
            flex: 1,
          }}
        >
          <ListItem
            disablePadding
            sx={{
              py: 0.5,
              px: 2,
            }}
          >
            <ListItemText primary={"Cart"} secondary={"Wish to Purchase"} />
            <IconButton size={"small"} color={"black"} onClick={onClose}>
              <MdClose />
            </IconButton>
          </ListItem>
          <LoadingDivider isLoading={isLoading} />
          {authCntxt.isVerified ? (
            <>
              {cartInfo.cartList?.map((cart) => (
                <ListItem
                  key={cart._id}
                  disablePadding
                  sx={{
                    px: 1,
                    pt: 1,
                    pr: 2,
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
                        mr: 1,
                      }}
                      component={Link}
                      to={`/product/${cart?.variant?.product?._id}`}
                      onClick={onClose}
                    >
                      <IoIosImages
                        style={{
                          fontSize: "1.8em",
                        }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
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
                        <br />
                        <span
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          {cart.quantity || 0}
                        </span>{" "}
                        Items &times;{" "}
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
                      onClick: onClose,
                    }}
                    secondaryTypographyProps={{
                      noWrap: true,
                      sx: {
                        "& span": {
                          color: "black.main",
                        },
                      },
                    }}
                  />
                  {/* <ListItemSecondaryAction> */}
                  <IconButton
                    size={"small"}
                    onClick={() => onDeleteCart(cart._id)}
                    disabled={isLoading}
                  >
                    <RiDeleteBinLine />
                  </IconButton>
                  {/* </ListItemSecondaryAction> */}
                </ListItem>
              ))}
              {cartInfo.cartList?.length ? (
                <></>
              ) : (
                <>
                  <Stack
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    spacing={2}
                    sx={{
                      minHeight: "70%",
                      flex: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "220px",
                        height: "180px",
                        borderRadius: 0,
                        mb: 3,
                      }}
                      src={noProduct}
                    />
                    <Alert severity="error">No Product in Cart!</Alert>
                  </Stack>
                </>
              )}
            </>
          ) : (
            <>
              <Stack
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={2}
                sx={{
                  minHeight: "70%",
                  flex: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: "220px",
                    height: "180px",
                    borderRadius: 0,
                  }}
                  src={notFound}
                />
                <Alert>Please Sign in to use Cart!</Alert>

                <Button
                  color={"black"}
                  variant={"contained"}
                  onClick={authCntxt.handleOpen}
                >
                  Sign In
                </Button>
                <Divider
                  sx={{
                    width: "100%",
                    maxWidth: "300px",
                  }}
                >
                  OR
                </Divider>
                <Button
                  color={"black"}
                  variant={"outlined"}
                  onClick={authCntxt.handleOpenCreate}
                >
                  Sign Up
                </Button>
              </Stack>
            </>
          )}
        </List>
        {authCntxt.isVerified && cartInfo.cartList?.length ? (
          <>
            <Stack
              direction={"row"}
              sx={{
                p: 2,
              }}
            >
              <Typography
                variant={"button"}
                sx={{
                  fontWeight: "bold",
                  flex: 1,
                }}
              >
                Subtotal
              </Typography>
              <Typography
                variant={"button"}
                sx={{
                  color: "#666",
                }}
              >
                {cartInfo.subtotalAmount} ৳
              </Typography>
            </Stack>
            <Button
              variant={"contained"}
              sx={{
                m: 2,
                mt: 0,
              }}
              color={"black"}
              disabled={!cartInfo.total}
              component={Link}
              to={"/process-order"}
              onClick={() => {
                onClose();
              }}
            >
              Order Now
            </Button>
          </>
        ) : (
          <></>
        )}
      </Drawer>
    </>
  );
};

export default CartDrawer;
