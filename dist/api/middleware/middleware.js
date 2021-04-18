"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware = express_1.default();
/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
|
| Here is where you can register middlewares for your application.
| How is it work? This middleware run by order. So if you consider or
| wanted to swap the middleware order, you can just do it by swaping them
| one to other.
|
*/
/**
 * CORS Setting
 */
const cors_1 = __importDefault(require("./cors"));
/**
 * @var array
 * Middleware Order Setting
 */
exports.default = [
    cors_1.default
];
