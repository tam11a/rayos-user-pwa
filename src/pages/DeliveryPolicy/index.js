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
      <Title>Delivery charge and time</Title>

      <Box
        sx={{
          "& > *": {
            my: 2,
          },
        }}
      >
        <b>ডেলিভারি টাইমঃ </b>
        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          pndservicebd.com এর মাধ্যমে আমরা ঢাকা সহ সারা বাংলাদেশ এ ডেলিভারি করে
          থাকি। এতে করে ঢাকার ভিতরে ১-২ কার্যদিবস এবং ঢাকার বাহিরে ২-৩
          কার্যদিবসের মধ্যেই ডেলিভারি সম্পূর্ণ করা হয়। সমস্ত প্রকার সরকারি ছুটি
          এই কার্যদিবসের বাহিরে। অনাকাঙ্ক্ষিত কারনে উক্ত কার্য দিবসের চেয়ে বেশি
          সময় লাগতে পারে।
        </Typography>

        <b>ডেলিভারি চার্জঃ </b>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          pndservicebd.com সাধারণত ডেলিভারি করার জন্য সবথেকে সহজ মাধ্যম state
          fast কুরিয়ার সার্ভিস ব্যবহার করে থাকে।
        </Typography>

        <b>রিসেলার দের জন্যঃ</b>

        <TableContainer
          sx={{
            textAlign: "center",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          <Table
            sx={{
              "& tr:last-child th": {
                border: "none",
              },
            }}
          >
            <TableHead
              sx={{
                bgcolor: "#00000011",
              }}
            >
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">ঢাকার ভিতরে</TableCell>
                <TableCell align="center">ঢাকার নিকটবর্তী</TableCell>
                <TableCell align="center">ঢাকার বাহিরে</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">১ কেজি পর্যন্ত</TableCell>
                <TableCell align="center">৬০ টাকা</TableCell>
                <TableCell align="center">১১০ টাকা</TableCell>
                <TableCell align="center">১৩০ টাকা</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">অতিরিক্ত প্রতি কেজি</TableCell>
                <TableCell align="center">প্রযোজ্য নয়</TableCell>
                <TableCell align="center">প্রযোজ্য নয়</TableCell>
                <TableCell align="center">প্রযোজ্য নয়</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">COD</TableCell>
                <TableCell align="center">প্রযোজ্য নয়</TableCell>
                <TableCell align="center">প্রযোজ্য নয়</TableCell>
                <TableCell align="center">প্রযোজ্য নয়</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          ঢাকার মধ্যে এ ৬০ টাকা, ঢাকার নিকটবর্তী এলাকা তথা, ঢাকা সিটি কর্পোরেশন
          এর বাহিরে কিন্তু ঢাকা জেলার মধ্যে ১১০ টাকা। এছাড়া ঢাকার বাহিরে ১৩০
          টাকা নেয়া হয়ে থাকে। এ ক্ষেএে ওজনের উপর নির্ভর করে কোন চার্জ বারানো হয়
          না এবং কোন প্রকার COD চার্জ ও নেয়া হয় না .
        </Typography>

        <b>হোলসেলারদের জন্যঃ</b>

        <TableContainer
          sx={{
            textAlign: "center",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          <Table
            sx={{
              "& tr:last-child th": {
                border: "none",
              },
            }}
          >
            <TableHead
              sx={{
                bgcolor: "#00000011",
              }}
            >
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">ঢাকার ভিতরে</TableCell>
                <TableCell align="center">ঢাকার নিকটবর্তী</TableCell>
                <TableCell align="center">ঢাকার বাহিরে</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">১ কেজি পর্যন্ত</TableCell>
                <TableCell align="center">৬০ টাকা</TableCell>
                <TableCell align="center">১১০ টাকা</TableCell>
                <TableCell align="center">১৩০ টাকা</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">অতিরিক্ত প্রতি কেজি</TableCell>
                <TableCell align="center">২০ টাকা</TableCell>
                <TableCell align="center">২০ টাকা</TableCell>
                <TableCell align="center">৩০ টাকা</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">COD</TableCell>
                <TableCell align="center">১%</TableCell>
                <TableCell align="center">১%</TableCell>
                <TableCell align="center">১%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          ঢাকার মধ্যে ৬০ টাকা, অতিরিক্ত প্রতি কেজিতে ২০ টাকা করে বৃদ্ধি পাবে
          সাথে ১% COD প্রযোজ্য।ঢাকার নিকটবর্তী তথা ঢাকা সিটি কর্পোরেশন এর বাহিরে
          কিন্তু ঢাকা জেলার মধ্যে ১১০ টাকা,অতিরিক্ত প্রতি কেজিতে ২০ টাকা করে
          বৃদ্ধি পাবে সাথে ১% COD প্রযোজ্য। ঢাকার বাহিরে ১৩০ টাকা, অতিরিক্ত
          প্রতি কেজিতে ৩০ টাকা বৃদ্ধি পাবে সাথে ১% COD প্রযোজ্য।
        </Typography>
      </Box>
    </Container>
  );
};

export default Index;
