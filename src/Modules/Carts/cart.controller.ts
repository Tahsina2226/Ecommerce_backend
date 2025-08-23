import { Request, Response } from "express";
import { Cart } from "./Cart.model";
import { Product } from "../product/product.model";

export const getOrCreateCart = async (req: Request, res: Response) => {
  const token = req.headers["x-cart-token"] as string;
  if (!token) return res.status(400).json({ error: "Cart token is required" });

  let cart = await Cart.findOne({ token });
  if (!cart) {
    cart = await Cart.create({ token, items: [] });
  }
  res.json(cart);
};

export const addItemToCart = async (req: Request, res: Response) => {
  const token = req.headers["x-cart-token"] as string;
  const { productId, variantName, quantity } = req.body;

  let cart = await Cart.findOne({ token });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  const itemIndex = cart.items.findIndex(
    (item) =>
      item.productId.toString() === productId &&
      item.variantName === variantName
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, variantName, quantity });
  }

  await cart.save();
  res.json(cart);
};
