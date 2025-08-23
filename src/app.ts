import express from "express";
import cors from "cors";
import { logger } from "./Middlewares/logger";
import { errorHandler } from "./Middlewares/errorHandler";
import catalogRoutes from "./Modules/catalog/catalog.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/catalog", catalogRoutes);
app.use(errorHandler);

export default app;
