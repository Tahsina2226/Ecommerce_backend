"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = void 0;
const Cart_model_1 = require("../Carts/Cart.model");
const promo_model_1 = require("../promo/promo.model");
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { promoCode } = req.body;
    const cart = yield Cart_model_1.Cart.findOne({ token }).populate("items.productId");
    if (!cart || !cart.items.length)
        return res.status(400).json({ message: "Cart is empty" });
    let subtotal = 0;
    cart.items.forEach((item) => {
        const variant = item.productId.variants.id(item.variantId);
        subtotal += variant.price * item.quantity;
    });
    let discount = 0;
    if (promoCode) {
        const promo = yield promo_model_1.Promo.findOne({ code: promoCode });
        const now = new Date();
        if (promo && promo.validFrom <= now && promo.validTo >= now) {
            discount =
                promo.type === "percent" ? (subtotal * promo.value) / 100 : promo.value;
        }
    }
    const total = subtotal - discount;
    res.json({
        subtotal,
        discount,
        total,
        message: "Checkout successful",
    });
});
exports.checkout = checkout;
