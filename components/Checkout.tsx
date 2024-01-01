"use client";

import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import CustomInput from "./form-inputs/CustomInput";
import RadioInput from "./form-inputs/RadioInput";

const submit = async (paymentInfos: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, paymentInfos };
};

const Checkout = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      cardType: "",
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
      cardType: Yup.string().required("Please select a payment method"),
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
      formik.resetForm();
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
      console.log("mutation Error: ", error);
    }
  };

  useEffect(() => {
    console.log("cardtype====>", formik.values.cardType);
    console.log("errors====>", formik.errors.cardType);
  }, [formik.values, formik.errors]);

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-2 space-y-4">
      <span className="font-bold">Paycheck</span>
      <span className="flex flex-col space-y-2">
        <CustomInput formik={formik} label="Email" name="email" type="email" />
      </span>
      <span className="flex flex-col space-y-1">
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
      <span className="flex flex-col space-y-1">
        <label htmlFor="cardType">Payment method</label>
        <span className="flex space-x-4">
          <RadioInput
            name="cardType"
            label="Credit Card"
            value="credit"
            formik={formik}
          />
          <RadioInput
            name="cardType"
            label="Debit Card"
            value="debit"
            formik={formik}
          />
        </span>
      </span>
      <CustomInput
        formik={formik}
        label="Cardholder name"
        name="name"
        type="text"
      />
      <button
        disabled={loading || !formik.isValid || !formik.dirty}
        className={`bg-[#0D2538] rounded-xl text-white relative h-8 ${
          loading || !formik.isValid || !formik.dirty
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={handleCheckout}
      >
        {loading ? "Loading..." : "Checkout"}
      </button>
    </div>
  );
};

export default Checkout;
