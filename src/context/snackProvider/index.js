import React from "react";
import { Snackbar, Alert } from "@mui/material";

const snackContext = React.createContext();

export const SnackProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [saverity, setSaverity] = React.useState();
  const [message, setMessage] = React.useState("");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const createSnack = (message, saverity) => {
    setSaverity(saverity || "success");
    setMessage(message);
    handleClick();
  };

  return (
    <snackContext.Provider
      value={{
        createSnack,
      }}
    >
      {children}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={saverity || "success"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </snackContext.Provider>
  );
};

export default snackContext;
