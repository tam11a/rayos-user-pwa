import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import CTab from "../../components/CTab";
import CTabs from "../../components/CTabs";
import DataTable from "../../components/DataTable";
import React from "react";
import {
  useGetOrderListCartByUser,
  useGetWalletByUser,
} from "../../query/order";
import { authContext } from "../../context/authProvider";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

const Order = () => {
  const authCntxt = React.useContext(authContext);

  // route state for tabs
  const [route, setRoute] = React.useState("pnd");

  // // wallet information
  // const [walletInfo, setWalletInfo] = React.useState({});
  // const { data: getWalletByUser } = useGetWalletByUser(
  //   authCntxt.userInfo.user_id
  // );
  // React.useEffect(() => {
  //   if (!getWalletByUser || !getWalletByUser.data.status) return;
  //   setWalletInfo(getWalletByUser.data.value);
  // }, [getWalletByUser]);

  // // order list
  // const [orderList, setOrderList] = React.useState([]);
  // const { data: getOrderListByUser } = useGetOrderListCartByUser({
  //   uid: authCntxt.userInfo.user_id,
  // });
  // React.useEffect(() => {
  //   if (!getOrderListByUser || !getOrderListByUser?.data?.status) return;
  //   setOrderList(getOrderListByUser?.data?.value?.data?.data);
  // }, [getOrderListByUser]);
  return (
    <Container sx={{ mt: 1 }}>
      <CTabs
        value={route}
        sx={{
          width: "fit-content",
          minWidth: {
            xs: "90vw",
            sm: "350px",
          },
          maxWidth: "90vw",
          mx: "auto",
          my: 2,
        }}
        onChange={(e, newValue) => setRoute(newValue)}
      >
        <CTab value={"pnd"} label={"PND Orders"} />
        <CTab value={"bi"} label={"BI Orders"} />
      </CTabs>
      {route === "bi" ? (
        <PNDTable list={[]} columns={BIColumnList} />
      ) : (
        <PNDOrder uid={authCntxt.userInfo.user_id} columns={columnList} />
      )}
    </Container>
  );
};

const PNDOrder = ({ uid, columns }) => {
  const [params, setParams] = React.useState({
    uid: uid,
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data, isLoading } = useGetOrderListCartByUser(params);
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
                {data?.data?.value?.data?.total || 0}
              </Typography>
              <Divider width={"100%"} />
              <Typography variant={"caption"}>Total Order</Typography>
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
                {data?.data?.value?.total_pending_order || 0}
              </Typography>
              <Divider width={"100%"} />
              <Typography variant={"caption"}>Pending</Typography>
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
                {data?.data?.value?.total_delivered_order || 0}
              </Typography>
              <Divider width={"100%"} />
              <Typography variant={"caption"}>Delivered</Typography>
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
                {data?.data?.value?.total_cancel_order || 0}
              </Typography>
              <Divider width={"100%"} />
              <Typography variant={"caption"}>Canceled</Typography>
            </Stack>
          </Button>
        </Grid>
      </Grid>
      {/* <PNDTable list={orderList} columns={columns} /> */}
      <DataTable
        sx={{
          my: 2,
        }}
        columns={columns}
        rows={data?.data?.value?.data?.data || []}
        isLoading={isLoading}
        paginationMode={"server"}
        rowCount={data?.data?.value?.data?.total || 0}
        page={(params?.page || 1) - 1}
        onPageChange={(newPage) =>
          setParams({
            ...params,
            page: newPage + 1,
          })
        }
        pageSize={params?.limit}
        onPageSizeChange={(pageSize) =>
          setParams({
            ...params,
            limit: pageSize,
            page: 1,
          })
        }
      />
    </>
  );
};

