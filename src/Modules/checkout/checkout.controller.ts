import { Request, Response } from "express";
import { Cart } from "../Carts/Cart.model";
import { Promo } from "../promo/promo.model";

export const checkout = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { promoCode } = req.body;

  const cart = await Cart.findOne({ token }).populate("items.productId");
  if (!cart || !cart.items.length)
    return res.status(400).json({ message: "Cart is empty" });

  let subtotal = 0;
  cart.items.forEach((item: any) => {
    const variant = item.productId.variants.id(item.variantId);
    subtotal += variant.price * item.quantity;
  });

  let discount = 0;
  if (promoCode) {
    const promo = await Promo.findOne({ code: promoCode });
    const now = new Date();
    if (promo && promo.validFrom <= now && promo.validTo >= now) {
      discount =
        promo.type === "percent" ? (subtotal * promo.value) / 100 : promo.value;
    }
  }

  const total = subtotal - discount;

  res.json({
    subtotal,
    discount,
    total,
    message: "Checkout successful",
  });
};
