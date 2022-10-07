import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";

const UpdateUser = () => {
  return (
    <>
      <Dialog
        open={false}
        PaperProps={{
          sx: {
            width: "95vw",
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Edit Profile</Typography>
          <IconButton size={"small"}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateUser;