const columnList = [
  {
    field: "receiver_name",
    headerName: "Receipent",
    width: "160",
  },
  {
    field: "receiver_number",
    headerName: "Phone",
    width: "150",
  },
  {
    field: "receiver_address",
    headerName: "Receipent Address",
    width: "220",
  },
  {
    field: "created_at",
    headerName: "Created At",
    renderCell: (d) => {
      return <p>{moment(d.row.created_at).format("hh:mm a DD/MM/YYYY")}</p>;
    },
    width: "160",
    align: "center",
    headerAlign: "center",
  },
  {
    headerName: "Status",
    field: "status",
    align: "center",
    headerAlign: "center",
    width: "150",
    renderCell: (d) => {
      var color;
      switch (d.row.status) {
        case "pending":
        case "new":
          color = "info";
          break;
        case "confirm":
          color = "secondary";
          break;
        case "cancel":
          color = "error";
          break;
        case "delivered":
          color = "success";
          break;
        default:
          color = "default";
          break;
      }
      return (
        <Chip
          label={d.row.status}
          color={color}
          // variant={"outlined"}
          size={"small"}
          sx={{
            textTransform: "uppercase",
          }}
        />
      );
    },
  },
  {
    headerName: "Whole Sale Price",
    field: "bi_price",
    align: "center",
    headerAlign: "center",
    width: "140",
  },
  {
    headerName: "PnD Fee",
    field: "pnd_total_fee",
    align: "center",
    headerAlign: "center",
  },
  {
    headerName: "PND Delivery Fee",
    field: "shipping_pnd_cost",
    align: "center",
    headerAlign: "center",
    renderCell: (d) => <p>-</p>,
    width: "140",
  },
  {
    headerName: "Reseller Price",
    field: "total_amount",
    align: "center",
    headerAlign: "center",
    width: "140",
  },
  {
    headerName: "Reseller Delivery Fee",
    field: "shipping_total_cost",
    align: "center",
    headerAlign: "center",
    width: "155",
  },
  {
    headerName: "Paid Advance",
    field: "paid_amount",
    align: "center",
    headerAlign: "center",
    renderCell: (d) => (
      <p>{JSON.parse(d.row.other_details)?.paid_amount || 0}</p>
    ),
    width: "140",
  },
  {
    headerName: "Total Due",
    field: "total_due",
    align: "center",
    headerAlign: "center",
    renderCell: (d) => (
      <p>
        {parseFloat(d.row.total_amount) +
          parseFloat(d.row.shipping_total_cost) -
          (parseFloat(JSON.parse(d.row.other_details)?.paid_amount) || 0)}
      </p>
    ),
  },
  {
    headerName: "My Profit",
    field: "reseller_profit",
    align: "center",
    headerAlign: "center",
  },
  {
    headerName: "My Due",
    field: "pay_pnd",
    align: "center",
    headerAlign: "center",
    renderCell: (d) => (
      <Typography color={"error"}>
        {parseFloat(JSON.parse(d.row.other_details)?.paid_amount) -
          parseFloat(d.row.reseller_profit) >
        0
          ? parseFloat(JSON.parse(d.row.other_details)?.paid_amount) -
            parseFloat(d.row.reseller_profit)
          : "-"}
      </Typography>
    ),
  },
];

const BIColumnList = [
  {
    field: "receiver_name",
    headerName: "Receipent",
    width: "160",
  },
  {
    field: "receiver_number",
    headerName: "Phone",
    width: "150",
    align: "center",
  },
  {
    field: "receiver_address",
    headerName: "Receipent Address",
    width: "220",
  },
  {
    field: "created_at",
    headerName: "Created At",
    renderCell: (d) => {
      return <p>{moment(d.row.created_at).format("hh:mm a DD/MM/YYYY")}</p>;
    },
    width: "160",
  },
  {
    headerName: "Status",
    field: "status",
    align: "center",
    renderCell: (d) => {
      var color;
      switch (d.row.status) {
        case "pending":
        case "new":
          color = "info";
          break;
        case "confirm":
          color = "secondary";
          break;
        case "cancel":
          color = "error";
          break;
        case "delivered":
          color = "success";
          break;
        default:
          color = "default";
          break;
      }
      return (
        <Chip
          label={d.row.status}
          color={color}
          size={"small"}
          sx={{
            textTransform: "uppercase",
          }}
        />
      );
    },
  },
  {
    headerName: "Product Price",
    field: "bi_price",
    align: "center",
    width: "140",
  },

  {
    headerName: "Delivery Fee",
    field: "shipping_pnd_cost",
    align: "center",
    renderCell: (d) => <p>-</p>,
  },

  {
    headerName: "Paid Advance",
    field: "paid_amount",
    align: "center",
    renderCell: (d) => <p>{JSON.parse(d.row.other_details).paid_amount}</p>,
  },
  {
    headerName: "Discount",
    field: "reseller_profit",
    align: "center",
  },
  {
    headerName: "Total Due",
    field: "shipping_total_cost",
    align: "center",
  },
];

const PNDTable = ({ list, columns }) => {
  // console.log(columnList, list);
  return (
    <Box
      sx={{
        height: "600px",
        my: 2,
      }}
    >
      <DataGrid
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        columns={columns}
        rows={list || []}
      />
    </Box>
  );
};

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Order Found!</Box>
    </StyledGridOverlay>
  );
}
export default Order;
