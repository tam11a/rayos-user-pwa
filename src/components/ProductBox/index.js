import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { authContext } from "../../context/authProvider";
import { getAttachment } from "../../service/instance";

import { IoIosImages } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useToggleBookmark } from "../../query/product";
import snackContext from "../../context/snackProvider";
import { responseHandler } from "../../utilities/response-handler";

const Index = ({ product, hideBookmark }) => {
  const snack = React.useContext(snackContext);
  const authCntxt = React.useContext(authContext);
  const navigate = useNavigate();

  const { mutateAsync: toggleBookmark } = useToggleBookmark();

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
          pb: 1,
        }}
        component={Button}
        disableRipple
        elevation={0}
      >
        <Avatar
          src={getAttachment(product.image)}
          alt={product.title_en}
          variant={"square"}
          sx={{
            height: "85%",
            width: "100%",
            bgcolor: "#00000011",
            color: "primary.dark",
          }}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <IoIosImages
            style={{
              fontSize: "3em",
            }}
          />
        </Avatar>

        {!product.quantity ? (
          <Chip
            color={"error"}
            label={"Out of Stock"}
            sx={{
              position: "absolute",
              bottom: "60px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        ) : (
          <></>
        )}

        {!hideBookmark && authCntxt.isVerified ? (
          <IconButton
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              "& svg": {
                filter: "drop-shadow(0px 0px 10px #ffffff)",
              },
            }}
            color="error"
            aria-label="add to favorite"
            // disabled={bookmarkPressed}
            onClick={async () => {
              const res = await responseHandler(() =>
                toggleBookmark(product._id)
              );
              if (res.status) {
                snack.createSnack(res.msg);
              } else {
                snack.createSnack(res.msg, "error");
              }
            }}
          >
            {authCntxt.userInfo?.bookmarks?.includes(product._id) ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart />
            )}
          </IconButton>
        ) : (
          <></>
        )}

        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            textOverflow: "ellipsis",
          }}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <Typography
            variant="caption"
            sx={{
              position: "relative",
              maxWidth: "100%",
              fontWeight: "600",
              fontSize: "1em",
              pt: 0.5,
            }}
            noWrap={true}
          >
            {product.titleEn}
          </Typography>
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
          onClick={() => navigate(`/product/${product._id}`)}
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

          <Stack direction="row" alignItems={"center"} columnGap={0.5}>
            <Rating
              name="half-rating-read"
              defaultValue={3.6}
              precision={0.1}
              size="small"
              readOnly
              sx={{
                fontSize: "0.9rem",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: "600",
              }}
            >
              (14)
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default Index;
