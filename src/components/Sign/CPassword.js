import { IconButton } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React from "react";
import CInput from "./CInput";

const CPassword = React.forwardRef(({ ...others }, ref) => {
  const [show, setShow] = React.useState(false);
  return (
    <CInput
      {...others}
      type={show ? "text" : "password"}
      endAdornment={
        <IconButton
          size={"small"}
          color={"primary"}
          onClick={() => setShow(!show)}
        >
          {show ? <FaRegEye /> : <FaRegEyeSlash />}
        </IconButton>
      }
      ref={ref}
    />
  );
});

export default CPassword;
