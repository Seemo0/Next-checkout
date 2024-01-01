import React from "react";

interface ProductCardProps {
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ items }) => {
  return (
    <div className="flex gap-1 items-center justify-between">
      <div className="flex flex-col space-y-2">
        <span>Name: {items.name} </span>
        <span>Quantity: {items.quantity} </span>
      </div>
      <span className="font-bold">{items.price}$</span>
    </div>
  );
};

export default ProductCard;
