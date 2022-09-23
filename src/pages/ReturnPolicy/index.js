import React from "react";
import Title from "../../components/Title";
import { Box, Container, Typography } from "@mui/material";

const Index = () => {
  return (
    <Container>
      <Title>Return and Refund policy</Title>

      <Box
        sx={{
          "& > *": {
            my: 2,
          },
        }}
      >
        <b>রিটার্ন এবং রি-ফান্ড পলিসিঃ</b>
        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          আমরা pndservicebd.com এর মাধ্যমে যেহেতু ঢাকা সহ সারা বাংলাদেশ এ
          ডেলিভারি করে থাকি, যদি কোন প্রকার সমস্যা হয় যেমনঃ কালার বা ডিজাইনের
          কোন সমস্যা অথবা একটা প্রডাক্ট এর জায়গায় অন্য একটা প্রডাক্ট চলে যাওয়া
          অথবা প্রডাক্টে কোন সমস্যা থাকে, আপনি ২৪ ঘন্টার মধ্যে আমাদের সাথে
          যোগাযোগ করবেন এবং আপনার সমস্যাটি আমাদেরকে বললে আমাদের কাছে যদি উক্ত
          প্রডাক্টটি stock এ থাকে তখন আমরা সম্পূর্ণ নিজস্ব ডেলিভারি খরচে আপনাদের
          হাতে উক্ত প্রডাক্ট টি পৌঁছে যাবে ৫ কর্মদিবসের মধ্যে এবং উক্ত প্রডাক্ট
          টি যদি available না থাকে সে ক্ষেত্রে আমরা ৫ কর্মদিবসের মধ্যে বিকাশ বা
          ব্যাংকের মাধ্যমে আপনার টাকা আপনার কাছে পৌছে দিব।
        </Typography>

        <b>বিশেষ দ্রষ্টব্যঃ </b>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          ২৪ ঘন্টার মধ্যে যোগাযোগ না করা হলে, সেক্ষেত্রে আপনার কোন অভিযোগ ই
          গ্রহনযোগ্য হবে না।
        </Typography>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          প্রডাক্ট এর কোন সমস্যা ব্যাতিতো আমরা কখনই প্রডাক্ট রিটার্ন বা
          এক্সচেঞ্জ করে থাকিনা।
        </Typography>
      </Box>
    </Container>
  );
};

export default Index;
