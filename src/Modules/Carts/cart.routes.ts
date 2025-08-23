import { Router } from "express";
import { getOrCreateCart, addItemToCart } from "./cart.controller";

const router = Router();
router.get("/", getOrCreateCart);
router.post("/add", addItemToCart);

export default router;
