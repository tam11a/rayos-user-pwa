import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { authContext } from "../../context/authProvider";

import notFound from "../../assets/undraw_mobile_login_re_9ntv.svg";
import { getAttachment } from "../../service/instance";
import { Icon } from "@iconify/react";
import { FaPhoneAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { GrMail } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { useUpdateUserPassword, useUpdateUserProfile } from "../../query/sign";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import UpdateUser from "./UpdateUser";
import { postAttachments } from "../../query/attachment";
import { MdLogout } from "react-icons/md";

const Index = () => {
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  // const { register, setValue, handleSubmit } = useForm();

  // React.useEffect(() => {
  //   if (!Object.keys(authCntxt.userInfo).length) return;
  //   // console.log(authCntxt.userInfo);
  //   setValue("user_id", authCntxt.userInfo.user_id);
  //   setValue("full_name", authCntxt.userInfo.full_name);
  //   setValue("company_name", authCntxt.userInfo.company_name);
  //   setValue("phone", authCntxt.userInfo.phone);
  //   setValue("address", authCntxt.userInfo.address);
  //   if (authCntxt.userInfo.info) {
  //     let additionalInfo = JSON.parse(authCntxt.userInfo.info);
  //     setValue("cc", additionalInfo.cc);
  //     setValue("bkash", additionalInfo.bkash);
  //     setValue("company_link", additionalInfo.company_link);
  //   }
  // }, [authCntxt.userInfo]);

  // const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  // const updateHandler = async (e) => {
  //   let info = {
  //     bkash: e.bkash,
  //     cc: e.cc,
  //     company_link: e.company_link,
  //   };
  //   delete e.phone;
  //   delete e.bkash;
  //   delete e.company_link;
  //   delete e.cc;
  //   e = {
  //     ...e,
  //     info: JSON.stringify(JSON.stringify(info)),
  //   };
  //   const res = await responseHandler(() =>
  //     updateUserProfile(objToFormData(e))
  //   );
  //   if (res.status) {
  //     snack.createSnack(res.msg);
  //   } else {
  //     snack.createSnack(res.data, "error");
  //   }
  // };

  const [imgVal, setImgVal] = React.useState();
  const uploadImg = async () => {
    const res1 = await responseHandler(() => postAttachments(imgVal), [201]);
    if (res1.status && res1.data?.length) {
      // snack.createSnack(res1.msg);
      // const res = await responseHandler(() =>
      //   updateUserProfile({
      //     image: res1.data[1]._id,
      //   })
      // );
      // if (res.status) {
      //   snack.createSnack(res.msg);
      //   setImgVal();
      // } else {
      //   snack.createSnack(res.data, "error");
      // }
    } else {
      snack.createSnack(res1.data, "error");
    }
  };

  // const [passError, setPassError] = React.useState();
  // const { mutateAsync: updatePasswordMutate } = useUpdateUserPassword();
  // const { register: registerPassword, handleSubmit: handlePasswordSubmit } =
  //   useForm();

  // const updatePasword = async (data) => {
  //   setPassError();
  //   if (data.confirm_password && data.confirm_password && data.confirm_password)
  //     if (data.confirm_password !== data.new_password)
  //       setPassError("Password didn't match!");
  //     else {
  //       const res = await responseHandler(() =>
  //         updatePasswordMutate({
  //           current_password: data.current_password,
  //           new_password: data.new_password,
  //           user_id: authCntxt.userInfo.user_id,
  //         })
  //       );
  //       if (res.status) {
  //         snack.createSnack(res.msg);
  //       } else {
  //         snack.createSnack(res.data, "error");
  //       }
  //     }
  //   else setPassError("Please fill the form!");
  // };

  React.useEffect(() => {
    if (!imgVal) return;
    // setImgVal();
    // uploadImg();
  }, [imgVal]);

  return authCntxt.isVerified ? (
    <Container
      sx={{
        position: "relative",
        pb: 3,
      }}
    >
      <Button
        variant="outlined"
        size={"small"}
        startIcon={<FiEdit2 />}
        sx={{
          borderRadius: 28,
          position: "absolute",
          top: 0,
          right: 0,
          transform: "translateX(-20px)",
        }}
      >
        edit profile
      </Button>
      <Grid
        container
        spacing={4}
        sx={{
          mt: 1,
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            rowGap: 2,
            columnGap: 4,
            justifyContent: {
              xs: "center",
              sm: "flex-start",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
            component={"form"}
          >
            <Avatar
              sx={{
                width: "150px",
                height: "150px",
              }}
              src={getAttachment(authCntxt.userInfo?.image)}
              alt={authCntxt.userInfo?.fullName}
            />
            <Tooltip title={"Upload Photo"}>
              <Fab
                size="small"
                sx={{
                  position: "absolute",
                  top: 100,
                  right: 0,
                }}
                color={"secondary"}
                component="label"
              >
                <FiEdit2 />
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    setImgVal(e.target.files[0]);
                  }}
                />
              </Fab>
            </Tooltip>
          </Box>
          <Stack
            direction={"column"}
            sx={{
              alignItems: {
                xs: "center",
                sm: "flex-start",
              },
            }}
          >
            <Typography variant={"h6"}>
              {authCntxt.userInfo?.fullName}
              {/* <Hidden smDown>
                <IconButton
                  size={"small"}
                  sx={{
                    ml: 1,
                  }}
                >
                  <FiEdit2 />
                </IconButton>
              </Hidden> */}
            </Typography>
            {/* <Hidden smDown>
              <Typography
                variant={"caption"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 1,
                }}
              >
                <FaSlackHash />
                <span>{authCntxt.userInfo?._id}</span>
              </Typography>
            </Hidden> */}
            <Typography
              variant={"subtitle2"}
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: 1,
                mt: {
                  sm: 0.5,
                },
              }}
            >
              <Hidden smDown>
                <FaPhoneAlt />
              </Hidden>
              <span>{authCntxt.userInfo?.phone}</span>
            </Typography>
            <Typography
              variant={"subtitle2"}
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: 1,
              }}
            >
              <Hidden smDown>
                <GrMail />
              </Hidden>
              <span>{authCntxt.userInfo?.email}</span>
            </Typography>
            <Button
              variant="contained"
              size={"small"}
              startIcon={<Icon icon="wpf:password1" />}
              sx={{ borderRadius: 28, my: 1, px: 2 }}
            >
              update password
            </Button>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color={"error"}
            startIcon={<MdLogout />}
            sx={{ my: 1, px: 2 }}
            onClick={() => authCntxt.logout()}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
      <UpdateUser />
    </Container>
  ) : (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={2}
      sx={{
        minHeight: "70vh",
      }}
    >
      <Avatar
        sx={{
          width: "220px",
          height: "180px",
          borderRadius: 0,
          mb: 7,
        }}
        src={notFound}
      />
      {/* <Alert
        sx={{
          width: "fit-content",
        }}
      >
        Please Sign in to Continue
      </Alert> */}

      <Button
        color={"black"}
        variant={"contained"}
        onClick={authCntxt.handleOpen}
      >
        Sign In
      </Button>
      <Divider
        sx={{
          width: "100%",
          maxWidth: "300px",
        }}
      >
        OR
      </Divider>
      <Button
        color={"black"}
        variant={"outlined"}
        onClick={authCntxt.handleOpenCreate}
      >
        Sign Up
      </Button>
    </Stack>
  );
};;;;;;;

export default Index;
