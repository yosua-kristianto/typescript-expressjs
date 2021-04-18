"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponse = void 0;
const express_1 = __importDefault(require("express"));
const app = express_1.default();
class BaseResponse {
    constructor(data, message, code) {
        this.status = false;
        this.code = 500;
        this.message = "Internal Server Error";
        this.data = null;
        this.status = (code > 99 || code < 400);
        this.code = code;
        this.message = message;
        this.data = data;
    }
    /**
     * @static
     * ok
     *  A static function that return BaseResponse as successful response.
     */
    static ok(data, message, res, code = 200) {
        return res
            .status(200)
            .json((new BaseResponse(data, message, code)));
    }
    /**
     * @static
     * error
     *  A static function that return BaseResponse as not okay response.
     *  Oftenly used for Internal Server Error.
     */
    static error(message, code = 200, res, data) {
        return res
            .status(500)
            .json((new BaseResponse(data, message, code)));
    }
}
exports.BaseResponse = BaseResponse;
