import { Schema, model } from "mongoose";

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  variantId: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const CartSchema = new Schema({
  token: { type: String, required: true, unique: true },
  items: [CartItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Cart = model("Cart", CartSchema);
