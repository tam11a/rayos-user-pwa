import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";

const Index = ({ handleFunc, message, cancelOpen, handleOpen }) => {
  return (
    <>
      <Dialog
        open={cancelOpen}
        onClose={handleOpen}
        PaperProps={{
          sx: {
            minWidth: "340px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          <Box width={"30px"} />
          <Typography
            variant={"subtitle1"}
            sx={{
              color: "error.main",
              fontWeight: "bold",
            }}
          >
            Are You Sure ?
          </Typography>
          <IconButton size={"small"} onClick={handleOpen}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            rowGap: "7px",
          }}
        >
          <Typography variant={"body1"}>
            {message || "Want to Cancel?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant={"contained"}
            fullWidth
            color={"error"}
            onClick={handleFunc}
          >
            Yes
          </Button>
          <Button
            variant={"contained"}
            fullWidth
            color={"black"}
            onClick={handleOpen}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Index;
