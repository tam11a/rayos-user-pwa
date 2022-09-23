import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";
import { authContext } from "../../context/authProvider";
import CInput from "./CInput";
import CPassword from "./CPassword";

import { MdRefresh } from "react-icons/md";
import AuthCode from "react-auth-code-input";

const OTPDialog = ({ open, onClose, onSubmit, onResendOTP }) => {
  const [timer, setTimer] = React.useState("60s");
  const [trigger, setTrigger] = React.useState(false);
  var interval;
  React.useEffect(() => {
    if (!trigger) {
      if (interval) {
        clearInterval(interval);
      }
      var duration = 59;
      interval = setInterval(function () {
        if (duration > 0) {
          setTimer(duration + "s");
          duration -= 1;
        } else {
          setTimer("60s");
          clearInterval(interval);
          setTrigger(true);
        }
      }, 1000);
    }
  }, [trigger]);

  const handleTrigger = async () => {
    if (await onResendOTP()) setTrigger(false);
  };

  const handleOnChange = async (res) => {
    if (res.length === 6) {
      const subResponse = await onSubmit(res);
      if (subResponse) onClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
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
          <Typography variant={"button"}>Verify Your Account</Typography>
          <IconButton size={"small"} onClick={onClose}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            "& > *": {
              my: 1,
            },
          }}
        >
          <Typography variant={"subtitle2"}>
            A verification code has been sent to{" "}
            {sessionStorage.getItem("sotp") || "your phone number"}.
          </Typography>
          <Box
            sx={{
              my: 2,
              display: "flex",
              justifyContent: "center",
              "& input": {
                p: 0,
                width: "2.4rem",
                aspectRatio: "1/1",
                // fontFamily: theme.typography.fontFamily,
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "center",
                outlineColor: "primary.dark",
                MozAppearance: "textfield",
                mx: 0.2,
              },
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  WebkitAppearance: "none",
                  m: 0,
                },
            }}
          >
            <AuthCode
              allowedCharacters="numeric"
              onChange={handleOnChange}
              autoFocus
            />
          </Box>
          {trigger ? (
            <Button
              sx={{
                float: "right",
                mb: 1,
                borderRadius: "100px",
              }}
              variant={"contained"}
              size={"small"}
              startIcon={<MdRefresh />}
              color={"black"}
              onClick={handleTrigger}
            >
              resend otp
            </Button>
          ) : (
            <Typography
              variant={"overline"}
              sx={{
                float: "right",
                textTransform: "unset",
                color: "black.main",
                mb: 1,
              }}
            >
              Resend OTP in {timer}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OTPDialog;
