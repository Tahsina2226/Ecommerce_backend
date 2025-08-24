import mongoose, { Types } from "mongoose";
import { Product } from "../Modules/catalog/catalog.model";
import { Promo } from "../Modules/promo/promo.model";
import { Cart } from "../Modules/Carts/Cart.model";
import { Order } from "../Modules/order/order.model";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";

const runSeeder = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await Product.deleteMany({});
    await Promo.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});
    console.log("Existing data cleared");

    const products = await Product.insertMany([
      {
        title: "T-Shirt",
        description: "Comfortable cotton T-Shirt",
        variants: [
          { name: "S", price: 10 },
          { name: "M", price: 12 },
          { name: "L", price: 14 },
        ],
      },
      {
        title: "Jeans",
        description: "Denim Jeans",
        variants: [
          { name: "32", price: 25 },
          { name: "34", price: 27 },
        ],
      },
      {
        title: "Hoodie",
        description: "Warm Hoodie",
        variants: [
          { name: "M", price: 30 },
          { name: "L", price: 32 },
        ],
      },
    ]);

    console.log("Products seeded");

    await Promo.insertMany([
      {
        code: "SUMMER10",
        type: "percent",
        value: 10,
        validFrom: new Date("2025-01-01"),
        validTo: new Date("2025-12-31"),
      },
      {
        code: "FLAT5",
        type: "fixed",
        value: 5,
        validFrom: new Date("2025-01-01"),
        validTo: new Date("2025-12-31"),
      },
    ]);

    console.log("Promos seeded");

    const cart = new Cart({
      token: "guest-token-123",
      items: [
        {
          productId: products[0]._id,
          variantId: (products[0].variants[0] as any)._id, // cast as any because schema has no _id type
          quantity: 2,
        },
        {
          productId: products[1]._id,
          variantId: (products[1].variants[1] as any)._id,
          quantity: 1,
        },
      ],
    });

    await cart.save();
    console.log("Cart seeded");

    const subtotal =
      (products[0].variants[0].price as number) * 2 +
      (products[1].variants[1].price as number) * 1;
    const discount = 5;
    const total = subtotal - discount;

    await Order.create({
      cartToken: cart.token,
      items: cart.items.map((item) => {
        const product = products.find((p) => p._id.equals(item.productId));
        const variant = product?.variants.find((v) =>
          (v as any)._id.equals(item.variantId)
        );
        return {
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: variant?.price || 0,
        };
      }),
      subtotal,
      discount,
      total,
      status: "pending",
    });

    console.log("Orders seeded");
    console.log("Seeder finished successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeder failed:", error);
    process.exit(1);
  }
};

runSeeder();
