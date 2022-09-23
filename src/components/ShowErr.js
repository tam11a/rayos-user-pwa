import { Alert } from "@mui/material";
import React from "react";

const ShowErr = ({ obj }) => {
  return <>{obj && <Alert severity="error">{obj.message}</Alert>}</>;
};

export default ShowErr;
