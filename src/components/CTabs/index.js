import { styled } from "@mui/material/styles";
import { Tabs } from "@mui/material";

const Index = styled(Tabs)(({ theme }) => ({
  boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.1)",
  borderRadius: "50px",
  "& .MuiTabs-flexContainer": {
    justifyContent: "space-between",
  },
  "& .MuiTabs-flexContainer > *": {
    flex: 1,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
}));

export default Index;
