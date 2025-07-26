"use client";

import { useState } from "react";
import { useCart } from "../context/Cart";
import OrderSummary from "../components/OrderSummary";

export default function Checkout() {
  const { cart } = useCart();

  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    try {
      const cartData = cart?.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
      }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/stripe/session`,
        {
          method: "POST",
          body: JSON.stringify({ cartItems: cartData }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-md font-medium">
            Payment Method
          </div>

          <h2 className="text-4xl text-center">🔒 💳</h2>

          <p className="bg-gray-800 text-white p-6 rounded-lg text-lg">
            Clicking "Place Order" will securely redirect you to our trusted
            payment partner, Stripe, to complete your order.
          </p>

          <div className="flex justify-end mt-6">
            <button
              onClick={submitHandler}
              disabled={loading}
              className={`w-1/2 py-3 px-6 rounded-md text-white font-semibold transition ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
