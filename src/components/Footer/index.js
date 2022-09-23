import React from "react";

// components
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Fab,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

// icons
import { HiLocationMarker, HiOutlineMail } from "react-icons/hi";
import { MdCall, MdClose } from "react-icons/md";
import { FiFacebook } from "react-icons/fi";
import {
  RiDashboardLine,
  RiMessengerLine,
  RiWhatsappLine,
  RiYoutubeLine,
} from "react-icons/ri";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

// assets
import pndIcon from "../../assets/pnd-favicon.svg";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsYoutube } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { authContext } from "../../context/authProvider";
import { authRootURL } from "../../service/instance";

const Index = () => {
  const [catDrawerState, setCatDrawerState] = React.useState(false);
  const handleCatDrawer = () => setCatDrawerState(!catDrawerState);
  return (
    <>
      <Hidden mdDown>
        <Paper
          sx={{
            bgcolor: "primary.contrastText",
            py: 3,
            pb: 5,
          }}
          elevation={3}
        >
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={4}>
                <Stack
                  direction={"column"}
                  alignItems={"left"}
                  sx={{
                    rowGap: 2,
                    mt: 1,
                    color: "primary.main",
                    width: "fit-content",
                    // mx: "auto",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Information
                  </Typography>
                  <Typography>About Us</Typography>
                  <Typography>Delivery Information</Typography>
                  <Typography>Privacy Policy</Typography>
                  <Typography>Terms </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction={"column"}
                  alignItems={"left"}
                  sx={{
                    rowGap: 2,
                    mt: 1,
                    width: "fit-content",
                    mx: "auto",
                    color: "primary.main",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Customer Service
                  </Typography>
                  <Typography>Contact Us</Typography>
                  <Typography>Return Policy</Typography>
                  <Typography>Order History</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction={"column"}
                  alignItems={"left"}
                  sx={{
                    rowGap: 2,
                    mt: 1,
                    color: "primary.main",
                    width: "fit-content",
                    mx: "auto",
                    marginRight: 0,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Address
                  </Typography>
                  <Stack
                    direction={"row"}
                    columnGap={1}
                    alignItems={"flex-start"}
                  >
                    <IconButton
                      size={"small"}
                      sx={{
                        fontSize: "1rem",
                        mt: "-1px",
                      }}
                      color={"primary"}
                    >
                      <HiLocationMarker />
                    </IconButton>
                    <Typography>
                      2nd floor, House-3, Road-4,
                      <br /> Porbal Housing,
                      <br /> Opposite of
                      <br />
                      Suchona Community Center,
                      <br /> Ring Road, 1207 Dhaka.
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    columnGap={1}
                    alignItems={"flex-start"}
                  >
                    <IconButton
                      size={"small"}
                      sx={{
                        fontSize: "1rem",
                        mt: "-1px",
                      }}
                      color={"primary"}
                    >
                      <HiOutlineMail />
                    </IconButton>
                    <Typography>pndservice18@gmail.com</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    columnGap={1}
                    alignItems={"flex-start"}
                  >
                    <IconButton
                      size={"small"}
                      sx={{
                        fontSize: "1rem",
                        mt: "-1px",
                      }}
                      color={"primary"}
                    >
                      <MdCall />
                    </IconButton>
                    <Typography>01878044347</Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  mt: 3,
                }}
              >
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{
                    width: "fit-content",
                    mx: "auto",
                  }}
                >
                  <IconButton
                    color={"primary"}
                    component={"a"}
                    href={"https://www.facebook.com/panddservice"}
                    target={"_blank"}
                  >
                    <FiFacebook />
                  </IconButton>
                  <IconButton
                    color={"primary"}
                    component={"a"}
                    href={"https://m.me/panddservice"}
                    target={"_blank"}
                  >
                    <RiMessengerLine />
                  </IconButton>
                  <IconButton
                    color={"primary"}
                    component={"a"}
                    href={
                      "https://api.whatsapp.com/message/JWOAB3GMTTJIB1?autoload=1&app_absent=0"
                    }
                    target={"_blank"}
                  >
                    <RiWhatsappLine />
                  </IconButton>
                  <IconButton
                    color={"primary"}
                    component={"a"}
                    href={
                      "https://www.youtube.com/channel/UCLEc4oki--wJ62_CAIKBW3A"
                    }
                    target={"_blank"}
                  >
                    <RiYoutubeLine />
                  </IconButton>
                </Stack>
                <Typography
                  variant={"subtitle2"}
                  color={"primary"}
                  sx={{
                    mx: "auto",
                    textAlign: "center",
                    mt: 2,
                    "& a": {
                      color: "#000",
                      fontWeight: "600",
                      textDecoration: "none",
                    },
                  }}
                >
                  Copyright &copy; 2022 p&d. All Rights Reserved. | Design by
                  <a
                    href={"https://brogrammerslab.com/"}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    {" "}
                    Brogrammerslab
                  </a>
                  .
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Hidden>
      <Hidden mdUp>
        <AppBar
          color={"secondary"}
          sx={{
            py: 0,
            top: "auto",
            bottom: "0",
          }}
          elevation={3}
        >
          <Toolbar
            disableGutters
            sx={{
              height: "fit-content",
              minHeight: "20px !important",
            }}
          >
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 0.5,
              }}
            >
              <IconButton
                size={"large"}
                color={"primary"}
                component={Link}
                to={"/search"}
              >
                <RiDashboardLine />
                {/* <MdOutlineExplore /> */}
              </IconButton>
              <IconButton
                size={"large"}
                color={"primary"}
                component={Link}
                to={"/notification"}
              >
                <Badge overlap={"circular"} badgeContent={1} color="black">
                  <IoMdNotificationsOutline />
                </Badge>
              </IconButton>
              <Fab
                sx={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "#fff",
                  p: 0,
                }}
                component={Link}
                to={"/"}
              >
                <Avatar
                  src={pndIcon}
                  sx={{
                    width: "max-content",
                    p: 0.7,
                  }}
                  alt="pnd"
                />
              </Fab>
              <Box />
              <Box />
              <Box />
              <Box />
              <IconButton
                size={"large"}
                color={"primary"}
                component={Link}
                to={"/user"}
              >
                {/* <AiOutlineShoppingCart /> */}
                <AiOutlineUser />
              </IconButton>
              <IconButton
                size={"large"}
                color={"primary"}
                onClick={handleCatDrawer}
              >
                <BiMenuAltRight />
              </IconButton>
            </Container>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            height: "90px",
          }}
        />
        <FooterDrawer open={catDrawerState} handleClose={handleCatDrawer} />
      </Hidden>
    </>
  );
};

