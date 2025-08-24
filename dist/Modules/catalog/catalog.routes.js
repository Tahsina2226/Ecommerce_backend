"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const validate_1 = require("../../utils/validate");
const catalog_controller_1 = require("./catalog.controller");
const router = (0, express_1.Router)();
const productSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3),
        description: zod_1.z.string().optional(),
        variants: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            price: zod_1.z.number().positive(),
        })),
    }),
});
router.get("/", catalog_controller_1.getProducts);
router.get("/:id", catalog_controller_1.getProduct);
router.post("/", (0, validate_1.validate)(productSchema), catalog_controller_1.createProduct);
exports.default = router;
