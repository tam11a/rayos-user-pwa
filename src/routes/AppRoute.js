import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// pages
// import Home from "../pages/Home";
// import About from "../pages/About";
// import PrivacyPolicy from "../pages/PrivacyPolicy";
// import ReturnPolicy from "../pages/ReturnPolicy";
// import DeliveryPolicy from "../pages/DeliveryPolicy";
// import Search from "../pages/Search";
// import Notification from "../pages/Notification";
// import ProcessOrder from "../pages/ProcessOrder";
// import User from "../pages/User";
// import ProductView from "../pages/ProductView";
// import Order from "../pages/User/Order";
// import OrderInfo from "../pages/User/OrderInfo";

const Home = React.lazy(() => import("../pages/Home"));
const PrivacyPolicy = React.lazy(() => import("../pages/PrivacyPolicy"));
const ReturnPolicy = React.lazy(() => import("../pages/ReturnPolicy"));
const Notification = React.lazy(() => import("../pages/Notification"));
const DeliveryPolicy = React.lazy(() => import("../pages/DeliveryPolicy"));
const ProcessOrder = React.lazy(() => import("../pages/ProcessOrder"));
const ProductView = React.lazy(() => import("../pages/ProductView"));
const Order = React.lazy(() => import("../pages/User/Order"));
const OrderInfo = React.lazy(() => import("../pages/User/OrderInfo"));
const Search = React.lazy(() => import("../pages/Search"));
const About = React.lazy(() => import("../pages/About"));
const User = React.lazy(() => import("../pages/User"));
const TermsAndConditions = React.lazy(() =>
  import("../pages/TermsAndConditions")
);

const AppRoute = () => {
  const location = useLocation();
  // React.useEffect(() => {
  //   // console.log("scroll now");
  //   document
  //     .querySelector("html")
  //     .scrollTo({ top: 0, left: 0, behavior: "smooth" });
  //   document.querySelector("html").scrollTop = 0;
  // }, [location]);
  return (
    <>
      <Suspense>
        <Routes path="/">
          <Route index element={<Home />} />
          <Route path="product/:productId" element={<ProductView />} />
          <Route path="search" element={<Search />} />
          <Route path="notification" element={<Notification />} />
          <Route path="about" element={<About />} />
          <Route path="return-policy" element={<ReturnPolicy />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="delivery-policy" element={<DeliveryPolicy />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="user">
            <Route index element={<User />} />
            <Route path="order">
              <Route index element={<Order />} />
              <Route path=":oid" element={<OrderInfo />} />
            </Route>
            {/* <Route path="wallet" element={<Wallet />} /> */}
          </Route>
          <Route path="process-order" element={<ProcessOrder />} />
          <Route path="*" element={<>404</>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoute;
