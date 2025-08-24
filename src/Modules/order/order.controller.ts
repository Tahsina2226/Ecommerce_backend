import { Request, Response } from "express";
import { Order } from "./order.model";
import { Cart } from "../Carts/Cart.model";

export const getOrders = async (_req: Request, res: Response) => {
  const orders = await Order.find();
  res.json(orders);
};

export const getOrder = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};
