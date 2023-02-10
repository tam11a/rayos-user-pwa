import React from "react";
import Title from "../../components/Title";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Index = () => {
  return (
    <Container>
      <Title>Delivery policy</Title>

      <Typography
        sx={{
          textAlign: "justify",
        }}
      >
        We remain driven to deliver your things as quickly as we can and in
        excellent condition since we understand how vital they are. We deliver
        our product all over the Bangladesh only. We provide only home delivery
        service. We want to provide best delivery service to our customer. we
        will try to finish delivery inside Dhaka within 4 days and outside Dhaka
        within 7 days. If a customer makes three failed deliveries without any
        valid reason, then this customer's COD will not get the payment method.
        We promise our customers to create an easy and fastest delivery in
        Bangladesh. Our delivery service divide in three section inside Dhaka,
        Dhaka subarea and outside Dhaka.
      </Typography>
    </Container>
  );
};

export default Index;
