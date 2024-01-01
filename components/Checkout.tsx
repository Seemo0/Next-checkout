"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const submit = async (paymentInfos: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, paymentInfos };
};

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationKey: ["checkout"],
    mutationFn: async () => {
      const payment = localStorage.getItem("payment");

      const response = await submit(JSON.parse(payment!));

      return response;
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Checkout successful");
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const handleCheckout = () => {
    setLoading(true);
    try {
      mutation.mutate();
    } catch (error) {
      console.log("mutation Error", error);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <span>Paycheck</span>
      <div>
        <span className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
        </span>
        <span className="flex flex-col space-y-2">
          <label htmlFor="card">Card Information</label>
          <span className="flex flex-col">
            <input type="text" name="card" />
            <span>
              <input type="text" name="card" />
              <input type="text" name="card" />
            </span>
          </span>
        </span>
        <span className="flex flex-col space-y-2">
          <label htmlFor="user">Cardholder name</label>
          <input type="text" name="user" />
        </span>
      </div>
      <button
        disabled={loading}
        className="bg-red-300"
        onClick={handleCheckout}
      >
        {loading ? "Loading..." : "Checkout"}
      </button>
    </div>
  );
};

export default Checkout;
