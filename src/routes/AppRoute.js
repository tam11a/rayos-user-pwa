import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// pages
import Home from "../pages/Home";
import About from "../pages/About";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ReturnPolicy from "../pages/ReturnPolicy";
import DeliveryPolicy from "../pages/DeliveryPolicy";
import Search from "../pages/Search";
import Notification from "../pages/Notification";
import User from "../pages/User";
import PNDOrder from "../pages/PNDOrder";
import PNDOrderAddress from "../pages/PNDOrderAddress";
import PNDOrderCheckout from "../pages/PNDOrderCheckout";
import Order from "../pages/User/Order";
import Wallet from "../pages/User/Wallet";
import ProductView from "../pages/ProductView";

const AppRoute = () => {
  const location = useLocation();
  React.useEffect(() => {
    // console.log("scroll now");
    document
      .querySelector("html")
      .scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.querySelector("html").scrollTop = 0;
  }, [location]);
  return (
    <>
      <Routes path="/">
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="notification" element={<Notification />} />
        <Route path="about" element={<About />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="delivery-policy" element={<DeliveryPolicy />} />
        <Route path="user">
          <Route index element={<User />} />
          <Route path="order" element={<Order />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>
        <Route path="order">
          <Route index element={<Navigate to={"pnd"} />} />
          <Route path="pnd">
            <Route index element={<PNDOrder />} />
            <Route
              path="address"
              element={
                sessionStorage.getItem("orderList") ? (
                  <PNDOrderAddress />
                ) : (
                  <Navigate to={"../"} />
                )
              }
            />
            <Route
              path="checkout"
              element={
                sessionStorage.getItem("pnd_checkout") ? (
                  <PNDOrderCheckout />
                ) : (
                  <Navigate to={"../"} />
                )
              }
            />
          </Route>
          <Route path="bi" element={<>Brothers Importing Order</>} />
        </Route>
        <Route path="product/:productId" element={<ProductView />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};

export default AppRoute;
