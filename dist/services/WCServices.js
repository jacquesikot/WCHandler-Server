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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const woocommerce_rest_api_1 = __importDefault(require("@woocommerce/woocommerce-rest-api"));
const debug_1 = require("debug");
const constants_1 = require("../constants");
const woocommerce = new woocommerce_rest_api_1.default({
    url: 'http://astrosboutique.com',
    consumerKey: constants_1.WC_CONSUMER_KEY,
    consumerSecret: constants_1.WC_CONSUMER_SECRET,
    version: 'wc/v3',
});
class WCService {
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield woocommerce.get('products');
            try {
                if (response)
                    return response;
            }
            catch (error) {
                debug_1.log(error);
            }
        });
    }
}
exports.default = WCService;
//# sourceMappingURL=WCServices.js.map