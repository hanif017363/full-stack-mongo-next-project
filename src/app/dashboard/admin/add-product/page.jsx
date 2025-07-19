"use client";

import { useState, useEffect } from "react";
import { addProduct } from "@/app/action/product";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const [imgUrl, setImgUrl] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
          setProduct((prev) => ({ ...prev, category: data[0]?.title || "" }));
        });
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.name === "price" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "our-first-project");
    data.append("cloud_name", "dl3d8y9fw");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dl3d8y9fw/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    const img = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    setProduct({ ...product, image: img });
    setImgUrl(result.secure_url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) {
      return alert(`Please wait until the image uploading is done`);
    }
    addProduct(product);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add New Product
        </h2>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories?.map((cat) => (
              <option key={cat?._id} value={cat?.title}>
                {cat?.title}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Upload
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-blue-50 file:text-sm file:text-gray-700"
          />
          {imgUrl && (
            <img
              src={imgUrl}
              alt="Uploaded"
              className="mt-4 w-24 h-24 object-cover rounded-lg border border-gray-300"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
