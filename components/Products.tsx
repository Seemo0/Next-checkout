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
  
  if (data?.paymentMethod) {
    const payment = JSON.stringify(data.paymentMethod);
    localStorage.setItem("payment", payment);
  }
  console.log("data===>", data);

  if (isLoading) return <div>isLoading...</div>;
  if (isError) return <div>Error during fetch , try again </div>;
  return (
    <div className="flex flex-col px-6 bg-white p-3 gap-2">
      <div className="flex justify-between p-1">
        <span>{data?.customer.name}'s Cart</span>
        <span>{data?.order.totalPrice}$</span>
      </div>
      <div className="flex flex-col space-y-2 py-10 justify-center">
        {data?.order?.items.map((item, id) => (
          <ProductCard key={id} items={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
