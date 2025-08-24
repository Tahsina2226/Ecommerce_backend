import { Router } from "express";
import { z } from "zod";
import { validate } from "../../utils/validate";
import { createCart, getCart, addItem } from "./cart.controller";

const router = Router();

const itemSchema = z.object({
  body: z.object({
    productId: z.string(),
    variantId: z.string(),
    quantity: z.number().min(1),
  }),
});

router.post("/", createCart);
router.get("/:token", getCart);
router.post("/:token/items", validate(itemSchema), addItem);

export default router;
