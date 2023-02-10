import React from "react";
import Title from "../../components/Title";
import { Box, Container, Typography } from "@mui/material";

const Index = () => {
  return (
    <Container>
      <Title>Return and refund policy</Title>

      <Box
        sx={{
          py: 2,
          "& > *": {
            my: 2,
          },
        }}
      >
        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          <b>Conditions for Returns</b>
        </Typography>
        <Typography>
          we provide a 7-day return policy. but it has some condition. The item
          must be undamaged, unwashed, and flawless. If some medical accessories
          and other products were opened, will not be take returned to that
          product (strip). The item must come with all of its original tags,
          user manual, warranty cards, receipts, and other accessories. The item
          must be sent back in the manufacturer's original, undamaged packing or
          box.
        </Typography>
        <Typography>
          {" "}
          <b>For claims</b>
        </Typography>
        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          Customers must make any claims for damage in front of the delivery
          person or courier office employees, or else they will not be
          considered. For each item, customers must provide an unboxing video in
          which the unpacking, invoice, and other details should be readily
          visible for internal and external investigation. If we find our
          mistake then we will refund the money within 7 to 15 working days.
        </Typography>

        <Typography>
          {" "}
          <b>Return process</b>
        </Typography>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          If a customer wants to return his product, then the customer contacts
          us. phone: 09639129215, email: rayosbd92@gmail.com. we will take the
          next step to return your product
        </Typography>
      </Box>
    </Container>
  );
};

export default Index;
