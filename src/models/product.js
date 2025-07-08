import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";

const productSchema = new mongoose.Schema({
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
    maxLenght: 0,
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "Price must be greater than 0",
    },
  },
});
// productSchema.plugin(uniqueValidator, {
//   message: "Path must be unique",
// });
productSchema.index({ title: "text", description: "text" });
export default mongoose?.model?.product ||
  mongoose.model("Product", productSchema);
