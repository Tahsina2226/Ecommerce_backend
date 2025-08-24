"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catalog_routes_1 = __importDefault(require("./Modules/catalog/catalog.routes"));
const cart_routes_1 = __importDefault(require("./Modules/Carts/cart.routes"));
const promo_route_1 = __importDefault(require("./Modules/promo/promo.route"));
const checkout_route_1 = __importDefault(require("./Modules/checkout/checkout.route"));
const order_route_1 = __importDefault(require("./Modules/order/order.route"));
const errorHandler_1 = require("./Middlewares/errorHandler");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the E-commerce API!" });
});
app.use("/products", catalog_routes_1.default);
app.use("/cart", cart_routes_1.default);
app.use("/promos", promo_route_1.default);
app.use("/checkout", checkout_route_1.default);
app.use("/orders", order_route_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
