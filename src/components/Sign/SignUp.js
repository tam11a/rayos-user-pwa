import { joiResolver } from "@hookform/resolvers/joi";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { authContext } from "../../context/authProvider";
import snackContext from "../../context/snackProvider";
import { requestSignUp, signUp } from "../../query/sign";
import { responseHandler } from "../../utilities/response-handler";
import ShowErr from "../ShowErr";
import CInput from "./CInput";
import CPassword from "./CPassword";
import OTPDialog from "./OTPDialog";

const SignUp = () => {
  const auth = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const [phone, setPhone] = React.useState();
  const [signData, setSignData] = React.useState();

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({ resolver: joiResolver(schema) });

  const onResend = async (e) => {
    const res = await responseHandler(() => requestSignUp("88" + e.phone));
    if (res.status) {
      snack.createSnack(`Resent OTP to ${e.phone}`);
      return true;
    } else {
      snack.createSnack(res.data, "error");
      return false;
    }
  };

  const onValid = async (e) => {
    const res = await responseHandler(() => requestSignUp("88" + e.phone));
    if (res.status) {
      snack.createSnack(`Sent OTP to ${e.phone}`);
      delete e.confirm_password;
      setPhone(e.phone);
      setSignData(e);
      auth.handleOpenCreate();
      handleOTP();
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  const [openOTP, setOpenOTP] = React.useState(false);
  const handleOTP = () => setOpenOTP(!openOTP);

  const handleOTPSubmit = async (code) => {
    const res = await responseHandler(() =>
      signUp({
        ...signData,
        phone: "88" + signData.phone,
        code,
        channel: "phone",
      })
    );
    if (res.status) {
      snack.createSnack(res.data.msg);
      return true;
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  return (
    <>
      <Dialog
        open={auth.openCreate}
        onClose={auth.handleOpenCreate}
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
          <div />
          <Typography variant={"button"}>create new account</Typography>
          <IconButton size={"small"} onClick={auth.handleOpenCreate}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit(onValid)}>
          <DialogContent
            sx={{
              "& > *": {
                my: 1,
              },
              ".MuiTypography-root span": {
                color: "red",
                fontSize: "1rem",
              },
            }}
          >
            <Typography variant={"button"}>
              name <span>*</span>
            </Typography>
            <CInput
              fullWidth
              placeholder="Enter Your Name"
              {...register("full_name")}
            />
            <ShowErr obj={errors.full_name} />
            <Typography variant={"button"}>Company or Page Name</Typography>
            <CInput
              fullWidth
              placeholder="Enter Your Company or Page Name"
              {...register("company_name")}
            />
            <ShowErr obj={errors.company_name} />
            <Typography variant={"button"}>Company or Page URL</Typography>
            <CInput
              fullWidth
              placeholder="Enter Your Company or Page Website Link"
              {...register("company_link")}
            />
            <ShowErr obj={errors.company_link} />
            <Typography variant={"button"}>
              Address <span>*</span>
            </Typography>
            <CInput
              fullWidth
              placeholder="Enter Your Address"
              {...register("address")}
            />
            <ShowErr obj={errors.address} />
            <Typography variant={"button"}>
              phone number <span>*</span>
            </Typography>
            <CInput
              fullWidth
              placeholder="01****"
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
              {...register("phone")}
            />
            <ShowErr obj={errors.phone} />
            <Typography variant={"button"}>
              password <span>*</span>
            </Typography>
            <CPassword
              fullWidth
              placeholder="Enter Your Password"
              {...register("password")}
            />
            <ShowErr obj={errors.password} />
            <Typography variant={"button"}>
              confirm password <span>*</span>
            </Typography>
            <CPassword
              fullWidth
              placeholder="Confirm Your Password"
              {...register("confirm_password")}
            />
            <ShowErr obj={errors.confirm_password} />
            <Button
              fullWidth
              variant={"contained"}
              type={"submit"}
              // onClick={auth.handleOpenOTP}
              color={"black"}
              disabled={isSubmitting}
            >
              create account
            </Button>
            <Divider
              sx={{
                mt: 0.6,
              }}
            >
              OR
            </Divider>
            <Button
              sx={{
                textAlign: "center",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
              fullWidth
              disableRipple
              onClick={auth.handleOpen}
            >
              Already Have an Account ?
            </Button>
          </DialogContent>
        </form>
      </Dialog>
      {openOTP && (
        <OTPDialog
          open={openOTP}
          onClose={handleOTP}
          onSubmit={handleOTPSubmit}
          onResendOTP={async () => await onResend({ phone: phone })}
        />
      )}
    </>
  );
};

const schema = Joi.object({
  full_name: Joi.string().label("Name").required().messages({
    "string.empty": "Name Required",
  }),
  address: Joi.string().label("Address").required().messages({
    "string.empty": "Address Required",
  }),
  company_name: Joi.string().label("Company Name").allow(""),
  company_link: Joi.string()
    .label("Company Link")
    .allow("")
    .regex(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
    .messages({
      "string.pattern.base": "Invalid URL",
    }),
  phone: Joi.string()
    .replace("+88", "")
    .replace(" ", "")
    .replace("-", "")
    .label("Phone Number")
    .regex(/01\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid Phone Number",
      "string.empty": "Phone Number Required",
    }),
  password: Joi.string().label("Password").required().messages({
    "string.empty": "Password Required",
  }),
  confirm_password: Joi.equal(Joi.ref("password")).messages({
    "any.only": "Password Didn't Match!!",
  }),
});

export default SignUp;
