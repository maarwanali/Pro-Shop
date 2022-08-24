import { Schema, model, models } from "mongoose";

const ProductSchma = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  oldPrice: {
    type: Number,
  },
});

const Product = models.Product || model("Product", ProductSchma);

export default Product;
