"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseResponse_1 = require("../model/dto/BaseResponse");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
/*
|--------------------------------------------------------------------------
| Import Controllers
|--------------------------------------------------------------------------
|
| Here is where you can register controller that you've already exported
| in ./api/controller/controller-file
| Do as you like, but for me it's easier to format the imported variable
| with PascalCase.
|
*/
const example_controller_1 = __importDefault(require("../api/controller/example-controller"));
/*
|--------------------------------------------------------------------------
| Route Part
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| Do you started to remembering something with this route?
|
*/
/**
 * /example prefix
 */
route.get('/example', example_controller_1.default.exampleRest);
/**
 * API root point. Just to make sure the API is okay.
 */
const config_1 = __importDefault(require("../config/config"));
route.get('/', (req, res) => {
    const date = new Date();
    const data = {
        "app": config_1.default.server.hostname,
        "app_time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        "time": date.toLocaleString()
    };
    return BaseResponse_1.BaseResponse.ok(data, config_1.default.server.app, res);
});
module.exports = route;
