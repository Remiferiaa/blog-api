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
exports.authVer = exports.user_login_post = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_login_post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = yield user_1.default.findOne({ username: req.body.username }).exec();
    if (!owner || (owner === null || owner === void 0 ? void 0 : owner.password) !== req.body.password) {
        return res.status(401).json({
            error: 401,
            message: 'Invalid User or password'
        });
    }
    const token = jsonwebtoken_1.default.sign({ owner }, process.env.SECRET, { expiresIn: '6h' });
    res.json({
        username: owner === null || owner === void 0 ? void 0 : owner.username,
        token
    });
});
exports.user_login_post = user_login_post;
exports.authVer = [
    passport_1.default.authenticate('jwt', { session: false }),
    (req, res, next) => {
        next();
    }
];
