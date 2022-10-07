import {
  Avatar,
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { authContext } from "../../context/authProvider";
import { baseURL } from "../../service/instance";
import ProductDialog from "./ProductDialog";

const Index = ({ product }) => {
  const authCntxt = React.useContext(authContext);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(!open);
  const navigate = useNavigate();

  return (
    <>
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          textDecoration: "none",
        }}
        component={Button}
        elevation={3}
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <Avatar
          src={baseURL + "/attachments/" + product.image}
          alt={product.title_en}
          sx={{
            height: "85%",
            width: "100%",
            borderRadius: 0,
          }}
        />

        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "relative",
              maxWidth: "100%",
              fontWeight: "600",
              pt: 0.5,
            }}
            noWrap={true}
          >
            {product.titleEn}
          </Typography>
          {/* {authCntxt.isVerified ? (
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
          )} */}
        </Box>

        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "relative",
              maxWidth: "100%",
              fontWeight: "600",
            }}
            noWrap={true}
          >
            {product.sellPrice || 0} TK
          </Typography>

          <Stack direction="row" alignItems={"center"}>
            <Rating
              name="half-rating-read"
              defaultValue={4.6}
              precision={0.1}
              size="small"
              readOnly
              sx={{
                fontSize: "0.9rem",
              }}
            />
            <Typography variant="caption">(14)</Typography>
          </Stack>
        </Box>

        {false ? (
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
