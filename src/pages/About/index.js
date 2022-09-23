import React from "react";
import Title from "../../components/Title";
import { Container, Typography } from "@mui/material";

const Index = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <Typography
        sx={{
          textAlign: "justify",
        }}
      >
        PND সার্ভিস এমন একটি সার্ভিস কোম্পানি, যারা কাজ করছে সারাদেশের সে সব
        মানুষদের সাথে যারা প্রতিনিয়ত উদ্যোগতা হবার চেষ্টা করছে। কিন্তু পর্য়াপ্ত
        মুলধন, ডেলিভারি ও প্যাকেজিং সমস্যার কারনে তারা এগিয়ে যেতে পারছে না। PND
        সার্ভিস আপনাকে দিবে কোন প্রকার মুলধন ছাড়া, পুরো বাংলাদেশে ব্যবসা করার
        সুযোগ। আপনি কোন মুলধন ছাড়াই আমাদের পণ্য বিক্রি করতে পারবেন। এতে করে,
        আপনার লাভের অংশ থেকে আমরা নাম মাএ সার্ভিস ফি নিয়ে আপনার অর্ডার নেয়া পণ্য
        টি পাঠিয়ে দিব প্রাপকের ঠিকানা মতো। আর লাভের টাকা চলে যাবে আপনার ঠিকানায়।
      </Typography>
    </Container>
  );
};

export default Index;
