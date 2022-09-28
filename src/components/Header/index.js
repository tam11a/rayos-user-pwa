import React from "react";

// Instance
import { authRootURL, baseURL } from "../../service/instance";

// Context
import { categoryContext } from "../../context/categoryProvider";

// Modules
import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  InputBase,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Popover,
  Stack,
  Badge,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Assets
import pndIcon from "../../assets/pnd-icon.svg";

// Icons
import {
  MdCall,
  MdChatBubbleOutline,
  MdClose,
  MdShoppingCart,
} from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { RiNotification2Line } from "react-icons/ri";
import { BiMenuAltLeft } from "react-icons/bi";
import { BsBagPlus, BsChatLeft, BsSearch } from "react-icons/bs";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineShopping,
} from "react-icons/ai";
import { TbListDetails, TbListSearch } from "react-icons/tb";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InstallationButton from "./InstallationButton";
import { authContext } from "../../context/authProvider";
import { cartContext } from "../../context/cartProvider";

const Index = () => {
  const authCntxt = React.useContext(authContext);
  const cartCntxt = React.useContext(cartContext);
  const [catDrawerState, setCatDrawerState] = React.useState(false);
  const handleCatDrawer = () => setCatDrawerState(!catDrawerState);

  let [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = React.useState();

  React.useEffect(() => {
    if (searchParams.get("q"))
      setSearch({
        type: "q",
        value: searchParams.get("q"),
      });
    else if (searchParams.get("category"))
      setSearch({
        type: "category",
        value: searchParams.get("category"),
      });
    else if (searchParams.get("subcategory"))
      setSearch({
        type: "subcategory",
        value: searchParams.get("subcategory"),
      });
    else
      setSearch({
        type: "all",
      });
  }, [searchParams]);
  return (
    <>
      <Hidden mdDown>
        <AppBar
          color={"secondary"}
          sx={{
            py: 0,
          }}
          elevation={3}
        >
          <Toolbar disableGutters>
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                columnGap: 2,
                // "& > span": {
                //   flex: 1,
                // },
                "& span": {
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "space-between", // removed because badge alignment got effected for this
                  columnGap: 0.5,
                },
              }}
            >
              <span style={{ justifyContent: "flex-start" }}>
                <Avatar
                  src={pndIcon}
                  sx={{
                    width: "120px",
                    height: "60px",
                    borderRadius: 0,
                  }}
                  alt="rayos"
                  component={Link}
                  to={"/"}
                />
              </span>
              <SearchProduct
                style={{
                  minWidth: "unset",
                  flex: 1,
                }}
              />

              <span
                style={{
                  justifyContent: "flex-end",
                }}
              >
                <Badge overlap={"circular"} badgeContent={5} color="black">
                  <IconButton color={"black"} component={Link} to={"/chat"}>
                    <MdChatBubbleOutline />
                  </IconButton>
                </Badge>
                <Badge overlap={"circular"} badgeContent={5} color="black">
                  <IconButton
                    color={"black"}
                    component={Link}
                    to={"/notification"}
                  >
                    <RiNotification2Line />
                  </IconButton>
                </Badge>
                <Badge
                  overlap={"circular"}
                  badgeContent={cartCntxt.total}
                  color="black"
                >
                  <IconButton color={"black"} onClick={cartCntxt.handleOpen}>
                    <AiOutlineShopping
                      style={{
                        fontSize: "1.2em",
                      }}
                    />
                  </IconButton>
                </Badge>
                {authCntxt.isVerified ? (
                  <IconButton color={"black"} component={Link} to={"/user"}>
                    {authCntxt.userInfo ? (
                      <Avatar
                        src={authRootURL + authCntxt.userInfo?.image}
                        alt={authCntxt.userInfo?.full_name}
                      />
                    ) : (
                      <AiOutlineUser />
                    )}
                  </IconButton>
                ) : (
                  <Button
                    variant={"contained"}
                    sx={{
                      borderRadius: "1000px",
                      ml: 1,
                    }}
                    color={"black"}
                    onClick={authCntxt.handleOpen}
                  >
                    Sign In
                  </Button>
                )}
              </span>
            </Container>
          </Toolbar>
          <Toolbar
            disableGutters
            sx={{
              bgcolor: "#ffffff",
              height: "fit-content",
              minHeight: "50px !important",
            }}
          >
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "& span": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  columnGap: 0.5,
                },
              }}
            >
              <span>
                <Button
                  size={"large"}
                  startIcon={<BiMenuAltLeft />}
                  onClick={handleCatDrawer}
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  CATEGORIES
                </Button>
                <Button
                  size={"large"}
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Deal of the day
                </Button>
                <Button
                  size={"large"}
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Gadget madness
                </Button>
              </span>
              <span>
                {/* <InstallationButton />
                <Button
                  size={"small"}
                  sx={{ py: 0, "&:hover": { background: "transparent" } }}
                  disableRipple
                >
                  বাংলা
                </Button> */}
              </span>
            </Container>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            height: "120px",
          }}
        />
      </Hidden>
      <Hidden mdUp>
        <AppBar
          sx={{
            bgcolor: "#fff",
          }}
          elevation={0}
        >
          <Toolbar
            sx={{
              columnGap: 1,
            }}
          >
            <IconButton onClick={handleCatDrawer} color={"primary"}>
              <TbListDetails />
              {/* <BiMenuAltLeft /> */}
            </IconButton>
            <SearchHeader
              search={search}
              sx={{
                bgcolor: "#00000011",
              }}
            />
            <Badge
              overlap={"circular"}
              badgeContent={cartCntxt.total}
              color="black"
            >
              <IconButton color={"primary"} onClick={cartCntxt.handleOpen}>
                <MdShoppingCart />
              </IconButton>
            </Badge>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            height: {
              xs: "60px",
              sm: "70px",
            },
          }}
        />
      </Hidden>
      <CategoryDrawer open={catDrawerState} handleClose={handleCatDrawer} />
    </>
  );
};

