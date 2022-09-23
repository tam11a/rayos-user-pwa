import { Alert, Container } from "@mui/material";
import React from "react";
import { IoMdNotificationsOff } from "react-icons/io";

const Index = () => {
  return (
    <Container
      sx={{
        mt: {
          md: 2,
        },
      }}
    >
      <Alert severity="error" icon={<IoMdNotificationsOff />}>
        No Notification to Show
      </Alert>
    </Container>
  );
};

export default Index;
