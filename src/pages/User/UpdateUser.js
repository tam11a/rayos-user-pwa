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
import LoadingDivider from "../../components/LoadingDivider";
import ShowErr from "../../components/ShowErr";
import CInput from "../../components/Sign/CInput";
import { authContext } from "../../context/authProvider";
import snackContext from "../../context/snackProvider";
import { useUpdateUserProfile } from "../../query/sign";
import { responseHandler } from "../../utilities/response-handler";

const UpdateUser = ({ open, onClose }) => {
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const { mutateAsync: updateUserProfile, isLoading } = useUpdateUserProfile();

  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      userName: authCntxt.userInfo?.userName,
      fullName: authCntxt.userInfo?.fullName,
      email: authCntxt.userInfo?.email,
    },
  });

  const onValid = async (data) => {
    const res = await responseHandler(() => updateUserProfile(data), [201]);
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  React.useEffect(
    () =>
      reset({
        userName: authCntxt.userInfo?.userName,
        fullName: authCntxt.userInfo?.fullName,
        email: authCntxt.userInfo?.email,
      }),
    [open]
  );

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
        <LoadingDivider isLoading={isLoading} />
        <form onSubmit={handleSubmit(onValid)}>
          <DialogContent
            sx={{
              "& > *": {
                my: 1,
              },
            }}
          >
            <Typography variant={"button"}>Username</Typography>
            <CInput
              fullWidth
              placeholder="Enter Username"
              {...register("userName")}
            />
            <ShowErr obj={errors.userName} />
            <Typography variant={"button"}>fullname</Typography>
            <CInput
              fullWidth
              placeholder="Enter Name"
              {...register("fullName")}
            />
            <ShowErr obj={errors.fullName} />

            <Typography variant={"button"}>email</Typography>
            <CInput
              fullWidth
              placeholder="you@example.com"
              {...register("email")}
            />
            <ShowErr obj={errors.email} />

            <Button
              fullWidth
              variant={"contained"}
              type={"submit"}
              color={"black"}
              disabled={isLoading}
            >
              update changes
            </Button>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

const schema = Joi.object({
  userName: Joi.string().label("Username").required().messages({
    "string.empty": "Username Required",
  }),
  fullName: Joi.string().label("Name").required().messages({
    "string.empty": "Name Required",
  }),
  email: Joi.string().label("email"),
});

export default UpdateUser;
