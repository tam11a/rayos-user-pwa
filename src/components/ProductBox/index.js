import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { authContext } from "../../context/authProvider";
import { rootURL } from "../../service/instance";
import ProductDialog from "./ProductDialog";

const Index = ({ product }) => {
  const authCntxt = React.useContext(authContext);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(!open);

  return (
    <>
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        component={Button}
        elevation={3}
        onClick={handleClose}
      >
        <Avatar
          src={rootURL + product.photo}
          alt={product.title_en}
          sx={{
            height: "85%",
            width: "100%",
            borderRadius: 0,
          }}
        />
        <Box
          sx={{
            flex: 1,
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "relative",
              maxWidth: "100%",
              pt: 0.5,
            }}
            noWrap={true}
          >
            {product.title_en}
          </Typography>
          {authCntxt.isVerified ? (
            <Typography
              variant="caption"
              sx={{
                position: "relative",
                maxWidth: "100%",
              }}
              noWrap={true}
            >
              {product.sell_price} TK
            </Typography>
          ) : (
            <></>
          )}
        </Box>
        {!product.quantity ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              height: "84%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#000000aa",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Out of Stock!!
          </Box>
        ) : (
          <></>
        )}
      </Paper>
      {open && (
        <ProductDialog
          open={open}
          handleClose={handleClose}
          product={product}
        />
      )}
    </>
  );
};

export default Index;
