"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promo = void 0;
const mongoose_1 = require("mongoose");
const PromoSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true },
    type: { type: String, enum: ["percent", "fixed"], required: true },
    value: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
});
exports.Promo = (0, mongoose_1.model)("Promo", PromoSchema);
