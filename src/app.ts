import express from "express";
import productRoutes from "./Modules/catalog/catalog.routes";
import cartRoutes from "./Modules/Carts/cart.routes";
import promoRoutes from "./Modules/promo/promo.route";
import checkoutRoutes from "./Modules/checkout/checkout.route";
import orderRoutes from "./Modules/order/order.route";
import { errorHandler } from "./Middlewares/errorHandler";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/promos", promoRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/orders", orderRoutes);

// Error Handler
app.use(errorHandler);

export default app;
