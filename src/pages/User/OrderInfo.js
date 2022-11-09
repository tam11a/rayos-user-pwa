import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
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
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { IoIosImages } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import snackContext from "../../context/snackProvider";
import { useGetProductsByOrderID } from "../../query/order";
import { getAttachment } from "../../service/instance";
import { FaFileInvoice, FaFileInvoiceDollar, FaPhoneAlt } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import { GrMail } from "react-icons/gr";
import Steppers from "./Steppers";
import OrderStatus from "../../components/OrderStatus";

const OrderInfo = () => {
  const snack = React.useContext(snackContext);
  const { oid } = useParams();
  const [params, setParams] = React.useState({
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data: orderInfo, isLoading } = useGetProductsByOrderID(oid, params);

  const [productInfo, setProductInfo] = React.useState([]);

  React.useEffect(() => {
    setProductInfo(orderInfo?.data?.data?.products || []);
  }, [isLoading]);
  console.log(productInfo);

  return (
    <>
      <Container>
        <Grid
          container
          sx={{
            mt: 2,
          }}
          rowGap={2}
          columnGap={2}
        >
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: "bold",
              }}
            >
              Order Track
            </Typography>
            <Paper
              elevation={0}
              sx={{
                boxShadow: {
                  xs: 0,
                  md: 5,
                },
                p: { xs: 0, md: 2 },
              }}
            >
              <Steppers timelines={orderInfo?.data?.data?.timeline || []} />
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              rowGap: 2,
              columnGap: 3,
              justifyContent: {
                xs: "center",
                md: "space-between",
              },
              my: 2,
            }}
          >
            <Grid item xs={12} md={7.55}>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                }}
              >
                Ordered Items
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
                {productInfo.map((prodItem) => {
                  return (
                    <ListItem
                      key={prodItem?.product?._id}
                      disablePadding
                      sx={{
                        px: 1,
                        pr: { xs: 1, md: 2 },
                        py: 0.5,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={getAttachment(prodItem?.product?.image)}
                          sx={{
                            borderRadius: 1,
                            height: "55px",
                            width: "55px",
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
                        sx={{
                          flex: 1,
                        }}
                        primary={
                          <>
                            <b>{prodItem?.product?.titleEn || "-"}</b>
                          </>
                        }
                        secondary={
                          <>
                            {prodItem?.product?.variantType}:{" "}
                            <span
                              style={{
                                fontWeight: 600,
                              }}
                            >
                              {prodItem?.variant?.titleEn || "-"}
                            </span>{" "}
                            &times;{" "}
                            <span
                              style={{
                                fontWeight: 600,
                              }}
                            >
                              {prodItem?.product?.sellPrice || 0}
                            </span>{" "}
                            ৳ &times;{" "}
                            <span
                              style={{
                                fontWeight: 600,
                              }}
                            >
                              {prodItem?.quantity || 0}
                            </span>{" "}
                          </>
                        }
                        primaryTypographyProps={{
                          noWrap: true,
                          sx: {
                            color: "black.main",
                            textDecoration: "none",
                          },
                          // component: Link,
                          // to: `/product/${cart?.variant?.product?._id}`,
                        }}
                        secondaryTypographyProps={{
                          noWrap: true,
                          sx: {
                            textDecoration: "none",
                            "& span": {
                              color: "black.main",
                            },
                          },
                          // component: Link,
                          // to: `/product/${cart?.variant?.product?._id}`,
                        }}
                      />
                      <Typography
                        variant="body1"
                        color={"black"}
                        sx={{
                          fontWeight: "bold",
                          minWidth: "15px",
                          textAlign: "center",
                        }}
                      >
                        {prodItem?.quantity * prodItem?.product?.sellPrice || 0}{" "}
                        ৳
                      </Typography>
                    </ListItem>
                  );
                })}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                }}
              >
                Shipping Information
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  boxShadow: {
                    xs: 0,
                    md: 5,
                  },
                  p: { xs: 0, md: 2 },
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
                  <Typography variant="button">Payment Method :</Typography>
                  <b>{orderInfo?.data?.data?.paymentMethod}</b>
                </Stack>
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
                  <Typography variant="button">Receiver Name :</Typography>
                  <b>{orderInfo?.data?.data?.shipping?.name || "-"}</b>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant="button">
                    Receiver Phone Number :
                  </Typography>
                  <b>{orderInfo?.data?.data?.shipping?.phone || "-"}</b>
                </Stack>
                <Stack
                  direction={{ xs: "row", md: "column" }}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  justifyContent={"space-between"}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant="button">Shipping Address :</Typography>
                  <b>{orderInfo?.data?.data?.shipping?.address || "-"}</b>
                </Stack>
              </Paper>

              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  mb: 1,
                  fontWeight: "bold",
                }}
              >
                Additional Information
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  // boxShadow: {
                  //   xs: 0,
                  //   md: 5,
                  // },
                  p: { xs: 0, md: 2 },
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
                  <Typography>
                    {orderInfo?.data?.data?.totalSellPrice || 0} ৳
                  </Typography>
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
                  <Typography>
                    {orderInfo?.data?.data?.shippingFee || 0} ৳
                  </Typography>
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
                  <Typography>
                    - {orderInfo?.data?.data?.discount || 0} ৳
                  </Typography>
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
                    <b>{orderInfo?.data?.data?.total || 0}</b> ৳
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OrderInfo;
