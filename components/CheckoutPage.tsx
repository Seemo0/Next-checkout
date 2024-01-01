import React from "react";
import Products from "./Products";
import Checkout from "./Checkout";

const CheckoutPage = () => {
  return (
    <div className="flex gap-10 flex-col lg:flex-row justify-between h-[100%] bg-white">
      <Products />
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
