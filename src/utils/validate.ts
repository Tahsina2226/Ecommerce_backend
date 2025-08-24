import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (e: any) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: e.errors,
      });
    }
  };
