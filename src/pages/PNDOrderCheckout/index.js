import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { ProductItem } from "../PNDOrder";
import { HiLocationMarker } from "react-icons/hi";
import { MdOutlineCall, MdPersonPin } from "react-icons/md";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import { createOrder } from "../../query/cart";
import { useNavigate } from "react-router-dom";
import { BiComment } from "react-icons/bi";
import { useQueryClient } from "react-query";
import orderContext from "../../context/orderProvider";

const Index = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const snack = React.useContext(snackContext);
  const { popCongratulations } = React.useContext(orderContext);
  const [checkoutData] = React.useState(
    JSON.parse(sessionStorage.getItem("pnd_checkout"))
  );
  const [pnd_shipping_fee, setPNDShippingFee] = React.useState(0);
  React.useEffect(() => {
    if (!checkoutData) return;
    setPNDShippingFee(
      checkoutData.shipping_type === "INSIDE"
        ? 60
        : checkoutData.shipping_type === "SUBAREA"
        ? 110
        : checkoutData.shipping_type === "OUTSIDE"
        ? 130
        : 0
    );
  }, [checkoutData]);
  //   console.log(checkoutData);

  const onSubmit = async () => {
    const res = await responseHandler(() => createOrder(checkoutData));
    if (res.status) {
      queryClient.invalidateQueries("get-cart-by-user");
      snack.createSnack(res.msg);
      sessionStorage.removeItem("orderList");
      sessionStorage.removeItem("pnd_checkout");
      popCongratulations();
      navigate("/user/order", { replace: true });
    } else {
      snack.createSnack(res.data, "error");
    }
  };
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
              {checkoutData.all_carts?.map((cart) => (
                <React.Fragment key={cart.id}>
                  <ProductItem cart={cart} onlyRead={true} />
                </React.Fragment>
              ))}
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
            Shipping &amp; Billing
          </Typography>
          <Divider
            sx={{
              mb: 1,
            }}
          />
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            sx={{
              width: "100%",
              my: 1,
            }}
            spacing={1}
          >
            <IconButton size={"small"} color={"primary"}>
              <MdPersonPin />
            </IconButton>
            <Typography>{checkoutData.receiver_name}</Typography>
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            sx={{
              width: "100%",
              my: 1,
            }}
            spacing={1}
          >
            <IconButton size={"small"} color={"primary"}>
              <MdOutlineCall />
            </IconButton>
            <Typography>{checkoutData.receiver_number}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            sx={{
              width: "100%",
              my: 1,
            }}
            spacing={1}
          >
            <IconButton size={"small"} color={"primary"}>
              <HiLocationMarker />
            </IconButton>
            <Typography>{checkoutData.receiver_address}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            sx={{
              width: "100%",
              my: 1,
            }}
            spacing={1}
          >
            <IconButton size={"small"} color={"primary"}>
              <BiComment />
            </IconButton>
            <Typography>{checkoutData.comment || "No Comment!"}</Typography>
          </Stack>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              mt: 3,
              fontWeight: "bold",
            }}
          >
            Order Summary
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
            <Typography variant="button">product price :</Typography>
            <Typography>{checkoutData.total_amount} ৳</Typography>
          </Stack>
          {/* <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="button">subtotal price :</Typography>
            <Typography>{checkoutData.sub_total} ৳</Typography>
          </Stack> */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="button">delivery fee :</Typography>
            <Typography>{checkoutData.shipping_total_cost || 0} ৳</Typography>
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
            }}
          >
            <Typography
              variant="button"
              sx={{
                fontWeight: "bold",
              }}
            >
              total :
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {parseFloat(checkoutData.total_amount) +
                parseFloat(checkoutData.shipping_total_cost) || 0}{" "}
              ৳
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
            <Typography variant="button">paid amount :</Typography>
            <Typography>{checkoutData.paid_amount || 0} ৳</Typography>
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
            }}
          >
            <Typography variant="button">total due :</Typography>
            <Typography>
              {parseFloat(checkoutData.total_amount) +
                parseFloat(checkoutData.shipping_total_cost) -
                parseFloat(checkoutData.paid_amount) || 0}{" "}
              ৳
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
            <Typography
              variant="button"
              sx={{
                fontWeight: "bold",
              }}
            >
              pnd fee :
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {checkoutData.pnd_total_fee} ৳
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
            }}
          >
            <Typography variant="button">your profit :</Typography>
            <Typography>
              {parseFloat(checkoutData.total_amount) +
                parseFloat(checkoutData.shipping_total_cost) -
                parseFloat(checkoutData.sub_total) -
                parseFloat(pnd_shipping_fee) -
                parseFloat(checkoutData.pnd_total_fee)}{" "}
              ৳
            </Typography>
          </Stack>
          {(parseFloat(checkoutData.paid_amount) || 0) -
            (parseFloat(checkoutData.total_amount) +
              parseFloat(checkoutData.shipping_total_cost) -
              parseFloat(checkoutData.sub_total) -
              parseFloat(pnd_shipping_fee) -
              parseFloat(checkoutData.pnd_total_fee)) >
            0 && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                width: "100%",
                color: "red",
              }}
            >
              <Typography variant="button">You need to pay :</Typography>
              <Typography>
                {(parseFloat(checkoutData.paid_amount) || 0) -
                  (parseFloat(checkoutData.total_amount) +
                    parseFloat(checkoutData.shipping_total_cost) -
                    parseFloat(checkoutData.sub_total) -
                    parseFloat(pnd_shipping_fee) -
                    parseFloat(checkoutData.pnd_total_fee))}{" "}
                ৳
              </Typography>
            </Stack>
          )}
          <Button
            sx={{
              my: 2,
            }}
            variant={"contained"}
            color={"black"}
            onClick={onSubmit}
            fullWidth
          >
            Confirm Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
