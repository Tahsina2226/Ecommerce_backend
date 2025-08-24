import { Schema, model } from "mongoose";

const VariantSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  variants: [VariantSchema],
  createdAt: { type: Date, default: Date.now },
});

export const Product = model("Product", ProductSchema);
