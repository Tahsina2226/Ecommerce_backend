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
exports.addItem = exports.getCart = exports.createCart = void 0;
const Cart_model_1 = require("./Cart.model");
const crypto_1 = require("crypto");
// Create a new cart
const createCart = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, crypto_1.randomUUID)();
    const cart = new Cart_model_1.Cart({ token, items: [] });
    yield cart.save();
    res.status(201).json({ token });
});
exports.createCart = createCart;
// Get cart
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const cart = yield Cart_model_1.Cart.aggregate([
        { $match: { token } },
        { $unwind: "$items" },
        {
            $lookup: {
                from: "products",
                localField: "items.productId",
                foreignField: "_id",
                as: "product",
            },
        },
        { $unwind: "$product" },
        {
            $project: {
                token: 1,
                "items.quantity": 1,
                "product.title": 1,
                "product.variants": 1,
            },
        },
    ]);
    if (!cart.length)
        return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
});
exports.getCart = getCart;
// Add item to cart
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { productId, variantId, quantity } = req.body;
    const cart = yield Cart_model_1.Cart.findOne({ token });
    if (!cart)
        return res.status(404).json({ message: "Cart not found" });
    cart.items.push({ productId, variantId, quantity });
    yield cart.save();
    res.json(cart);
});
exports.addItem = addItem;
