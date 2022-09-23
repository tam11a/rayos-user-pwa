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
import { signIn } from "../../query/sign";
import { responseHandler } from "../../utilities/response-handler";
import CInput from "./CInput";
import CPassword from "./CPassword";
import SignUp from "./SignUp";
import { joiResolver } from "@hookform/resolvers/joi";
import ForgetPassword from "./ForgetPassword";

const SignIn = () => {
  const auth = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({ resolver: joiResolver(schema) });

  const onValid = async (data) => {
    const res = await responseHandler(() =>
      signIn({
        ...data,
        phone: "88" + data.phone,
      })
    );
    if (res.status) {
      // console.log(res);
      auth.setToken(res.data.value.access_token);
      snack.createSnack("Login Successfull!");
      reset();
      auth.handleOpen();
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  return (
    <>
      <Dialog
        open={auth.open}
        onClose={auth.handleOpen}
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
          <Typography variant={"button"}>sign in</Typography>
          <IconButton size={"small"} onClick={auth.handleOpen}>
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
            }}
          >
            <Typography variant={"button"}>phone number</Typography>
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
            {errors.phone && (
              <Alert severity="error">{errors.phone.message}</Alert>
            )}
            <Typography variant={"button"}>password</Typography>
            <CPassword
              fullWidth
              placeholder="Enter Your Password"
              {...register("password")}
            />
            {errors.password && (
              <Alert severity="error">{errors.password.message}</Alert>
            )}
            <Button
              sx={{
                float: "right",
                mb: 1,
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
              disableRipple
              onClick={auth.handleOpenForgetPassword}
            >
              forget password ?
            </Button>
            <Button
              fullWidth
              color={"black"}
              variant={"contained"}
              type={"submit"}
              disabled={isSubmitting}
            >
              sign in
            </Button>
            <Divider
              sx={{
                my: 1,
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
              onClick={auth.handleOpenCreate}
            >
              Create New Account ?
            </Button>
          </DialogContent>
        </form>
      </Dialog>
      <SignUp />
      <ForgetPassword />
    </>
  );
};

const schema = Joi.object({
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
});

export default SignIn;
