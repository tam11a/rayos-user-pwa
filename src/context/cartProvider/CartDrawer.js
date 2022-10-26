import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
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
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import pndIcon from "../../assets/pnd-favicon.svg";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import LoadingDivider from "../../components/LoadingDivider";
import { IoIosImages } from "react-icons/io";
import { cartContext } from ".";

const CartDrawer = ({ open, onClose }) => {
  const cartInfo = React.useContext(cartContext);
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const [openOrderType, setOpenOrderType] = React.useState(false);
  const handleOpenOrderType = () => setOpenOrderType(!openOrderType);

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
                      src={getAttachment(cart.variant.product.image)}
                      sx={{
                        borderRadius: 1,
                        height: "70px",
                        width: "70px",
                        background: "transparent",
                        color: "primary.dark",
                        mr: 1,
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
                    primary={
                      <>
                        <b>{cart.variant.product.titleEn}</b>
                      </>
                    }
                    secondary={
                      <>
                        {cart.variant.product.variantType}:{" "}
                        <span
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          {cart.variant.titleEn}
                        </span>{" "}
                        <br />
                        <span
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          {cart.quantity}
                        </span>{" "}
                        Items &times;{" "}
                        <span
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          {cart.variant.product.sellPrice}
                        </span>{" "}
                        ৳
                      </>
                    }
                    primaryTypographyProps={{
                      noWrap: true,
                      sx: {
                        color: "black.main",
                      },
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
              onClick={() => {
                onClose();
                handleOpenOrderType();
              }}
            >
              Order Now
            </Button>
          </>
        ) : (
          <></>
        )}
      </Drawer>
      <Dialog
        open={openOrderType}
        onClose={handleOpenOrderType}
        PaperProps={{
          sx: {
            margin: "0",
            width: "95vw",
            maxWidth: "420px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <div /> */}
          <Typography variant={"button"}>Order Type</Typography>
          <IconButton size={"small"} onClick={handleOpenOrderType}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <ListItemButton
            sx={{
              boxShadow: 3,
            }}
            component={Link}
            to={"/order/pnd"}
            onClick={handleOpenOrderType}
          >
            <ListItemAvatar>
              <Avatar
                src={pndIcon}
                sx={{
                  width: "max-content",
                  p: 0.7,
                }}
                alt="pnd"
              />
            </ListItemAvatar>
            <ListItemText
              primary={"PND Service"}
              secondary={"PND Resellers & Users"}
              primaryTypographyProps={{
                noWrap: true,
              }}
              secondaryTypographyProps={{
                noWrap: true,
              }}
            />
            {/* <ListItemSecondaryAction> */}
            <IconButton>
              <FiArrowRight />
            </IconButton>
            {/* </ListItemSecondaryAction> */}
          </ListItemButton>
          <ListItemButton
            sx={{
              boxShadow: 3,
              mt: 1,
            }}
            component={Link}
            to={"/order/bi"}
            onClick={handleOpenOrderType}
            disabled
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  borderRadius: 1,
                }}
                alt={"bi"}
              />
            </ListItemAvatar>
            <ListItemText
              primary={"Brothers Importing"}
              secondary={"Brothers Importing Clients Wholesell"}
              primaryTypographyProps={{
                noWrap: true,
              }}
              secondaryTypographyProps={{
                noWrap: true,
              }}
            />
            {/* <ListItemSecondaryAction> */}
            <IconButton>
              <FiArrowRight />
            </IconButton>
            {/* </ListItemSecondaryAction> */}
          </ListItemButton>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{
              mt: 2,
              "& b, & svg": {
                color: "primary.main",
              },
              textDecoration: "none",
              color: "unset",
            }}
            component={Link}
            to={"/about"}
            onClick={handleOpenOrderType}
          >
            <BsFillQuestionCircleFill />
            <Typography variant={"caption"}>
              Learn more about <b>PND Service</b>.
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartDrawer;
