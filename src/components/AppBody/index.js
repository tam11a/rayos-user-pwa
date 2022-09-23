import { Container } from "@mui/material";
import React from "react";

const Index = ({ children }) => {
  return (
    <Container
      sx={{
        minHeight: "60vh",
        px: "0 !important",
        maxWidth: "100vw",
        // overflowX: "hidden",
      }}
    >
      {children}
    </Container>
  );
};

export default Index;
