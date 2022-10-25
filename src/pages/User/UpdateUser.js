import { joiResolver } from "@hookform/resolvers/joi";
import {
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
import ShowErr from "../../components/ShowErr";
import CInput from "../../components/Sign/CInput";

const UpdateUser = ({ open, onClose }) => {
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
          <div />
          <Typography>Edit Profile</Typography>
          <IconButton size={"small"} onClick={onClose}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant={"button"}>fullname</Typography>
          <CInput
            fullWidth
            placeholder="Enter Your Name"
            {...register("fullName")}
          />
          <ShowErr obj={errors.fullName} />
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
          <ShowErr obj={errors.phone} />
          <Typography variant={"button"}>email</Typography>
          <CInput
            fullWidth
            placeholder="Enter Your Email"
            {...register("email")}
          />
          <ShowErr obj={errors.email} />

          <Button
            fullWidth
            variant={"contained"}
            type={"submit"}
            // onClick={auth.handleOpenOTP}
            color={"black"}
            disabled={isSubmitting}
            sx={{
              mt: 2,
            }}
          >
            update changes
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

const schema = Joi.object({
  fullName: Joi.string().label("Name").required().messages({
    "string.empty": "Name Required",
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

  email: Joi.string().label("email"),
});

export default UpdateUser;
