"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const logging_1 = require("./logging");
/**
 * exception.ts
 *  This file contains the uncaught exception reporting
 *  configuration. How the uncaught exception reporting is
 *  should be react when Run Time Error is thrown.
 */
exports.default = process_1.default.on('uncaughtException', (err, origin) => {
    logging_1.Log.e("UNCAUGHT EXCEPTION", `Caught exception: ${err}\n`
        + `Exception origin: ${origin}\n\n`);
});
