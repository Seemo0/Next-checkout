"use client";

import { orderData } from "@/data/db";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

const fetchOrders = async () => {
  return orderData;
};

const Products = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchOrders(),
  });

  if (data?.customer) {
    const customer = JSON.stringify(data.customer);
    localStorage.setItem("user", customer);
  }

  // for testing purposes, i know payment data should be stored in a safe place not accessible place
  if (data?.paymentMethod) {
    const payment = JSON.stringify(data.paymentMethod);
    localStorage.setItem("payment", payment);
  }
  // console.log("data===>", data);

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-96">isLoading...</div>
    );
  if (isError) return <div>Error during fetch , try again </div>;
  return (
    <div className="flex flex-col px-6 bg-white rounded-lg shadow-md w-96 p-3 gap-2">
      <span className="flex font-bold">{data?.customer.name}'s Cart</span>
      <div className="flex flex-col space-y-5 py-10 justify-center">
        {data?.order?.items.map((item, id) => (
          <ProductCard key={id} items={item} />
        ))}
        <span className="flex justify-end font-bold">
          {data?.order.totalPrice}$
        </span>
      </div>
    </div>
  );
};

export default Products;
