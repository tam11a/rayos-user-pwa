import { Paper, Avatar, Stack, Grid, Typography, Rating } from "@mui/material";
import React from "react";

const Index = () => {
  return (
    <>
      <Paper elevation={0}>
        <Grid>
          <Stack
            direction="row"
            alignItems={"start"}
            justifyContent={"space-between"}
          >
            <Stack
              direction="row"
              columnGap={3}
              alignItems="start"
              width="40vw"
              minWidth={"200px"}
            >
              <Avatar sx={{ width: 56, height: 56 }} />
              <Stack direction="column" rowGap={0.5}>
                <Typography>User FullName </Typography>
                <Rating size="small" />
              </Stack>
            </Stack>
            <Typography>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Typography>
          </Stack>
        </Grid>
      </Paper>
    </>
  );
};

export default Index;
