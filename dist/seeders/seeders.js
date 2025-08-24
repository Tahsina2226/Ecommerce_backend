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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const catalog_model_1 = require("../Modules/catalog/catalog.model");
const promo_model_1 = require("../Modules/promo/promo.model");
const Cart_model_1 = require("../Modules/Carts/Cart.model");
const order_model_1 = require("../Modules/order/order.model");
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";
const runSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("MongoDB connected");
        yield catalog_model_1.Product.deleteMany({});
        yield promo_model_1.Promo.deleteMany({});
        yield Cart_model_1.Cart.deleteMany({});
        yield order_model_1.Order.deleteMany({});
        console.log("Existing data cleared");
        const products = yield catalog_model_1.Product.insertMany([
            {
                title: "T-Shirt",
                description: "Comfortable cotton T-Shirt",
                variants: [
                    { name: "S", price: 10 },
                    { name: "M", price: 12 },
                    { name: "L", price: 14 },
                ],
            },
            {
                title: "Jeans",
                description: "Denim Jeans",
                variants: [
                    { name: "32", price: 25 },
                    { name: "34", price: 27 },
                ],
            },
            {
                title: "Hoodie",
                description: "Warm Hoodie",
                variants: [
                    { name: "M", price: 30 },
                    { name: "L", price: 32 },
                ],
            },
        ]);
        console.log("Products seeded");
        yield promo_model_1.Promo.insertMany([
            {
                code: "SUMMER10",
                type: "percent",
                value: 10,
                validFrom: new Date("2025-01-01"),
                validTo: new Date("2025-12-31"),
            },
            {
                code: "FLAT5",
                type: "fixed",
                value: 5,
                validFrom: new Date("2025-01-01"),
                validTo: new Date("2025-12-31"),
            },
        ]);
        console.log("Promos seeded");
        // Create guest cart
        const cart = new Cart_model_1.Cart({
            token: "guest-token-123",
            items: [
                {
                    productId: products[0]._id,
                    variantId: products[0].variants[0]._id,
                    quantity: 2,
                },
                {
                    productId: products[1]._id,
                    variantId: products[1].variants[1]._id,
                    quantity: 1,
                },
            ],
        });
        yield cart.save();
        console.log("Cart seeded");
        const subtotal = products[0].variants[0].price * 2 +
            products[1].variants[1].price * 1;
        const discount = 5;
        const total = subtotal - discount;
        yield order_model_1.Order.create({
            cartToken: cart.token,
            items: cart.items.map((item) => {
                const product = products.find((p) => p._id.equals(item.productId));
                const variant = product === null || product === void 0 ? void 0 : product.variants.find((v) => v._id.equals(item.variantId));
                return {
                    productId: item.productId,
                    variantId: item.variantId,
                    quantity: item.quantity,
                    price: (variant === null || variant === void 0 ? void 0 : variant.price) || 0,
                };
            }),
            subtotal,
            discount,
            total,
            status: "pending",
        });
        console.log("Orders seeded");
        console.log("Seeder finished successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("Seeder failed:", error);
        process.exit(1);
    }
});
runSeeder();
