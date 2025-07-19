"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useCart } from "@/app/context/Cart";

function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        updateQuantity(item._id, prev - 1);
        return prev - 1;
      });
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => {
      updateQuantity(item._id, prev + 1);
      return prev + 1;
    });
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 1) {
      setQuantity(val);
      updateQuantity(item._id, val);
    }
  };

  return (
    <tr className="border-b text-center text-sm md:text-base">
      {/* Product Image */}
      <td className="p-4">
        <div className="flex justify-center items-center">
          <img
            src={item.image?.secure_url}
            alt={item.title}
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      </td>

      {/* Title */}
      <td className="p-4 text-gray-800 font-medium">{item.title}</td>

      {/* Price */}
      <td className="p-4 text-gray-600">${item.price.toFixed(2)}</td>

      {/* Quantity Controls */}
      <td className="p-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-lg rounded"
          >
            –
          </button>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={handleInputChange}
            className="w-12 text-center border border-gray-300 rounded"
          />
          <button
            onClick={handleIncrease}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-lg rounded"
          >
            +
          </button>
        </div>
      </td>

      {/* Subtotal */}
      <td className="p-4 text-gray-700 font-semibold">
        ${(item.price * quantity).toFixed(2)}
      </td>

      {/* Remove */}
      <td
        className="p-4 text-red-500 font-bold cursor-pointer"
        onClick={() => removeFromCart(item._id)}
      >
        ×
      </td>
    </tr>
  );
}

export default CartItem;
