// 314C3D -> Dark Green
// D5E4DB -> Light Green

import { createTheme } from "@mui/material/styles";

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
      main: "#ffc300",
      contrastText: "#272725",
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: "2px",
          fontWeight: "500",
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
