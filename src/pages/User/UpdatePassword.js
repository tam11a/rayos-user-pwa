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
import LoadingDivider from "../../components/LoadingDivider";
import ShowErr from "../../components/ShowErr";
import CPassword from "../../components/Sign/CPassword";

const UpdatePassword = ({ open, onClose }) => {
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({ resolver: joiResolver(schema) });

  React.useEffect(() => reset(), [open]);

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
            flexDirectin: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div />
          <Typography>Reset Password</Typography>
          <IconButton size={"small"} onClick={onClose}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <LoadingDivider />
        <form onSubmit={handleSubmit()}>
          <DialogContent
            sx={{
              "& > *": {
                my: 1,
              },
            }}
          >
            <Typography variant={"button"}>current password</Typography>
            <CPassword
              fullWidth
              placeholder="Enter Your Password"
              {...register("password")}
            />

            <ShowErr obj={errors.password} />
            <Typography variant={"button"}>new password</Typography>
            <CPassword
              fullWidth
              placeholder="Enter New Password"
              {...register("newPassword")}
            />
            <ShowErr obj={errors.newPassword} />

            <Typography variant={"button"}>confirm password</Typography>
            <CPassword
              fullWidth
              placeholder="Confirm New Password"
              {...register("confirm_password")}
            />
            <ShowErr obj={errors.confirm_password} />

            <Button
              fullWidth
              variant={"contained"}
              type={"submit"}
              color={"black"}
              disabled={isSubmitting}
              sx={{
                mt: 1,
              }}
            >
              update password
            </Button>
          </DialogContent>
        </form>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

const schema = Joi.object({
  password: Joi.string().label("Password").required().messages({
    "string.empty": "Current Password Required",
  }),
  newPassword: Joi.string().label("New Password").required().messages({
    "string.empty": "New Password Required",
  }),
  confirm_password: Joi.equal(Joi.ref("newPassword")).messages({
    "any.only": "Password Didn't Match!!",
  }),
});

export default UpdatePassword;
