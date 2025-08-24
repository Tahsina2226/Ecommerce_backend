import { Router } from "express";
import { checkout } from "./checkout.controller";

const router = Router();

router.post("/:token", checkout);

export default router;
