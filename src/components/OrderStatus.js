import { Chip, InputBase, MenuItem, Select } from "@mui/material";
import React from "react";
import snackContext from "../context/snackProvider";
import { useUpdateOrderStatus } from "../query/order";
import { responseHandler } from "../utilities/response-handler";

const OrderStatus = ({ id, status, size, ...others }) => {
  const getColor = () => {
    switch (status) {
      case "Pending":
        return "info";
      case "Shipped":
      case "Confirmed":
        return "black";
      case "Canceled":
      case "Returned":
        return "error";
      case "Delivered":
        return "success";
      default:
        return "default";
    }
  };

  const { mutateAsync: updateOrderStatus, isLoading } = useUpdateOrderStatus();
  const snack = React.useContext(snackContext);

  const updateFunc = async (value) => {
    const res = await responseHandler(
      () => updateOrderStatus({ id, status: value }),
      [201]
    );
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  return (
    <Select
      value={status || ""}
      disabled={status === "Returned" || status === "Canceled"}
      size={"small"}
      fullWidth
      IconComponent={() => <></>}
      input={
        <InputBase
          sx={{
            pr: 0,
          }}
        />
      }
      sx={{
        "& .MuiSelect-select": {
          padding: "0 !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      MenuProps={{
        sx: {
          mt: "5px",
        },
      }}
      renderValue={(value) => (
        <Chip
          key={value}
          label={value}
          color={getColor()}
          size={size || "medium"}
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
          //   variant={"outlined"}
          onClick={() => {}}
        />
      )}
      {...others}
      onChange={(e) => updateFunc(e.target.value)}
    >
      <MenuItem value={"Pending"} disabled>
        Pending
      </MenuItem>
      <MenuItem value={"Confirmed"} disabled={status === "Confirmed"}>
        Confirmed
      </MenuItem>
      <MenuItem value={"Shipped"} disabled={status === "Shipped"}>
        Shipped
      </MenuItem>
      <MenuItem value={"Delivered"} disabled={status === "Delivered"}>
        Delivered
      </MenuItem>
      <MenuItem value={"Canceled"} disabled={status === "Canceled"}>
        Canceled
      </MenuItem>
      <MenuItem value={"Returned"} disabled={status === "Returned"}>
        Returned
      </MenuItem>
    </Select>
  );
};

export default OrderStatus;
