import {
  Alert,
  Avatar,
  Badge,
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { BiShowAlt } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import CInput from "../../components/Sign/CInput";
import { cartContext } from "../../context/cartProvider";
import noProduct from "../../assets/3298065 1.svg";
import { TbCurrencyTaka } from "react-icons/tb";
import { rootURL } from "../../service/instance";
import snackContext from "../../context/snackProvider";
import { responseHandler } from "../../utilities/response-handler";
import { useDeleteCart } from "../../query/cart";
import { MdClose, MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const Index = () => {
  const cartCntxt = React.useContext(cartContext);

  return (
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
            <List>
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
                  <Button
                    color={"warning"}
                    variant={"contained"}
                    size={"small"}
                    sx={{
                      // float: { xs: "right", md: "left" },
                      ml: { xs: 0, md: 1 },
                      mt: { xs: 2, md: 1 },
                    }}
                    startIcon={<MdOutlineAddShoppingCart />}
                    component={Link}
                    to={"/search"}
                  >
                    Continue Shopping
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </List>
          </Paper>
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
            Cart Totals
          </Typography>
          <Divider
            sx={{
              mb: 1,
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
            <Typography>{cartCntxt.subtotalAmount} ৳</Typography>
          </Stack>
          {/* <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="button">Others :</Typography>
            <Typography>0 ৳</Typography>
          </Stack> */}
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
          <Button
            variant={"contained"}
            color={"black"}
            disabled={!cartCntxt.total}
            fullWidth
            component={Link}
            to={"address"}
            onClick={() => cartCntxt.saveOL()}
          >
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export const ProductItem = ({ cart, onlyRead }) => {
  const cartCntxt = React.useContext(cartContext);

  const snack = React.useContext(snackContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [colors, setColors] = React.useState(JSON.parse(cart.cart_info).color);

  const { mutateAsync: deleteCart, isLoading } = useDeleteCart();
  const onDeleteCart = async () => {
    const res = await responseHandler(() =>
      deleteCart({
        cartId: cart.id,
      })
    );
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  return (
    <ListItem
      sx={{
        position: "relative",
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={rootURL + cart.product.photo}
          sx={{
            borderRadius: 1,
            border: "1px solid",
            borderColor: "#00000033",
          }}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{
          flex: {
            xs: 1,
            sm: 0.5,
          },
        }}
        primary={cart.product.title_en}
        secondary={
          <>
            <b>{cart.quantity}</b> Items &times; <b>{cart.price} ৳</b>
          </>
        }
        primaryTypographyProps={{
          noWrap: true,
        }}
        secondaryTypographyProps={{
          noWrap: true,
          sx: {
            "& b": {
              color: "black.main",
            },
          },
        }}
        onClick={handleOpen}
      />
      <Hidden smDown>
        <Divider
          orientation="vertical"
          sx={{
            height: "36px",
            borderWidth: 1,
            mx: 1,
          }}
        />
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          sx={{
            flex: 1,
            rowGap: 1,
            columnGap: 1,
          }}
        >
          {Object.keys(colors)?.map((color) => (
            <Chip
              key={color}
              label={
                <>
                  {color} &times; {colors[color]}
                </>
              }
              size={"small"}
              onClick={handleOpen}
            />
          ))}
        </Stack>
      </Hidden>

      <Divider
        orientation="vertical"
        sx={{
          height: "36px",
          borderWidth: 1,
          mx: 1,
        }}
      />
      {onlyRead ? (
        <>
          <ListItemText
            sx={{
              flex: "unset",
            }}
            primary={"Selling Price"}
            secondary={
              <>
                <b>{cart.sell_price} ৳</b>
              </>
            }
            primaryTypographyProps={{
              noWrap: true,
              sx: {
                fontSize: "0.8rem",
                textAlign: "right",
              },
            }}
            secondaryTypographyProps={{
              noWrap: true,
              sx: {
                textAlign: "right",
                "& b": {
                  color: "black.main",
                },
              },
            }}
          />
        </>
      ) : (
        <>
          <Stack direction={"column"}>
            <Typography
              variant={"caption"}
              sx={{
                color: "#666",
              }}
            >
              Selling Price
            </Typography>
            <CInput
              size="small"
              sx={{
                width: "80px",
                height: "30px",
                px: 1,
              }}
              inputProps={{
                type: "tel",
              }}
              endAdornment={<TbCurrencyTaka />}
              defaultValue={
                cartCntxt.orderList[cart.id].sell_price || cart.price
              }
              onChange={(e) => {
                cartCntxt.updateCartFromOrderList(cart.id, {
                  sell_price: parseFloat(e.target.value),
                  total_amount_with_sell_price:
                    parseFloat(e.target.value) * parseFloat(cart.quantity),
                });
              }}
            />
          </Stack>
          <Divider
            orientation="vertical"
            sx={{
              height: "36px",
              borderWidth: 1,
              mx: 1,
            }}
          />
          <Stack direction={"row"}>
            {/* <Hidden smUp>
          <IconButton size={"small"}>
            <BiShowAlt />
          </IconButton>
        </Hidden> */}
            {/* <IconButton size={"small"} onClick={handleOpen}>
          <FiEdit2 />
        </IconButton> */}
            <IconButton
              size={"small"}
              disabled={isLoading}
              onClick={onDeleteCart}
            >
              <RiDeleteBinLine />
            </IconButton>
          </Stack>
        </>
      )}
      <UpdateCartProductDialog
        open={open}
        handleOpen={handleOpen}
        cart={cart}
        colors={colors}
        setColors={setColors}
      />
    </ListItem>
  );
};

const UpdateCartProductDialog = ({
  open,
  handleOpen,
  cart,
  colors,
  setColors,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleOpen}
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
        <Typography variant={"button"}>{cart.product.title_en}</Typography>
        <IconButton size={"small"} onClick={handleOpen}>
          <MdClose />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          p: 0,
          pb: 1.5,
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
              <TableCell
                align="center"
                // colSpan={2}
              >
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(colors)?.map((color) => (
              <React.Fragment key={cart.product.id + color}>
                <TableRow>
                  <TableCell align="center">{color}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "800",
                    }}
                  >
                    {colors[color]}
                  </TableCell>
                  {/* <TableCell align="center">
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
                              </TableCell> */}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
