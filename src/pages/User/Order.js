import React from "react";
import {
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import moment from "moment";
import DataTable from "../../components/DataTable";
// import StateViewer from "../../components/StateViewer";
import tableOptionsStyle from "../../styles/tableOptions";
// import snackContext from "../../context/snackProvider";
import { Link, useParams } from "react-router-dom";
import { FaSlackHash } from "react-icons/fa";
import { authContext } from "../../context/authProvider";
import snackContext from "../../context/snackProvider";
import { useGetAllOrderForUser } from "../../query/order";
// import OrderStatus from "../../components/OrderStatus";

const Order = ({ uid }) => {
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const [params, setParams] = React.useState({
    method: "all",
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data, isLoading } = useGetAllOrderForUser(params);
  console.log(data);

  const getColor = (status) => {
    switch (status) {
      case "Pending":
        return "info";
      case "Shipped":
      case "Confirmed":
        return "black";
      case "Canceled":
      case "Returned":
        return "error";
      case "Delivered":
        return "success";
      default:
        return "default";
    }
  };

  const cols = [
    {
      headerName: "",
      field: "id",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <IconButton
            component={Link}
            size={"small"}
            color={"primary"}
            to={`/user/order/${params.row?._id}`}
          >
            <FaSlackHash />
          </IconButton>
        </>
      ),
      sortable: false,
    },
    {
      headerName: "Reciepent Phone",
      headerAlign: "center",
      align: "center",
      field: "phone",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return <Typography>{params.row.shipping?.phone || "-"}</Typography>;
      },
    },
    // {
    //   headerName: "Phone",
    //   field: "receiver_number",
    //   width: 120,
    //   sortable: false,
    // },
    // {
    //   headerName: "Address",
    //   headerAlign: "center",
    //   field: "shipping",
    //   align: "center",
    //   width: 200,
    //   sortable: false,
    // },
    {
      headerName: "Order Date",
      headerAlign: "center",
      align: "center",
      field: "createdAt",
      width: 170,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography>{moment(params.row.createdAt).format("lll")}</Typography>
        );
      },
    },
    // {
    //   headerName: "Date",
    //   field: "created_at",
    //   width: 170,
    //   headerAlign: "center",
    //   renderCell: (d) => {
    //     return <p>{moment(d.row.created_at).format("DD/MM/YYYY hh:mm a")}</p>;
    //   },
    //   sortable: false,
    // },
    {
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      field: "status",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (d) => (
        <Chip
          label={d.row.status}
          size={"small"}
          color={getColor(d.row.status)}
        />
      ),
      sortable: false,
    },
    {
      headerName: "Method",
      field: "paymentMethod",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Product Total",
      field: "totalSellPrice",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Shipping Fee",
      headerAlign: "center",
      field: "shippingFee",
      align: "center",
      sortable: false,
    },
    {
      headerName: "Voucher",
      headerAlign: "center",
      field: "voucher",
      align: "center",
      width: 120,
      renderCell: (params) => params.row?.voucher || "-",
      sortable: false,
    },
    {
      headerName: "Discount",
      headerAlign: "center",
      field: "discount",
      align: "center",
      sortable: false,
    },

    {
      headerName: "Total Price",
      headerAlign: "center",
      field: "total",
      align: "center",
      sortable: false,
    },
  ];

  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: "1px solid #ccc",
            my: 2,
          }}
        >
          <Grid
            container
            rowGap={1}
            columnGap={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item xs={12} sm={8.7}>
              <InputBase
                placeholder="Search Order"
                sx={tableOptionsStyle}
                onChange={(e) => {
                  setParams({
                    ...params,
                    filters: [
                      // `receiver_name~${e.target.value}`,
                      `receiver_number~${e.target.value}`,
                      // `receiver_address~${e.target.value}`,
                    ],
                  });
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Select
                sx={{
                  ...tableOptionsStyle,
                }}
                value={params.method}
                onChange={(e) =>
                  setParams({
                    ...params,
                    method: e.target.value,
                  })
                }
                fullWidth
              >
                <MenuItem value={"all"} disabled={params.method === "all"}>
                  All
                </MenuItem>
                <MenuItem
                  value={"Pending"}
                  disabled={params.method === "Pending"}
                >
                  Pending
                </MenuItem>
                <MenuItem
                  value={"Confirmed"}
                  disabled={params.method === "Confirmed"}
                >
                  Confirmed
                </MenuItem>
                <MenuItem
                  value={"Shipped"}
                  disabled={params.method === "Shipped"}
                >
                  Shipped
                </MenuItem>
                <MenuItem
                  value={"Delivered"}
                  disabled={params.method === "Delivered"}
                >
                  Delivered
                </MenuItem>
                <MenuItem
                  value={"Canceled"}
                  disabled={params.method === "Canceled"}
                >
                  Canceled
                </MenuItem>
                <MenuItem
                  value={"Returned"}
                  disabled={params.method === "Returned"}
                >
                  Returned
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Paper>

        <DataTable
          sx={{
            my: 2,
          }}
          columns={cols}
          rows={data?.data?.data || []}
          isLoading={isLoading}
          paginationMode={"server"}
          rowCount={data?.data?.total || 0}
          page={(params?.page || 1) - 1}
          onPageChange={(newPage) => {
            console.log(newPage + 1);
            setParams({
              ...params,
              page: newPage + 1,
            });
          }}
          pageSize={params?.limit}
          onPageSizeChange={(pageSize) =>
            setParams({
              ...params,
              limit: pageSize,
              page: 1,
            })
          }
        />
      </Container>
      ;
    </>
  );
};

export default Order;
