import { Router } from "express";
import { getAllProducts, getProductById } from "./catalog.controller";

const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
