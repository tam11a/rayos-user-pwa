import React from "react";
import { useGetCartByUser } from "../../query/cart";
import { authContext } from "../authProvider";
import CartDrawer from "./CartDrawer";

export const cartContext = React.createContext();

const Index = ({ children }) => {
  const authCntxt = React.useContext(authContext);
  // Toggle State
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  // Cart State
  const [cartList, setCartList] = React.useState([]);
  const [subtotalAmount, setSubtotalAmount] = React.useState(0);

  // Manage OrderList
  const [orderList, setOrderList] = React.useState(
    sessionStorage.getItem("orderList")
      ? JSON.parse(sessionStorage.getItem("orderList"))
      : {}
  );
  const [finalChange, setFinalChange] = React.useState({});

  const updateCartFromOrderList = async (id, data) => {
    setOrderList({
      ...orderList,
      [id]: {
        ...orderList[id],
        ...data,
      },
    });
    setFinalChange({
      ...finalChange,
      [id]: {
        ...finalChange[id],
        ...data,
      },
    });
  };

  // Fetch Category Data
  const {
    data: cartData,
    isLoading,
    isError,
  } = useGetCartByUser(authCntxt.isVerified);

  // Set Cart List to State
  React.useEffect(() => {
    arrangeCartData();
  }, [cartData]);

  const arrangeCartData = () => {
    if (isLoading || isError || !cartData) return;
    if (!cartData.status) return;
    setCartList(cartData.data.data);
    var tmpST = 0;
    cartData.data.data?.map((c) => {
      tmpST += parseFloat(c.variant.product.sellPrice) * c.quantity;
    });
    setSubtotalAmount(tmpST);
  };

  React.useEffect(() => {
    if (authCntxt.isVerified && !isError) return;
    setCartList([]);
  }, [authCntxt.isVerified, isError]);

  return (
    <cartContext.Provider
      value={{
        handleOpen,
        total: cartList?.length,
        subtotalAmount,
        cartList,
        isLoading,
        isError,
        orderList,
        setOrderList,
        updateCartFromOrderList,
        saveOL: () =>
          sessionStorage.setItem("orderList", JSON.stringify(orderList)),
        removeOL: () => sessionStorage.removeItem("orderList"),
      }}
    >
      <CartDrawer open={open} onClose={handleOpen} />
      {children}
    </cartContext.Provider>
  );
};

export default Index;
