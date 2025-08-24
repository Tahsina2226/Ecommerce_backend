"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const validate_1 = require("../../utils/validate");
const promo_controller_1 = require("./promo.controller");
const router = (0, express_1.Router)();
const promoSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string().min(3).toUpperCase(),
        type: zod_1.z.enum(["percent", "fixed"]),
        value: zod_1.z.number().positive(),
        validFrom: zod_1.z.string().datetime(),
        validTo: zod_1.z.string().datetime(),
    }),
});
router.post("/", (0, validate_1.validate)(promoSchema), promo_controller_1.createPromo);
exports.default = router;
