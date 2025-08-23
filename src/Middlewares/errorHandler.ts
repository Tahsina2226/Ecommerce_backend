import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const statusMessages: { [key: number]: string } = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    409: "Conflict",
    500: "Internal Server Error",
  };
  const message = err.message || statusMessages[statusCode] || "Error";
  console.error({
    status: statusCode,
    message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
