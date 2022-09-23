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
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { authContext } from "../../context/authProvider";

import notFound from "../../assets/undraw_mobile_login_re_9ntv.svg";
import { authRootURL } from "../../service/instance";
import { IoWalletSharp } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { MdLogout, MdNotificationsActive } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import CInput from "../../components/Sign/CInput";
import CPassword from "../../components/Sign/CPassword";
import { useForm } from "react-hook-form";
import { useUpdateUserPassword, useUpdateUserProfile } from "../../query/sign";
import { objToFormData } from "../../utilities/json-form";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import { Link } from "react-router-dom";

const Index = () => {
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const { register, setValue, handleSubmit } = useForm();

  React.useEffect(() => {
    if (!Object.keys(authCntxt.userInfo).length) return;
    // console.log(authCntxt.userInfo);
    setValue("user_id", authCntxt.userInfo.user_id);
    setValue("full_name", authCntxt.userInfo.full_name);
    setValue("company_name", authCntxt.userInfo.company_name);
    setValue("phone", authCntxt.userInfo.phone);
    setValue("address", authCntxt.userInfo.address);
    if (authCntxt.userInfo.info) {
      let additionalInfo = JSON.parse(authCntxt.userInfo.info);
      setValue("cc", additionalInfo.cc);
      setValue("bkash", additionalInfo.bkash);
      setValue("company_link", additionalInfo.company_link);
    }
  }, [authCntxt.userInfo]);

  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const updateHandler = async (e) => {
    let info = {
      bkash: e.bkash,
      cc: e.cc,
      company_link: e.company_link,
    };
    delete e.phone;
    delete e.bkash;
    delete e.company_link;
    delete e.cc;
    e = {
      ...e,
      info: JSON.stringify(JSON.stringify(info)),
    };
    const res = await responseHandler(() =>
      updateUserProfile(objToFormData(e))
    );
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  const [imgVal, setImgVal] = React.useState();
  const uploadImg = async () => {
    const res = await responseHandler(() =>
      updateUserProfile(
        objToFormData({
          image: imgVal,
          full_name: authCntxt.userInfo.full_name,
          company_name: authCntxt.userInfo.company_name,
          address: authCntxt.userInfo.address,
          user_id: authCntxt.userInfo.user_id,
        })
      )
    );
    if (res.status) {
      snack.createSnack(res.msg);
      setImgVal();
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  const [passError, setPassError] = React.useState();
  const { mutateAsync: updatePasswordMutate } = useUpdateUserPassword();
  const { register: registerPassword, handleSubmit: handlePasswordSubmit } =
    useForm();

  const updatePasword = async (data) => {
    setPassError();
    if (data.confirm_password && data.confirm_password && data.confirm_password)
      if (data.confirm_password !== data.new_password)
        setPassError("Password didn't match!");
      else {
        const res = await responseHandler(() =>
          updatePasswordMutate({
            current_password: data.current_password,
            new_password: data.new_password,
            user_id: authCntxt.userInfo.user_id,
          })
        );
        if (res.status) {
          snack.createSnack(res.msg);
        } else {
          snack.createSnack(res.data, "error");
        }
      }
    else setPassError("Please fill the form!");
  };

  React.useEffect(() => {
    if (!imgVal) return;
    // setImgVal();
    uploadImg();
  }, [imgVal]);

  return authCntxt.isVerified ? (
    <Container
      sx={{
        pb: 3,
      }}
    >
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
              src={authRootURL + authCntxt.userInfo?.image}
              alt={authCntxt.userInfo?.full_name}
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
              {authCntxt.userInfo?.full_name}
            </Typography>
            <Typography
              variant={"subtitle2"}
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: 1,
                mt: {
                  sm: 1,
                },
              }}
            >
              <Hidden smDown>
                <FaPhoneAlt />
              </Hidden>
              <span>{authCntxt.userInfo?.phone}</span>
            </Typography>
            <Stack
              direction={"row"}
              sx={{
                my: 1,
              }}
              rowGap={1}
              columnGap={3}
              flexWrap={"wrap"}
            >
              <Stack direction={"column"} alignItems={"center"}>
                <Tooltip title={"Wallet"}>
                  <IconButton color={"black"} component={Link} to={"wallet"}>
                    <IoWalletSharp />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption">Wallet</Typography>
              </Stack>
              <Stack direction={"column"} alignItems={"center"}>
                <Tooltip title={"Order"}>
                  <IconButton color={"black"} component={Link} to={"order"}>
                    <AiOutlineShop />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption">Orders</Typography>
              </Stack>
              <Stack direction={"column"} alignItems={"center"}>
                <Tooltip title={"Notification"}>
                  <IconButton color={"black"}>
                    <MdNotificationsActive />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption">Notification</Typography>
              </Stack>
              <Stack direction={"column"} alignItems={"center"}>
                <Tooltip title={"Logout"}>
                  <IconButton color={"error"} onClick={authCntxt.logout}>
                    <MdLogout />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption">Logout</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit(updateHandler)}>
            <Paper
              // elevation={0}
              sx={{
                p: {
                  xs: 1,
                  md: 2,
                },
                boxShadow: {
                  xs: 0,
                  md: 10,
                },
              }}
              component={Stack}
              direction={"column"}
              rowGap={1}
            >
              <Hidden mdDown>
                <Typography
                  variant={"h5"}
                  sx={{
                    p: 1,
                  }}
                >
                  ACCOUNT SETTINGS
                </Typography>
                <Divider />
              </Hidden>
              <Typography variant="button">Name *</Typography>
              <CInput
                placeholder="Full Name"
                fullWidth
                {...register("full_name")}
              />
              <Typography variant="button">Company Name *</Typography>
              <CInput
                placeholder="Company Name"
                fullWidth
                {...register("company_name")}
              />
              <Typography variant="button">Company Link</Typography>
              <CInput
                placeholder="Company Link"
                fullWidth
                {...register("company_link")}
              />
              <Typography variant="button">Phone *</Typography>
              <CInput
                placeholder="Phone Number"
                readOnly
                disabled
                fullWidth
                {...register("phone")}
              />
              <Typography variant="button">Address *</Typography>
              <CInput
                placeholder="Address"
                fullWidth
                {...register("address")}
              />
              <Typography variant="button">Additional Info</Typography>
              <CInput
                placeholder="Bank Account"
                startAdornment={<Box sx={{ mr: 1 }}>CC:</Box>}
                fullWidth
                {...register("cc")}
              />
              <CInput
                placeholder="BKash Number"
                startAdornment={<Box sx={{ mr: 1 }}>BKash:</Box>}
                fullWidth
                inputProps={{
                  type: "tel",
                }}
                {...register("bkash")}
              />
              <Button variant="contained" color={"black"} type={"submit"}>
                Update
              </Button>
            </Paper>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handlePasswordSubmit(updatePasword)}>
            <Paper
              // elevation={0}
              sx={{
                p: {
                  xs: 1,
                  md: 2,
                },
                boxShadow: {
                  xs: 0,
                  md: 10,
                },
              }}
              component={Stack}
              direction={"column"}
              rowGap={1}
            >
              <Hidden mdDown>
                <Typography
                  variant={"h5"}
                  sx={{
                    p: 1,
                  }}
                >
                  UPDATE SECURITY
                </Typography>
                <Divider />
              </Hidden>
              <Hidden smUp>
                <Divider
                  sx={{
                    mb: 3,
                  }}
                />
              </Hidden>
              <Typography variant="button">Current Password *</Typography>
              <CPassword
                placeholder="Current Password"
                {...registerPassword("current_password")}
                fullWidth
              />
              <Typography variant="button">New Password *</Typography>
              <CPassword
                placeholder="New Password"
                {...registerPassword("new_password")}
                fullWidth
              />
              <Typography variant="button">Confirm New Password *</Typography>
              <CPassword
                placeholder="Confirm New Password"
                {...registerPassword("confirm_password")}
                fullWidth
              />
              {passError && <Alert severity="error">{passError}</Alert>}
              <Button variant="contained" type={"submit"} color={"black"}>
                Update password
              </Button>
            </Paper>
          </form>
          <Divider
            sx={{
              my: 1,
              mt: 3,
            }}
          />
          <Button
            onClick={authCntxt.logout}
            variant={"contained"}
            color={"error"}
            sx={{
              mt: 2,
            }}
            fullWidth
          >
            Logout
          </Button>
        </Grid>
      </Grid>
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
};

export default Index;
