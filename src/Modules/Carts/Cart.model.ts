import { Schema, model } from "mongoose";

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  variantName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const CartSchema = new Schema({
  token: { type: String, required: true },
  items: [CartItemSchema],
  promoCode: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Cart = model("Cart", CartSchema);
