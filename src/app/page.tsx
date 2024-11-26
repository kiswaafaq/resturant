"use client";
import { useState } from "react";
import Image from "next/image";
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon from React Icons
import CheckoutPage from "@/app/checkout/page"; // Import CheckoutPage

// Define the type for a menu item
interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

const HomePage: React.FC = () => {
  // State to manage the cart and checkout visibility
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [showMessage, setShowMessage] = useState<string>('');  // Optional message for user feedback
  const [showCheckout, setShowCheckout] = useState(false); // Manage checkout page visibility

  // Function to add items to the cart
  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        // If item already exists, just increase its quantity
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
            : cartItem
        );
      } else {
        // Otherwise, add the item with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    setShowMessage('Item added to cart!');  // Show feedback
    setTimeout(() => setShowMessage(''), 2000);  // Hide feedback after 2 seconds
  };

  // Function to remove items from the cart
  const removeFromCart = (itemName: string) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.name === itemName && (cartItem.quantity || 0) > 1
            ? { ...cartItem, quantity: (cartItem.quantity || 0) - 1 }
            : cartItem.name !== itemName
            ? cartItem
            : null
        )
        .filter(Boolean) as MenuItem[] // Filter out null values
    );
  };

  // Scroll to Cart Section on Cart Icon Click
  const scrollToCart = () => {
    document.getElementById("cart-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate total items in cart
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <main className="min-h-screen p-6">
      {/* Top Bar with Cart Icon */}
      <section className="flex justify-between items-center p-4 bg-yellow-600 text-white">
        <h1 className="text-4xl font-extrabold">Uzma Foods</h1>
        <div className="flex items-center space-x-4 cursor-pointer" onClick={scrollToCart}>
          <div className="relative">
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="text-center py-8">
        <p className="mt-4 text-xl">Order delicious food online!</p>
        {showMessage && (
          <p className="mt-4 text-green-500 font-semibold">{showMessage}</p>
        )}
      </section>

      {/* Menu Section */}
      <section className="mt-8">
        <h2 className="text-3xl font-bold text-center">Our Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-center">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg p-6 flex flex-col items-center bg-white"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={150}
                className="rounded-lg"
              />
              <h3 className="mt-4 text-xl font-bold">{item.name}</h3>
              <p className="mt-2">{item.description || "No description available."}</p>
              <p className="mt-4 font-semibold text-lg">Rs. {item.price}</p>
              <button
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Section */}
      <section id="cart-section" className="mt-12">
        <h2 className="text-3xl font-bold text-center">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center mt-4">Your cart is empty.</p>
        ) : (
          <div className="mt-6 shadow-lg rounded-lg p-6 bg-white">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => removeFromCart(item.name)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="text-center">
              <p className="text-lg font-bold">
                Total: Rs.{" "}
                {cart
                  .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
                  .toFixed(2)}
              </p>
              <button
                className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700"
                onClick={() => setShowCheckout(true)} // Trigger checkout page render
              >
                Proceed to Checkout
              </button>

              {/* Only render CheckoutPage when showCheckout is true */}
              {showCheckout && cart.length > 0 && (
                <CheckoutPage cart={cart.map(item => ({ ...item, quantity: item.quantity || 1 }))} />
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

// Sample menu data
const menuItems: MenuItem[] = [
  {
    name: "Biryani",
    description:
      "Biryani is a mixed rice dish, mainly popular in South Asia. It is made with rice, some type of meat (chicken, goat, beef) and spices.",
    price: 800,
    image: "/biryani.jpg",
  },
  {
    name: "Chinese Rice",
    description: "Delicious fried rice with vegetables and egg.",
    price: 600,
    image: "/rice.webp",
  },
  {
    name: "Manchurian",
    description: "Tangy chicken Manchurian with a flavorful sauce. ",
    price: 700,
    image: "/manchurian.webp",
  },
  {
    name: "Gulab Jamun",
    description: "Sweet confectionary or dessert popular in South Asia.",
    price: 400,
    image: "/gulabjamun.webp",
  },
  {
    name: "Prawn Karhai ",
    description: "Prawn Karhai is a famous sea food.",
    price: 1000,
    image: "/prawnkarhai.jpg",
  }
];

export default HomePage;
