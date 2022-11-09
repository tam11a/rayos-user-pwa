// 314C3D -> Dark Green
// D5E4DB -> Light Green

import { createTheme } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

// colors
const primary = "#272643";
const primaryLight = "#F6EAE3";
const primaryBright = "#F6EAE3";
const black = "#252E42";
const blackDark = "#1F283B";
const blackLight = "#2F3B52";

// breakpoints
const breakpoints = {
  // for responsiveness
  values: {
    xs: 0,
    xms: 380,
    sm: 600, // Phone
    md: 900, // Tablet/Laptop
    lg: 1200, // Desktop
    xl: 1536,
  },
};
const theme = createTheme({
  breakpoints: breakpoints,
  palette: {
    primary: {
      dark: blackDark,
      main: primary,
      bright: primaryBright,
      contrastText: primaryLight,
    },
    secondary: {
      main: primaryLight,
      contrastText: primary,
    },
    black: {
      main: black,
      dark: blackDark,
      light: blackLight,
      search: "#2C3448",
      contrastText: "#fff",
    },
    white: {
      main: "#fff",
      contrastText: "#2C3448",
    },
    error: {
      main: "#e86161",
    },
    warning: {
      main: "#F49320",
      contrastText: "#272725",
    },
    rating: {
      main: amber[500],
      dark: amber[900],
      light: amber[200],
    },
  },
  typography: {
    fontFamily: "Rajdhani, Noto Sans Bengali, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: "2px",
          fontWeight: "500",
        },
        outlined: {
          borderRadius: "2px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          "& .MuiInputBase-input": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            border: "none",
            outline: "none",
          },
        },
      },
    },
  },
});

theme.typography.normal = {
  ...theme.typography.subtitle2,
  textAlign: "justify",
  fontWeight: "light",
  "& a": {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
};

export default theme;
