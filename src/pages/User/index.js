import {
  Alert,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
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
import { useUpdateUserProfile } from "../../query/sign";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import UpdateUser from "./UpdateUser";
import { postAttachments, usePostAttachments } from "../../query/attachment";
import { MdLogout } from "react-icons/md";
import UpdatePassword from "./UpdatePassword";
import { useGetBookmarkList } from "../../query/product";
import ProductBox from "../../components/ProductBox";
import { Link } from "react-router-dom";
import { BiUserPin } from "react-icons/bi";

const Index = () => {
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);
  const [imgVal, setImgVal] = React.useState();
  const { mutateAsync: postAttachments, isLoading: attachmentLoading } =
    usePostAttachments();
  const { mutateAsync: updateUserProfile, isLoading: updateLoading } =
    useUpdateUserProfile();

  const uploadImg = async () => {
    const res1 = await responseHandler(() => postAttachments(imgVal), [201]);
    if (res1.status) {
      const res = await responseHandler(
        () =>
          updateUserProfile({
            image: res1.data?.[0]?._id,
          }),
        [201]
      );
      if (res.status) {
        snack.createSnack(res.msg);
      } else {
        snack.createSnack(res.data, "error");
      }
    } else {
      snack.createSnack(res1.data, "error");
    }
  };

  React.useEffect(() => {
    if (!imgVal) return;
    // setImgVal();
    uploadImg();
  }, [imgVal]);

  return authCntxt.isVerified ? (
    <Container
      sx={{
        position: "relative",
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
              minHeight: "150px",
              minWidth: "150px",
            }}
            component={"form"}
          >
            {/* {true ? ( */}
            {attachmentLoading || updateLoading ? (
              <Box
                sx={{
                  borderRadius: "50%",
                  position: "relative",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress color={"black"} />
              </Box>
            ) : (
              <Avatar
                sx={{
                  width: "150px",
                  height: "150px",
                }}
                src={getAttachment(authCntxt.userInfo?.image)}
                alt={authCntxt.userInfo?.fullName}
              />
            )}
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
              <b>{authCntxt.userInfo?.userName}</b>
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
                <BiUserPin />
              </Hidden>
              <span>{authCntxt.userInfo?.fullName}</span>
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
          </Stack>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: {
                xs: "center",
                sm: "flex-end",
              },
              justifyContent: "center",
            }}
          >
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="contained"
            >
              <Button
                variant="contained"
                size={"small"}
                startIcon={<Icon icon="wpf:password1" />}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => setOpenPass(!openPass)}
              >
                <span
                  style={{
                    flex: 1,
                  }}
                >
                  update password
                </span>
              </Button>
              <Button
                variant="outlined"
                size={"small"}
                startIcon={<FiEdit2 />}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => setOpenEdit(!openEdit)}
              >
                <span
                  style={{
                    flex: 1,
                  }}
                >
                  edit profile
                </span>
              </Button>
              <Button
                variant="contained"
                color={"error"}
                size={"small"}
                startIcon={<MdLogout />}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => authCntxt.logout()}
              >
                <span
                  style={{
                    flex: 1,
                  }}
                >
                  Logout
                </span>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ my: 1, maxWidth: "99vw", mx: "auto", px: 1, mt: 2 }}>
        <WishListProduct />
      </Box>
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

const WishListProduct = () => {
  const { createSnack } = React.useContext(snackContext);
  let [info, setInfo] = React.useState({});
  let [wishList, setWishList] = React.useState([]);
  const { data, isLoading, isError, error } = useGetBookmarkList();

  React.useEffect(() => {
    if (isLoading) return;
    setInfo(data ? data?.data : {});
    setWishList(data ? data?.data?.data : []);
    if (isError)
      if (error.response.status === 400)
        createSnack(error?.response.data.msg, "error");
      else createSnack("Something Went Wrong!", "error");
  }, [data]);

  return (
    <>
      <Divider />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          my: 1,
        }}
      >
        <Typography
          variant={"h6"}
          sx={{
            textTransform: "capitalize",
          }}
        >
          {isLoading ? <Skeleton width={"120px"} /> : "Wishlist"}
        </Typography>
        {/* <Typography variant={"caption"}>
          {isLoading ? (
            <Skeleton width={"220px"} />
          ) : (
            `${info?.total || 0} Results Found`
          )}
        </Typography> */}

        <Button
          variant={"contained"}
          size={"small"}
          component={Link}
          to={`/search?wishlist=1`}
        >
          See More
        </Button>
      </Stack>
      <Divider />

      <Grid
        container
        direction={"row"}
        rowGap={0.6}
        columnGap={0.6}
        flexWrap={"wrap"}
        sx={{
          my: 2,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <Skeleton
                key={num}
                variant="rectangular"
                component={Grid}
                item
                xs={5.9}
                sm={3.95}
                md={2.92}
                lg={1.97}
                sx={{
                  height: {
                    xs: "280px",
                    md: "310px",
                  },
                }}
              />
            ))}
          </>
        ) : (
          <>
            {wishList?.map((product) => (
              <Grid
                key={product._id}
                item
                xs={5.9}
                sm={3.85}
                md={2.92}
                lg={2.3}
                sx={{
                  height: {
                    xs: "280px",
                    md: "310px",
                  },
                }}
              >
                <ProductBox product={product.product} hideBookmark={true} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default Index;
