import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { IoWalletSharp } from "react-icons/io5";
import { authContext } from "../../context/authProvider";
import { useGetWalletByUser } from "../../query/order";

const Wallet = () => {
  const authCntxt = React.useContext(authContext);
  // wallet information
  const [walletInfo, setWalletInfo] = React.useState({});
  const { data: getWalletByUser } = useGetWalletByUser(
    authCntxt.userInfo.user_id
  );
  React.useEffect(() => {
    if (!getWalletByUser || !getWalletByUser.data.status) return;
    setWalletInfo(getWalletByUser.data.value);
  }, [getWalletByUser]);
  return (
    <Container
      sx={{
        my: 2,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ mx: "auto", width: "fit-content", mb: 1 }}
      >
        <IconButton color={"black"}>
          <IoWalletSharp />
        </IconButton>
        <Typography variant={"h6"}>
          Current Balance: {walletInfo.total_user_balance || 0} ৳
        </Typography>
      </Stack>

      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ mx: "auto", width: { xs: "100%", md: "fit-content" }, mb: 1 }}
      >
        <Button
          color={"black"}
          variant={"contained"}
          startIcon={<GiReceiveMoney />}
          fullWidth
          sx={{
            position: "relative",
            px: 2,
            mb: 3,
            width: {
              md: "fit-content",
            },
            mx: "auto",
          }}
        >
          Request for Money
        </Button>
      </Stack>
      <PNDOrder walletInfo={walletInfo} />
    </Container>
  );
};

const PNDOrder = ({ walletInfo }) => {
  return (
    <>
      <Grid container columnGap={1} rowGap={1} justifyContent={"center"}>
        <Grid item xs={5.5} sm={2.5}>
          <Button
            variant={"contained"}
            color={"white"}
            fullWidth
            sx={{ aspectRatio: "1/1" }}
          >
            <Stack direction={"column"} alignItems={"center"} rowGap={1}>
              <Typography variant={"h6"}>
                {walletInfo.total_user_earning || 0} ৳
              </Typography>
              <Divider width={"100%"} />
              <Typography variant={"caption"}>Total Earning</Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={5.5} sm={2.5}>
          <Button
            variant={"contained"}
            color={"white"}
            fullWidth
            sx={{ aspectRatio: "1/1" }}
          >
            <Stack direction={"column"} alignItems={"center"} rowGap={1}>
              <Typography variant={"h6"}>
                {walletInfo.total_user_pending || 0} ৳
              </Typography>
              <Divider width={"100%"} />
              <Typography variant={"caption"}>Total Pending</Typography>
            </Stack>
          </Button>
        </Grid>
        {/* <Grid item xs={5.5} sm={2.5}>
          <Button
            variant={"contained"}
            color={"white"}
            fullWidth
            sx={{ aspectRatio: "1/1" }}
          >
            <Stack direction={"column"} alignItems={"center"} rowGap={1}>
              <Typography variant={"h6"}>{orderList.length}</Typography>
              <Divider width={"100%"} />
              <Typography variant={"caption"}>Total Order</Typography>
            </Stack>
          </Button>
        </Grid> */}
        {/* <Grid item xs={5.5} sm={2.5}>
          <Button
            variant={"contained"}
            color={"white"}
            fullWidth
            sx={{ aspectRatio: "1/1" }}
          >
            <Stack direction={"column"} alignItems={"center"} rowGap={1}>
              <Typography variant={"h6"}>
                {walletInfo.total_user_balance || 0} ৳
              </Typography>
              <Divider width={"100%"} />
              <Typography variant={"caption"}>Total Balance</Typography>
            </Stack>
          </Button>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Wallet;
