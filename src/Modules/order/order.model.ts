import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model("Order", OrderSchema);
