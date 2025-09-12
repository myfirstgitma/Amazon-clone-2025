import React from "react";
import { Routes, Route } from "react-router-dom";
import LayOut from "../components/LayOut/LayOut"; // Adjust path as needed
import Landing from "./Landing/Landing";
import SignIn from "./Auth/SignIn";
import Payment from "./Payment/Payment";
import Orders from "./Orders/Orders";
import Cart from "./Cart/Cart";
import Results from "./Results/Results"

const Routing = () => {
  return (
    <LayOut>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />}/>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </LayOut>
  );
};

export default Routing;