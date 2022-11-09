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
import ProcessOrder from "../pages/ProcessOrder";
import User from "../pages/User";
import ProductView from "../pages/ProductView";
import Order from "../pages/User/Order";
import OrderInfo from "../pages/User/OrderInfo";
import Test from "../pages/Test";

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
        <Route path="product/:productId" element={<ProductView />} />
        <Route path="search" element={<Search />} />
        <Route path="notification" element={<Notification />} />
        <Route path="about" element={<About />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="delivery-policy" element={<DeliveryPolicy />} />
        <Route path="user">
          <Route index element={<User />} />
          <Route path="order">
            <Route index element={<Order />} />
            <Route path=":oid" element={<OrderInfo />} />
          </Route>
          {/* <Route path="wallet" element={<Wallet />} /> */}
        </Route>
        <Route path="process-order" element={<ProcessOrder />} />
        <Route path="test" element={<Test />} />
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
};

export default AppRoute;
