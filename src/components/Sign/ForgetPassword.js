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
import { requestOTP, resetPassword } from "../../query/sign";
import { responseHandler } from "../../utilities/response-handler";
import CInput from "./CInput";
import CPassword from "./CPassword";
import OTPDialog from "./OTPDialog";

const ForgetPassword = () => {
  const auth = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const [phone, setPhone] = React.useState();
  const [password, setPassword] = React.useState();

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onValid = async (e) => {
    const res = await responseHandler(() => requestOTP("88" + e.phone));
    if (res.status) {
      snack.createSnack(`Sent OTP to ${e.phone}`);
      setPhone(e.phone);
      return true;
    } else {
      snack.createSnack(res.data, "error");
      return false;
    }
  };

  const [openOTP, setOpenOTP] = React.useState(false);
  const handleOTP = () => setOpenOTP(!openOTP);

  const handleOTPSubmit = async (code) => {
    const res = await responseHandler(() =>
      resetPassword({
        phone: `88${phone}`,
        code,
        password,
      })
    );
    if (res.status) {
      snack.createSnack(res.data.msg);
      return true;
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  const {
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    register: registerPassword,
  } = useForm({
    resolver: joiResolver(passwordSchema),
  });

  const onValidPassword = (e) => {
    setPassword(e.password);
    auth.handleOpenForgetPassword();
    handleOTP();
  };

  React.useEffect(() => {
    if (!auth.openForgetPassword) return;
    reset();
    setPhone();
    setPassword();
  }, [auth.openForgetPassword]);

  return (
    <>
      <Dialog
        open={auth.openForgetPassword}
        onClose={auth.handleOpenForgetPassword}
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
          <Typography variant={"button"}>recover password</Typography>
          <IconButton size={"small"} onClick={auth.handleOpenForgetPassword}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <Divider />
        {phone ? (
          <>
            <form onSubmit={handleSubmitPassword(onValidPassword)}>
              <DialogContent
                sx={{
                  "& > *": {
                    my: 1,
                  },
                }}
              >
                <Typography variant={"button"}>
                  password <span>*</span>
                </Typography>
                <CPassword
                  fullWidth
                  placeholder="Enter Your Password"
                  {...registerPassword("password")}
                />
                {errorsPassword.password && (
                  <Alert severity="error">
                    {errorsPassword.password.message}
                  </Alert>
                )}
                <Typography variant={"button"}>
                  confirm password <span>*</span>
                </Typography>
                <CPassword
                  fullWidth
                  placeholder="Confirm Your Password"
                  {...registerPassword("confirm_password")}
                />
                {errorsPassword.confirm_password && (
                  <Alert severity="error">
                    {errorsPassword.confirm_password.message}
                  </Alert>
                )}
                <Button
                  fullWidth
                  color={"black"}
                  variant={"contained"}
                  type={"submit"}
                  sx={{
                    mt: 1,
                  }}
                >
                  Recover password
                </Button>
              </DialogContent>
            </form>
          </>
        ) : (
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

              <Button
                fullWidth
                color={"black"}
                variant={"contained"}
                type={"submit"}
                sx={{
                  mt: 1,
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending OTP" : "Send OTP"}
              </Button>
            </DialogContent>
          </form>
        )}
      </Dialog>
      {openOTP && (
        <OTPDialog
          open={openOTP}
          onClose={handleOTP}
          onSubmit={handleOTPSubmit}
          onResendOTP={async () => await onValid({ phone: phone })}
        />
      )}
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
});
const passwordSchema = Joi.object({
  password: Joi.string().label("Password").required().messages({
    "string.empty": "Password Required",
  }),
  confirm_password: Joi.equal(Joi.ref("password")).messages({
    "any.only": "Password Didn't Match!!",
  }),
});

export default ForgetPassword;
