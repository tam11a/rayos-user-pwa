import { joiResolver } from "@hookform/resolvers/joi";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import CPassword from "../../components/Sign/CPassword";

const UpdatePassword = ({ open, onClose }) => {
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({ resolver: joiResolver(schema) });
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "95vw",
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Reset Password</Typography>
          <IconButton size={"small"} onClick={onClose}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant={"button"}>current password</Typography>
          <CPassword
            fullWidth
            placeholder="Enter Your Password"
            {...register("password")}
          />
          {errors.password && (
            <Alert severity="error">{errors.password.message}</Alert>
          )}
          <Typography variant={"button"}>new password</Typography>
          <CPassword
            fullWidth
            placeholder="Enter New Password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <Alert severity="error">{errors.newPassword.message}</Alert>
          )}
          <Typography variant={"button"}>confirm password</Typography>
          <CPassword
            fullWidth
            placeholder="Confirm New Password"
            {...register("confirm_password")}
          />
          {errors.confirm_password && (
            <Alert severity="error">{errors.confirm_password.message}</Alert>
          )}

          <Button
            fullWidth
            variant={"contained"}
            type={"submit"}
            // onClick={auth.handleOpenOTP}
            color={"black"}
            disabled={isSubmitting}
            sx={{
              mt: 1,
            }}
          >
            update password
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

const schema = Joi.object({
  password: Joi.string().label("Password").required().messages({
    "string.empty": "Password Required",
  }),
  newPassword: Joi.string().label("Password").required().messages({
    "string.empty": "Password Required",
  }),
  confirm_password: Joi.equal(Joi.ref("newPassword")).messages({
    "any.only": "Password Didn't Match!!",
  }),
});

export default UpdatePassword;
