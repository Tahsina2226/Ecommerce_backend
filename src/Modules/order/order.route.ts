import { Router } from "express";
import { getOrders, getOrder } from "./order.controller";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrder);

export default router;
