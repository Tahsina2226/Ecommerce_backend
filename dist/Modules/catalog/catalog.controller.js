"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const catalog_model_1 = require("./catalog.model");
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield catalog_model_1.Product.find();
    res.json(products);
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield catalog_model_1.Product.findById(req.params.id);
    if (!product)
        return res.status(404).json({ message: "Product not found" });
    res.json(product);
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new catalog_model_1.Product(req.body);
    yield product.save();
    res.status(201).json(product);
});
exports.createProduct = createProduct;
