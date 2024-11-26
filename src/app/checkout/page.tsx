"use client";

import React, { useState } from "react";

// Define the type for cart items
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutPageProps {
  cart: CartItem[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("COD");
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    contact: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate contact number
    const phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(userInfo.contact)) {
      alert("Please enter a valid 11-digit contact number.");
      return;
    }

    alert(`Order confirmed! Payment method: ${paymentMethod}`);
  };

  return (
    <div className="checkout-container p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>

      {/* Form for user details */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg mb-2">Full Name:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-lg mb-2">Address:</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-lg mb-2">Contact Number:</label>
          <input
            type="text"
            name="contact"
            value={userInfo.contact}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-lg mb-2">Payment Method:</label>
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
                onChange={() => alert("Online payment coming soon!")}
                disabled
              />
              Online Payment (Coming soon)
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700"
        >
          Confirm Order
        </button>
      </form>

      {/* Order Summary */}
      <section className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 font-bold text-lg">
          Total: Rs.{" "}
          {cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