const FooterDrawer = ({ open, handleClose }) => {
  const authCntxt = React.useContext(authContext);
  // console.log(authCntxt.userInfo);
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "95vw",
          maxWidth: "300px",
        },
      }}
    >
      <List disablePadding>
        <ListItem>
          <IconButton color={"black"} size={"small"} onClick={handleClose}>
            <MdClose />
          </IconButton>
          <Box
            sx={{
              flex: 1,
            }}
          />
          <IconButton color={"error"} size={"small"} onClick={handleClose}>
            <BsYoutube />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItem>
          {authCntxt.isVerified ? (
            <Button
              fullWidth
              color={"black"}
              variant={"contained"}
              startIcon={
                <Avatar
                  src={authRootURL + authCntxt.userInfo?.image}
                  alt={authCntxt.userInfo?.full_name}
                />
              }
              component={Link}
              to={"/user"}
              onClick={handleClose}
            >
              <ListItemText
                primary={authCntxt.userInfo?.full_name}
                secondary={authCntxt.userInfo?.phone}
                sx={{
                  textTransform: "none",
                  textAlign: "left",
                  pl: 1,
                }}
                primaryTypographyProps={{
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  noWrap: true,
                  sx: {
                    color: "#ffffff77",
                    fontSize: "0.7rem",
                  },
                }}
              />
            </Button>
          ) : (
            <Button
              fullWidth
              variant={"contained"}
              startIcon={
                <FaUserCircle
                  style={{
                    fontSize: "2.4rem",
                  }}
                />
              }
              onClick={() => {
                handleClose();
                authCntxt.handleOpen();
              }}
              color={"black"}
            >
              <ListItemText
                primary={
                  <>
                    <b>SIGN IN</b> or
                  </>
                }
                secondary={"Join Our Site"}
                sx={{
                  textTransform: "none",
                  textAlign: "left",
                  pl: 1,
                }}
                secondaryTypographyProps={{
                  sx: {
                    color: "white",
                    fontSize: "0.7rem",
                  },
                }}
              />
            </Button>
          )}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Index;
