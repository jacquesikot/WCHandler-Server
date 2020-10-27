"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const woocommerce_rest_api_1 = __importDefault(require("@woocommerce/woocommerce-rest-api"));
const constants_1 = require("../constants");
const woocommerce = new woocommerce_rest_api_1.default({
    url: 'http://astrosboutique.com',
    consumerKey: constants_1.WC_CONSUMER_KEY,
    consumerSecret: constants_1.WC_CONSUMER_SECRET,
    version: 'wc/v3',
});
class Products {
    constructor() {
        this.path = '/api/products';
        this.router = express.Router();
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield woocommerce.delete(`products/${req.query.id}`, {
                    force: true,
                });
                res.send(response.data);
            }
            catch (e) {
                console.log(e.response.data);
            }
        });
        this.getProducts = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const products = yield woocommerce.get('products');
            try {
                res.send(products.data);
            }
            catch (error) {
                console.error(error);
            }
        });
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                name: req.body.name,
                regular_price: req.body.price,
                description: req.body.description,
                categories: [
                    {
                        id: req.body.category.id,
                    },
                ],
            };
            try {
                yield woocommerce.post('products', data);
                res.send('Product Added');
            }
            catch (e) {
                console.log(e.response.data);
            }
        });
        this.getCategories = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield woocommerce.get('products/categories');
                res.send(categories.data);
            }
            catch (e) {
                console.error(e);
            }
        });
        this.addCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                name: req.body.name,
                image: req.body.image,
            };
            try {
                const category = yield woocommerce.post('products/categories', data);
                res.send(category.data);
            }
            catch (e) {
                console.log(e.response.data);
                res.status(401).send('Bad Request');
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getProducts);
        this.router.get(this.path + '/categories', this.getCategories);
        this.router.post(this.path + '/categoriess', this.addCategory);
        this.router.post(this.path, this.addProduct);
        this.router.delete(this.path, this.deleteProduct);
    }
}
exports.default = Products;
//# sourceMappingURL=Products.js.map