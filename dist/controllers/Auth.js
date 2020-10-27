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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const services_1 = require("../services");
const constants_1 = require("../constants");
const services = new services_1.UserServices();
class Auth {
    constructor() {
        this.path = '/api/auth';
        this.router = express.Router();
        this.addUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateAuth = (req) => {
                const schema = joi_1.default.object({
                    email: joi_1.default.string().min(5).max(255).required().email(),
                    password: joi_1.default.string().min(5).max(255).required(),
                });
                return schema.validate(req);
            };
            const { error } = validateAuth(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = yield services.findUser(req.body);
            if (!user)
                return res.status(400).send('Invalid email or password');
            const validPassword = yield services.validatePassword(req.body.password, user.password);
            if (!validPassword)
                return res.status(400).send('Invalid email or password');
            const token = jsonwebtoken_1.default.sign({ _id: user._id, isAdmin: user.isAdmin }, constants_1.JWT_KEY);
            res.send(token);
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path, this.addUser);
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map