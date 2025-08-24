"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const statusMessages = {
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
    res.status(statusCode).json(Object.assign({ status: "error", code: statusCode, message }, (process.env.NODE_ENV === "development" && { stack: err.stack })));
};
exports.errorHandler = errorHandler;
