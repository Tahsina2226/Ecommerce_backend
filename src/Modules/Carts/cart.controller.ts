import { Request, Response } from "express";
import { Cart } from "./Cart.model";
import { Product } from "../catalog/catalog.model";
import { randomUUID } from "crypto";

// Create a new cart
export const createCart = async (_req: Request, res: Response) => {
  const token = randomUUID();
  const cart = new Cart({ token, items: [] });
  await cart.save();
  res.status(201).json({ token });
};

// Get cart
export const getCart = async (req: Request, res: Response) => {
  const { token } = req.params;
  const cart = await Cart.aggregate([
    { $match: { token } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $project: {
        token: 1,
        "items.quantity": 1,
        "product.title": 1,
        "product.variants": 1,
      },
    },
  ]);
  if (!cart.length) return res.status(404).json({ message: "Cart not found" });
  res.json(cart);
};

// Add item to cart
export const addItem = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { productId, variantId, quantity } = req.body;

  const cart = await Cart.findOne({ token });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items.push({ productId, variantId, quantity });
  await cart.save();
  res.json(cart);
};
