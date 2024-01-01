"use client";

import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import CustomInput from "./CustomInput";

const submit = async (paymentInfos: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, paymentInfos };
};

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(3, "at least 3 letters"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email must be a valid email address"
        )
        .required("Email is required"),
      cardNumber: Yup.number().required(),
      cvv: Yup.number().required(),
      expirationDate: Yup.number().required(),
    }),
    onSubmit: (values) => {
      console.log("values==>", values);
    },
  });

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
          <CustomInput
            formik={formik}
            label="Email"
            name="email"
            type="email"
          />
        </span>
        <span className="flex flex-col space-y-2">
          <CustomInput
            formik={formik}
            label="Card information"
            name="cardNumber"
            type="text"
          />
          <span className="flex">
            <CustomInput formik={formik} name="expirationDate" type="text" />
            <CustomInput formik={formik} name="cvv" type="text" />
          </span>
        </span>
        <span className="flex flex-col space-y-2">
          <CustomInput
            formik={formik}
            label="Cardholder name"
            name="name"
            type="text"
          />
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
