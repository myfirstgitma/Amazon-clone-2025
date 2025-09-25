import React from "react";
import { Routes, Route } from "react-router-dom";
import LayOut from "../components/LayOut/LayOut"; // Adjust path as needed
import Landing from "./Landing/Landing";
import SignIn from "./Auth/SignIn";
import Payment from "./Payment/Payment";
import Orders from "./Orders/Orders";
import Cart from "./Cart/Cart";
import Results from "./Results/Results";
import ProductDetail from "./ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js"; // ✅ Correct import
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(
  "pk_test_51SAlPbB3TOLkajzhseMRqvIIAEpX7rWygMYKzgxURVAkAMQVaX9sktJBMy80wZv1Uw1HdqRMqkALo15bzlIQdSU7006ozondSU"
);

const Routing = () => {
  return (
    <LayOut>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<SignIn />} />
        <Route
          path="/payments"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </LayOut>
  );
};

export default Routing;
