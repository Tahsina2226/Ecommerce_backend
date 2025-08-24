"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: e.errors,
        });
    }
};
exports.validate = validate;
