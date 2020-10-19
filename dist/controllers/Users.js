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
const services_1 = require("../services");
const models_1 = require("../models");
const constants_1 = require("../constants");
const middlewares_1 = require("../middlewares");
const services = new services_1.UserService();
class Users {
    constructor() {
        this.path = '/api/users';
        this.router = express.Router();
        this.addUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = models_1.validateUser(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = yield services.findUser(req.body);
            if (user)
                return res.status(400).send('User already registered.');
            const response = yield services.createUser(req.body);
            const token = jsonwebtoken_1.default.sign({ _id: user._id, isAdmin: user.isAdmin }, constants_1.JWT_KEY);
            res.header('x-auth-token', token).send(response);
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield services.findUserById(req.user._id);
            res.send(user);
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path, this.addUser);
        this.router.get(this.path + '/me', middlewares_1.auth, this.getUser);
    }
}
exports.default = Users;
//# sourceMappingURL=Users.js.map