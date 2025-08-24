import { Router } from "express";
import { z } from "zod";
import { validate } from "../../utils/validate";
import { getProducts, getProduct, createProduct } from "./catalog.controller";

const router = Router();

const productSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    variants: z.array(
      z.object({
        name: z.string(),
        price: z.number().positive(),
      })
    ),
  }),
});

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", validate(productSchema), createProduct);

export default router;
