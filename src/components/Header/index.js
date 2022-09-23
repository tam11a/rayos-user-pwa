import React from "react";

// Instance
import { authRootURL, rootURL } from "../../service/instance";

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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Assets
import pndIcon from "../../assets/pnd-icon.svg";

// Icons
import { MdCall, MdClose, MdShoppingCart } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
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
          <Toolbar
            disableGutters
            sx={{
              bgcolor: "#ffffff",
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
                  size={"small"}
                  sx={{
                    py: 0,
                    textTransform: "unset",
                    "&:hover": { background: "transparent" },
                  }}
                  startIcon={
                    <MdCall
                      style={{
                        fontSize: "0.9rem",
                      }}
                    />
                  }
                  disableRipple
                  component={"a"}
                  href={"tel:+8801878044347"}
                >
                  01878044347
                </Button>
                <Button
                  size={"small"}
                  sx={{
                    py: 0,
                    textTransform: "unset",
                    "&:hover": { background: "transparent" },
                  }}
                  startIcon={
                    <HiOutlineMail
                      style={{
                        fontSize: "0.9rem",
                      }}
                    />
                  }
                  disableRipple
                  component={"a"}
                  href={"mailto:pndservice18@gmail.com"}
                  target={"_blank"}
                >
                  pndservice18@gmail.com
                </Button>
              </span>
              <span>
                <InstallationButton />
                <Button
                  size={"small"}
                  sx={{ py: 0, "&:hover": { background: "transparent" } }}
                  disableRipple
                >
                  বাংলা
                </Button>
              </span>
            </Container>
          </Toolbar>
          <Toolbar disableGutters>
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "& > span": {
                  flex: 1,
                },
                "& span": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  columnGap: 0.5,
                },
              }}
            >
              <span
                style={{
                  justifyContent: "flex-start",
                }}
              >
                <IconButton color={"black"} onClick={handleCatDrawer}>
                  <BiMenuAltLeft />
                </IconButton>
                <SearchProduct />
              </span>
              <span style={{ justifyContent: "center" }}>
                <Avatar
                  src={pndIcon}
                  sx={{ width: "60px", height: "60px", borderRadius: 0 }}
                  alt="pnd"
                  component={Link}
                  to={"/"}
                />
              </span>
              <span
                style={{
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  color={"black"}
                  component={Link}
                  to={"/notification"}
                >
                  <IoMdNotificationsOutline />
                </IconButton>
                <IconButton color={"black"} onClick={cartCntxt.handleOpen}>
                  <Badge
                    // overlap={"circular"}
                    badgeContent={cartCntxt.total}
                    color="black"
                  >
                    <AiOutlineShoppingCart />
                  </Badge>
                </IconButton>
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
        </AppBar>
        <Box
          sx={{
            height: "90px",
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

export const SearchProduct = () => {
  let navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        if (data.get("search")) navigate(`/search?q=${data.get("search")}`);
      }}
    >
      <InputBase
        startAdornment={
          <BsSearch style={{ marginRight: "10px", fontSize: "1.2rem" }} />
        }
        sx={{
          bgcolor: "#ffffff88",
          px: 1,
          borderRadius: "100px",
          // boxShadow: "inset 0 0 3px #000000",
          "& svg": {
            color: "primary.main",
          },
        }}
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
          <React.Fragment key={category.id}>
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
        component={phoneView ? "div" : Link}
        to={!phoneView ? "/search?category=" + category.id : undefined}
        onClick={phoneView ? () => {} : others.onClick}
      >
        <ListItemIcon>
          <Avatar
            alt={category.title_en}
            src={rootURL + category.photo}
            sx={{
              borderRadius: 0,
              p: 0.7,
            }}
          />
        </ListItemIcon>
        <ListItemText primary={category.title_en} />
      </ListItemButton>
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
              key={subcategory.id}
              component={Link}
              to={"/search?subcategory=" + subcategory.id}
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
              <ListItemText primary={subcategory.title_en} />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default Index;
