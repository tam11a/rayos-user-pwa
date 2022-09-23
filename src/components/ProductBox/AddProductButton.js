import { IconButton, InputBase } from "@mui/material";
import React from "react";
import {
  MdAddCircle,
  MdOutlineAddShoppingCart,
  MdRemoveCircle,
} from "react-icons/md";

const AddProductButton = ({ defaultValue, disabled, onChange, max }) => {
  const [value, setValue] = React.useState(defaultValue || 0);

  React.useEffect(() => {
    if (value > max) {
      setValue(max);
    }
    onChange(value);
  }, [value]);

  return value ? (
    <InputBase
      startAdornment={
        <IconButton
          size={"small"}
          color={"black"}
          onClick={() => setValue(parseInt(value) - 1)}
        >
          <MdRemoveCircle />
        </IconButton>
      }
      endAdornment={
        <IconButton
          size={"small"}
          color={"black"}
          onClick={() => setValue(parseInt(value) + 1)}
          disabled={max === value}
        >
          <MdAddCircle />
        </IconButton>
      }
      value={value}
      onChange={(e) => setValue(parseInt(e.target.value) || 0)}
      sx={{
        border: "1px solid",
        borderColor: "#00000022",
        borderRadius: "100px",
        width: "fit-content",
        maxWidth: "fit-content",
        "& input": {
          textAlign: "center",
          minWidth: {
            xs: "40px",
            sm: "unset",
          },
        },
      }}
      type={"tel"}
    />
  ) : (
    <IconButton
      size={"small"}
      color={"black"}
      onClick={() => setValue(value + 1)}
      disabled={disabled}
    >
      <MdOutlineAddShoppingCart />
    </IconButton>
  );
};

export default AddProductButton;
