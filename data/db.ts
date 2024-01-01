export const orderData = {
  order: {
    items: [
      {
        productId: "product_id_1",
        name: "Product 1",
        quantity: 2,
        price: 19.99,
      },
      {
        productId: "product_id_2",
        name: "Product 2",
        quantity: 1,
        price: 29.99,
      },
    ],
    totalPrice: 69.97,
  },
  customer: {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Cityville, USA",
  },
  paymentMethod: {
    type: "credit_card",
    cardNumber: "**** **** **** 1234",
    expirationDate: "12/25",
    cvv: "123",
  },
};
