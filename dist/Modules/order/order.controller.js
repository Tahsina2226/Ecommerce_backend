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
exports.getOrder = exports.getOrders = void 0;
const order_model_1 = require("./order.model");
const getOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find();
    res.json(orders);
});
exports.getOrders = getOrders;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(req.params.id);
    if (!order)
        return res.status(404).json({ message: "Order not found" });
    res.json(order);
});
exports.getOrder = getOrder;
