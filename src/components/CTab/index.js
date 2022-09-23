import { styled } from "@mui/material/styles";
import { Tab } from "@mui/material";

const Index = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: { xs: "0.7rem", md: "1rem" },
  fontWeight: "bold",
  borderRadius: "50px",
  "&:hover": {
    opacity: 1,
    color: theme.palette.black.main,
  },
  "&.Mui-selected": {
    color: theme.palette.black.contrastText,
    background: theme.palette.black.main,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

export default Index;
