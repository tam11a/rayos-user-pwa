import { Divider, LinearProgress } from "@mui/material";
import React from "react";

const LoadingDivider = ({ isLoading }) => {
  return isLoading ? <LinearProgress color="primary" /> : <Divider />;
};

export default LoadingDivider;
