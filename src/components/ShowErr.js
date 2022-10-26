import { Alert, Collapse } from "@mui/material";
import React from "react";

const ShowErr = ({ obj }) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setOpen(!!obj), [obj]);
  return (
    <Collapse
      in={open}
      sx={{
        width: "100%",
        my: 0,
      }}
    >
      <Alert
        severity="error"
        sx={{
          width: "100%",
        }}
        onClose={() => setOpen(false)}
      >
        {obj?.type === "required"
          ? "This Field is Required!"
          : obj?.message || "Something wrong here!"}
      </Alert>
    </Collapse>
  );
};

export default ShowErr;
