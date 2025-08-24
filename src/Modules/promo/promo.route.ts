import { Router } from "express";
import { z } from "zod";
import { validate } from "../../utils/validate";
import { createPromo } from "./promo.controller";

const router = Router();

const promoSchema = z.object({
  body: z.object({
    code: z.string().min(3).toUpperCase(),
    type: z.enum(["percent", "fixed"]),
    value: z.number().positive(),
    validFrom: z.string().datetime(),
    validTo: z.string().datetime(),
  }),
});

router.post("/", validate(promoSchema), createPromo);

export default router;
