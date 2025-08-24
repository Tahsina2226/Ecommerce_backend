import { Request, Response } from "express";
import { Promo } from "./promo.model";

export const createPromo = async (req: Request, res: Response) => {
  const promo = new Promo(req.body);
  await promo.save();
  res.status(201).json(promo);
};
