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
  const { data: cartData, isLoading, isError } = useGetCartByUser();

  // Set Cart List to State
  React.useEffect(() => {
    if (isLoading || isError || !cartData) return;
    if (!cartData.data.status) return;
    setCartList(cartData.data.value);
    var tmpST = 0;
    var tmpOL = {};
    cartData.data.value?.map((c) => {
      tmpST += parseFloat(c.total_amount);
      tmpOL[c.id] = {
        ...c,
        sell_price: c.price,
        total_amount_with_sell_price: c.price * c.quantity,
        ...orderList[c.id],
        ...finalChange[c.id],
      };
    });
    setSubtotalAmount(tmpST);
    setOrderList(tmpOL);
  }, [cartData]);

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
      <CartDrawer
        open={open}
        onClose={handleOpen}
        cartInfo={{
          total: cartList.length,
          subtotalAmount,
          cartList,
          isLoading,
          isError,
        }}
      />
      {children}
    </cartContext.Provider>
  );
};

export default Index;
