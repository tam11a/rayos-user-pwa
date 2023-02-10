import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Title from "../../components/Title";

const Index = () => {
  return (
    <Container>
      <Title>Terms and Conditions</Title>

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
          Welcome to rayos bd
        </Typography>
        <Typography>
          These terms and conditions outline the rules and regulations for the
          use of rayos bd's Website, located at https://rayosbd.com/.
        </Typography>
        <Typography>
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use rayosbd if you do not agree to take
          all of the terms and conditions stated on this page.
        </Typography>
        <Typography>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice, and all Agreements. All terms
          refer to the offer, acceptance, and consideration of payment necessary
          to undertake the process of our assistance to the Client in the most
          appropriate manner for the express purpose of meeting the Client’s
          needs in respect of the provision of the Company’s stated services, in
          accordance with and subject to, prevailing law of Bangladesh.
        </Typography>

        <Typography>
          {" "}
          <b>Cookies</b>
        </Typography>
        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          We use your cookies. By accessing rayosbd, you agreed to use cookies
          in agreement with the rayos bd's. Most interactive websites use
          cookies to let us retrieve the user’s details for each visit. Cookies
          are used by our website to enable the functionality of certain areas
          to make it easier for people visiting our website.
        </Typography>

        <Typography>
          {" "}
          <b>Government Law</b>
        </Typography>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          The laws governing e-commerce in Bangladesh shall govern the
          interpretation and application of these Terms of Service and any other
          agreements under which we supply you with Services. A Bangladeshi
          court with appropriate jurisdiction must hear any and all actionable
          legal claims or actions originating from or related to this website.
        </Typography>

        <Typography>
          {" "}
          <b>Your Account</b>
        </Typography>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          You are responsible for protecting the privacy of your user name,
          password, account information, and any other private data associated
          with it. You acknowledge that you have this obligation to maintain the
          security of your account at all times and to take all reasonable
          precautions to prevent unauthorized use of your account. If you have
          any cause to suspect that someone else knows your password or if you
          feel it is now being used or will be used in an unlawful manner, you
          should let us know right once.
        </Typography>

        <Typography>
          {" "}
          <b>Refund</b>
        </Typography>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          If an order is canceled, the payment for that transaction will be
          returned within 4 to 10 working days, however, it could take longer in
          rare circumstances involving other payment methods, governmental
          agencies, or other factors. payment number must be verified. As long
          as the amount of any gifts, bonuses, or cash rewards that have been
          received, if any, will be adjusted with the refund amount when
          applied.
        </Typography>
        <Typography>
          {" "}
          <b>Order Cancelation</b>
        </Typography>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          Prior to dispatch and for any reason, Rayos BD reserves the right to
          cancel any order. before the shipment customer reserves the right to
          cancel his/her order with valid reasons. These reasons may include,
          but are not limited to, the product being mispriced, out of stock,
          expired, defective, malfunctioning, and/or containing incorrect
          information or description due to a technical or typographical error.
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          These terms and conditions reserve the customer's right.
        </Typography>
      </Box>
    </Container>
  );
};

export default Index;
