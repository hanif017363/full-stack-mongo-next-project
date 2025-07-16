import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      minLength: 1,
      maxLength: 100,
      text: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      minLength: 1,
      maxLength: 500,
      text: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      validate: {
        validator: (value) => value > 0,
        message: "Price must be greater than 0",
      },
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
  },
  { timestamps: true, collection: "product" } // ← Add this line
);

productSchema.index({ title: "text", description: "text" });

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
