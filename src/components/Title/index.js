import { Box, Typography } from "@mui/material";
import React from "react";

const Index = ({ children, ...rest }) => {
  return (
    <Box
      width={"fit-content"}
      marginX={"auto"}
      {...rest}
      sx={{
        mx: "auto",
        py: 2,
        textAlign: "center",
        textTransform: "uppercase",
      }}
    >
      <Typography variant="h6">{children}</Typography>
      <Box
        width={{ xs: "40px", md: "80px" }}
        marginX={"auto"}
        marginY={1}
        sx={{
          border: {
            xs: `1px solid`,
            md: `1.5px solid`,
          },
          borderColor: "primary.main",
          background: "primary.main",
          borderRadius: "20px",
        }}
      ></Box>
    </Box>
  );
};

export default Index;
