import React from "react";

const Order = () => {
  
  const [params, setParams] = React.useState({
    method: "all",
    limit: 10,
    page: 1,
    filters: [],
  });
  return <div>Order</div>;
};

export default Order;
