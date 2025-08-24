"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
const OrderSchema = new mongoose_1.Schema({
    cartToken: { type: String, required: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "paid", "shipped", "completed", "cancelled"],
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
});
exports.Order = (0, mongoose_1.model)("Order", OrderSchema);
