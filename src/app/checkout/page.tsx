"use client";

import { useState } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("COD"); // Default to COD
  const [userInfo, setUserInfo] = useState({ name: "", address: "", contact: "" });

  // Placeholder cart data (replace with actual data from your backend or state management system)
  const cart: CartItem[] = [
    { name: "Chinese Rice", price: 600, quantity: 2 },
    { name: "Manchurian", price: 700, quantity: 1 },
    { name: "Gulab Jamun", price: 400, quantity: 3 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order confirmed! Payment method: ${paymentMethod}`);
    // You can send this information to your backend or order system here.
  };

  return (
    <div className="checkout-container">
      <h2 className="text-3xl font-bold text-center">Checkout</h2>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label className="block text-lg">Full Name:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Address:</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Contact Number:</label>
          <input
            type="text"
            name="contact"
            value={userInfo.contact}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Payment Method:</label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() => setPaymentMethod("Online")}
              />
              Online Payment (Coming soon)
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700"
        >
          Confirm Order
        </button>
      </form>

      {/* Checkout Summary */}
      <section className="mt-8">
        <h3 className="text-2xl font-bold">Order Summary</h3>
        <ul className="mt-4">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between mt-2">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <strong>
            Total: Rs.{" "}
            {cart.reduce(
              (total: number, item: CartItem) => total + item.price * item.quantity,
              0
            ).toFixed(2)}
          </strong>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
