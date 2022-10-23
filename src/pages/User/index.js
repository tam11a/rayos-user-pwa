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
import UpdateUser from "../User/UpdateUser";
import { postAttachments } from "../../query/attachment";
import { MdLogout } from "react-icons/md";
import UpdatePassword from "./UpdatePassword";

const Index = () => {
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);
  const [imgVal, setImgVal] = React.useState();
  const uploadImg = async () => {
    const res1 = await responseHandler(() => postAttachments(imgVal), [201]);
    if (res1.status && res1.data?.length) {
    } else {
      snack.createSnack(res1.data, "error");
    }
  };

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
        onClick={() => setOpenEdit(!openEdit)}
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
              onClick={() => setOpenPass(!openPass)}
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
      <UpdateUser open={openEdit} onClose={() => setOpenEdit(!openEdit)} />
      <UpdatePassword open={openPass} onClose={() => setOpenPass(!openPass)} />
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
