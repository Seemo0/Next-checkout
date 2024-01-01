import React from "react";
import Products from "./Products";
import Checkout from "./Checkout";

const CheckoutPage = () => {
  return (
    <div className="flex gap-10 flex-col lg:flex-row bg-[#F4F7FA] p-6 rounded-lg shadow-lg">
      <Products />
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