export const SearchProduct = ({ inputStyle, ...others }) => {
  let navigate = useNavigate();
  return (
    <form
      style={{
        minWidth: "180%",
        ...others.style,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        if (data.get("search")) navigate(`/search?q=${data.get("search")}`);
      }}
      {...others}
    >
      <InputBase
        startAdornment={
          <BsSearch style={{ marginRight: "10px", fontSize: "1.3rem" }} />
        }
        sx={{
          bgcolor: "#ffffff88",
          px: 1.5,
          borderRadius: "100px",
          fontSize: "1.2rem",
          // boxShadow: "inset 0 0 3px #000000",
          "& svg": {
            color: "primary.main",
          },
          ...inputStyle,
        }}
        fullWidth
        placeholder={"Search..."}
        name={"search"}
      />
    </form>
  );
};

export const CategoryDrawer = ({ open, handleClose }) => {
  const { categoryList } = React.useContext(categoryContext);
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minWidth: "300px",
        },
      }}
    >
      <List disablePadding>
        <ListItem
          sx={{
            bgcolor: "primary.contrastText",
          }}
        >
          <ListItemText
            primary={"Product Categories"}
            secondary={
              <Box
                sx={{
                  color: "unset",
                  textDecoration: "none",
                }}
                component={Link}
                to={"/search"}
                onClick={handleClose}
              >
                Show All Categories
              </Box>
            }
            primaryTypographyProps={{
              color: "primary.main",
              fontWeight: "bold",
            }}
            secondaryTypographyProps={{
              color: "#00000066",
            }}
            sx={{
              flexGrow: 1,
            }}
          />
          <IconButton size={"small"} color={"primary"} onClick={handleClose}>
            <MdClose />
          </IconButton>
        </ListItem>
        {categoryList?.map((category) => (
          <React.Fragment key={category._id}>
            <CategoryItemButton category={category} onClick={handleClose} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export const SearchHeader = ({ search, sx }) => {
  let navigate = useNavigate();
  const [searchText, setSearchText] = React.useState(
    search && search.type === "q" ? search.value : ""
  );
  return (
    <form
      style={{
        width: "100%",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        if (data.get("search")) navigate(`/search?q=${data.get("search")}`);
      }}
    >
      <InputBase
        endAdornment={
          <Stack direction={"row"}>
            {searchText ? (
              <IconButton color="error" onClick={() => setSearchText("")}>
                <MdClose
                  style={{
                    color: "unset",
                  }}
                />
              </IconButton>
            ) : (
              <></>
            )}
            <IconButton type="submit">
              <BsSearch />
            </IconButton>
          </Stack>
        }
        sx={{
          bgcolor: "#ffffff88",
          pl: 2,
          borderRadius: "100px",
          // boxShadow: "inset 0 0 3px #000000",
          "& svg": {
            color: "primary.main",
          },
          ...sx,
        }}
        fullWidth
        placeholder={"Search..."}
        name={"search"}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

const CategoryItemButton = ({ category, ...others }) => {
  const theme = useTheme();
  const phoneView = useMediaQuery(theme.breakpoints.down("md"));
  const [poperOpen, setPoperOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    handleOpen();
    // setLastOpen(event);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => setPoperOpen(true);
  const handleClose = () => setPoperOpen(false);

  return (
    <>
      <ListItemButton
        aria-owns={poperOpen ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handleClose}
        component={category.subcategories.length && phoneView ? "div" : Link}
        to={
          !(category.subcategories.length && phoneView)
            ? "/search?category=" + category.id
            : undefined
        }
        onClick={
          category.subcategories.length && phoneView ? () => {} : others.onClick
        }
      >
        <ListItemIcon>
          <Avatar
            alt={category.titleEn}
            src={baseURL + "/attachments/" + category.icon}
            sx={{
              borderRadius: 0,
              p: 0.7,
            }}
          />
        </ListItemIcon>
        <ListItemText primary={category.titleEn} />
      </ListItemButton>
      {category.subcategories.length && phoneView ? (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
            ml: 0.5,
          }}
          open={poperOpen}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
          // PaperProps={{
          //   minWidth: "250px",
          // }}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <List
            sx={{
              minWidth: "250px",
              pointerEvents: "auto",
            }}
            disablePadding
            // onMouseEnter={() => handlePopoverOpen(lastOpen)}
            // onMouseLeave={handlePopoverClose}
          >
            <Hidden mdUp>
              <ListItem>
                <ListItemText
                  primary={category.title_en}
                  secondary={"Show All Subcategories"}
                />
                <IconButton
                  component={Link}
                  to={"/search?category=" + category.id}
                  {...others}
                >
                  <TbListSearch />
                </IconButton>
              </ListItem>
            </Hidden>
            {category.subcategories?.map((subcategory) => (
              <ListItemButton
                key={subcategory._id}
                component={Link}
                to={"/search?subcategory=" + subcategory._id}
                {...others}
              >
                {/* <ListItemIcon>
                <Avatar
                  alt={category.title_en}
                  src={rootURL + category.photo}
                  sx={{
                    borderRadius: 0,
                    p: 0.7,
                  }}
                />
              </ListItemIcon> */}
                <ListItemText primary={subcategory.titleEn} />
              </ListItemButton>
            ))}
          </List>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
};

export default Index;
