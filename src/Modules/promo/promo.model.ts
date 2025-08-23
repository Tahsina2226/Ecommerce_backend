import { Schema, model } from "mongoose";

const PromoSchema = new Schema({
  code: { type: String, required: true },
  type: { type: String, enum: ["percent", "fixed"], required: true },
  value: { type: Number, required: true },
  validFrom: Date,
  validTo: Date,
});

export const Promo = model("Promo", PromoSchema);
