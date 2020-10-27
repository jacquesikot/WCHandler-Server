"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WC_CONSUMER_SECRET = exports.WC_CONSUMER_KEY = exports.JWT_KEY = exports.DB_URI = exports.PORT = exports.__Prod__ = void 0;
require("dotenv/config");
exports.__Prod__ = process.env.NODE_ENV === 'production';
exports.PORT = process.env.PORT;
exports.DB_URI = process.env.DB_URI ? process.env.DB_URI : '';
exports.JWT_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : '';
exports.WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY
    ? process.env.WC_CONSUMER_KEY
    : '';
exports.WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET
    ? process.env.WC_CONSUMER_SECRET
    : '';
//# sourceMappingURL=constants.js.map