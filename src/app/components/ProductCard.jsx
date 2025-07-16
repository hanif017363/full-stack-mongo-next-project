"use client";

import Image from "next/image";

const ProductCard = ({ product }) => {
  const addToCart = (product) => {
    console.log("Add to cart:", product); // replace with actual logic
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-105 p-4 flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-48 sm:h-56 md:h-60 bg-gray-100 rounded-md overflow-hidden mb-4">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h3>

        <p className="text-gray-700">
          <span className="text-green-600 font-bold">${product.price}</span>
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition mt-auto"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
