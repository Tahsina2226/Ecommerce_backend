"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, min: 1 },
});
const CartSchema = new mongoose_1.Schema({
    token: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.Cart = (0, mongoose_1.model)("Cart", CartSchema);
