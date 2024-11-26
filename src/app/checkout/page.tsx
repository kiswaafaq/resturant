interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutPageProps {
  cart: CartItem[]; // Expecting an array of CartItem
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart }) => {
  return (
    <div className="checkout-page p-6">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some items to checkout!</p>
      ) : (
        <div className="cart-summary">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="text-sm">Price: Rs. {item.price}</p>
                </div>
                <p className="font-semibold">
                  Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-lg font-bold mt-6">
            Total: Rs.{" "}
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
          <button className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
