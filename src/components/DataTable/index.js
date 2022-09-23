import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";

const Index = ({ columns, rows, isLoading, onCellClick, ...others }) => {
  return (
    <Box
      sx={{
        height: isLoading || !rows.length ? "400px" : "fit-content",
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#E5E5E5",
          color: "black",
          fontWeight: 900,
          fontSize: 14,
        },
      }}
    >
      <DataGrid
        headerAlign
        disableColumnMenu
        disableColumnFilter
        disableSelectionOnClick={true}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        autoHeight={!(isLoading || !rows.length)}
        columns={columns}
        rows={rows}
        loading={isLoading}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        sx={{
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
            {
              outline: "none !important",
            },
        }}
        {...others}
      />
    </Box>
  );
};

export default Index;
