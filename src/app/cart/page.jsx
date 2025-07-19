"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import CartItem from "@/app/components/CartItem";
import { useCart } from "@/app/context/Cart";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const { status } = useSession();

  let totalAmount = 0;
  cart.forEach((item) => (totalAmount += item.price * item.quantity));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        🛒 Your Shopping Cart
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white p-4">
        <table className="min-w-full table-auto text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr className="text-center">
              <th className="p-3">Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => <CartItem key={item._id} item={item} />)
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Your cart is empty 💤
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total & Actions */}
      {cart.length > 0 && (
        <>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Total: ${totalAmount.toFixed(2)}
            </h3>

            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition duration-200"
            >
              Clear Cart
            </button>
          </div>

          <div className="mt-8 flex justify-center">
            {status !== "authenticated" ? (
              <Link
                href={`/login?callbackUrl=/cart`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
              >
                Login to Proceed to Checkout
              </Link>
            ) : (
              <Link
                href="/checkout"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
              >
                Proceed to Checkout
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
