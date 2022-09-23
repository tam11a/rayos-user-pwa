import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";

const CInput = styled(InputBase)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: "2px",
  padding: "7px 15px",
  fontWeight: "400",
}));

export default CInput;
