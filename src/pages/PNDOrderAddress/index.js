import {
  Button,
  Container,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CInput from "../../components/Sign/CInput";
import { TbCurrencyTaka } from "react-icons/tb";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import ShowErr from "../../components/ShowErr";
import { cartContext } from "../../context/cartProvider";
import { responseHandler } from "../../utilities/response-handler";
import { calculateOrder } from "../../query/cart";
import { objToFormData } from "../../utilities/json-form";
import { authContext } from "../../context/authProvider";
import snackContext from "../../context/snackProvider";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const authCntxt = React.useContext(authContext);
  const cartCntxt = React.useContext(cartContext);
  const snack = React.useContext(snackContext);
  const [paymentStatus, setPaymentStatus] = React.useState("NOT_PAID");
  const [shippingStatus, setShippingStatus] = React.useState("INSIDE");

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
  } = useForm({
    defaultValues: {
      payment_amount: 0,
      custom_shipping_fee: 60,
      payment_type: "NOT_PAID",
      shipping_type: "INSIDE",
    },
    // resolver: joiResolver(schema),
  });

  React.useEffect(() => {
    setValue("shipping_type", shippingStatus);
    setValue("payment_type", paymentStatus);
  }, [paymentStatus, shippingStatus]);

  const onValid = async (e) => {
    var tmpE = e;
    Object.values(cartCntxt.orderList)?.map((cart, index) => {
      tmpE = {
        ...tmpE,
        [`cart_info[${index}][id]`]: cart.id,
        [`cart_info[${index}][sell_price]`]: cart.sell_price,
        [`cart_info[${index}][quantity]`]: cart.quantity,
        [`cart_info[${index}][total_amount]`]:
          cart.total_amount_with_sell_price,
      };
    });
    const res = await responseHandler(() =>
      calculateOrder(
        objToFormData({
          ...tmpE,
          company_name: authCntxt.userInfo?.company_name,
          company_number: authCntxt.userInfo?.phone,
        })
      )
    );
    if (res.status) {
      snack.createSnack(res.msg);
      let dataToCheckout = {
        ...res.data.value,
        shipping_total_cost: res.data.value.shipping_cost,
        pnd_total_fee: res.data.value.pnd_fee,
        user_id: authCntxt.userId,
      };
      delete dataToCheckout["pnd_fee"];
      delete dataToCheckout["shipping_cost"];
      // delete dataToCheckout["shipping_type"];
      sessionStorage.setItem("pnd_checkout", JSON.stringify(dataToCheckout));
      navigate("../checkout", { replace: true });
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  return (
    <>
      <Container
        sx={{
          pb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mt: { xs: 0, md: 2 },
            mb: 1,
            fontWeight: "bold",
          }}
        >
          Information Form
        </Typography>
        <Divider
          sx={{
            mb: 2,
          }}
        />
        <Stack
          direction={"column"}
          rowGap={1}
          component={"form"}
          onSubmit={handleSubmit(onValid)}
        >
          <Typography variant="button">Recipient Name *</Typography>
          <CInput
            placeholder="Recipient Name"
            fullWidth
            {...register("receiver_name")}
          />
          <ShowErr obj={errors.receiver_name} />
          <Typography variant="button">Recipient Number *</Typography>
          <CInput
            placeholder="01****"
            fullWidth
            startAdornment={
              <Typography
                sx={{
                  mr: 1,
                }}
              >
                +88
              </Typography>
            }
            inputProps={{
              type: "tel",
            }}
            {...register("receiver_number")}
          />
          <ShowErr obj={errors.receiver_number} />
          <Typography variant="button">Recipient Address *</Typography>
          <CInput
            placeholder="Recipient Address"
            fullWidth
            {...register("receiver_address")}
          />
          <ShowErr obj={errors.receiver_address} />
          <Stack direction={"row"}>
            <Typography variant="button">Shipping Fee *</Typography>
            {/* <Typography variant="button">Customised Shipping Fee *</Typography> */}
          </Stack>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            rowGap={1}
            columnGap={1}
          >
            <Select
              size="small"
              value={shippingStatus}
              onChange={(e) => {
                setShippingStatus(e.target.value);
                switch (e.target.value) {
                  case "INSIDE":
                    setValue("custom_shipping_fee", 60);
                    break;
                  case "SUBAREA":
                    setValue("custom_shipping_fee", 110);
                    break;
                  case "OUTSIDE":
                    setValue("custom_shipping_fee", 130);
                    break;
                }
              }}
              input={
                <CInput
                  sx={{
                    width: {
                      sm: "100%",
                      md: "unset",
                    },
                  }}
                />
              }
              //   {...register("shipping_type")}
            >
              <MenuItem value={"INSIDE"}>Inside Dhaka</MenuItem>
              <MenuItem value={"SUBAREA"}>Dhaka Subarea</MenuItem>
              <MenuItem value={"OUTSIDE"}>Outside Dhaka</MenuItem>
            </Select>
            <CInput
              placeholder="Custom Shipping Fee"
              endAdornment={<TbCurrencyTaka />}
              sx={{
                width: {
                  sm: "100%",
                  md: "unset",
                },
              }}
              inputProps={{
                type: "tel",
              }}
              {...register("custom_shipping_fee")}
            />
          </Stack>
          <ShowErr obj={errors.shipping_type} />
          <ShowErr obj={errors.custom_shipping_fee} />
          <Typography variant="button">Payment Status *</Typography>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            rowGap={1}
            columnGap={1}
          >
            <Select
              size="small"
              value={paymentStatus}
              onChange={(e) => {
                setPaymentStatus(e.target.value);
                setValue("payment_amount", 0);
              }}
              input={
                <CInput
                  sx={{
                    width: {
                      sm: "100%",
                      md: "unset",
                    },
                  }}
                />
              }
              //   {...register("payment_type")}
            >
              <MenuItem value={"NOT_PAID"}>Not Paid</MenuItem>
              <MenuItem value={"PARTIAL_PAID"}>Partially Paid</MenuItem>
              <MenuItem value={"PAID"}>Paid</MenuItem>
            </Select>
            {paymentStatus === "PARTIAL_PAID" && (
              <CInput
                placeholder="Paid Amount"
                endAdornment={<TbCurrencyTaka />}
                sx={{
                  width: {
                    sm: "100%",
                    md: "unset",
                  },
                }}
                inputProps={{
                  type: "tel",
                }}
                {...register("payment_amount")}
              />
            )}
          </Stack>
          <ShowErr obj={errors.payment_type} />
          <ShowErr obj={errors.payment_amount} />
          <Typography variant="button">Comment</Typography>
          <CInput
            placeholder="Comment"
            fullWidth
            multiline
            minRows={4}
            maxRows={4}
            {...register("comment")}
          />
          <ShowErr obj={errors.comment} />
          <Button
            variant={"contained"}
            color={"black"}
            sx={{
              mt: 3,
              width: {
                md: "fit-content",
              },
            }}
            type={"submit"}
            disabled={isSubmitting}
          >
            Proceed to Checkout
          </Button>
        </Stack>
      </Container>
    </>
  );
};

const schema = Joi.object({
  receiver_name: Joi.string().required().label("Receipent Name").messages({
    "string.empty": "Receipent Name Required",
  }),
  receiver_number: Joi.string()
    .replace("+88", "")
    .replace(" ", "")
    .replace("-", "")
    .label("Receipent Phone Number")
    .regex(/01\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid Phone Number",
      "string.empty": "Receipent Phone Number Required",
    }),
  receiver_address: Joi.string()
    .required()
    .label("Receipent Address")
    .messages({
      "string.empty": "Receipent Address Required",
    }),
  shipping_type: Joi.string(),
  custom_shipping_fee: Joi.number().label("Shipping Fee").required().messages({
    "string.empty": "Shipping Fee Required",
  }),
  payment_type: Joi.string(),
  payment_amount: Joi.alternatives().conditional("payment_type", {
    is: "PARTIAL_PAID",
    then: Joi.number().label("Paid Amount").required().messages({
      "string.empty": "Paid Amount is Required for Partially Paid Order",
    }),
    otherwise: Joi.number().label("Paid Amount"),
  }),
  comment: Joi.string().allow(""),
});
export default Index;
