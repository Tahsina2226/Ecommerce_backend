"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const validate_1 = require("../../utils/validate");
const cart_controller_1 = require("./cart.controller");
const router = (0, express_1.Router)();
const itemSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string(),
        variantId: zod_1.z.string(),
        quantity: zod_1.z.number().min(1),
    }),
});
router.post("/", cart_controller_1.createCart);
router.get("/:token", cart_controller_1.getCart);
router.post("/:token/items", (0, validate_1.validate)(itemSchema), cart_controller_1.addItem);
exports.default = router;
