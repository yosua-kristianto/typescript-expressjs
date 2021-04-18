"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const BaseResponse_1 = require("../../model/dto/BaseResponse");
class ExampleController extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.exampleRest = (request, response) => {
            const dummyData = {
                data: "string",
                attribute: 1
            };
            return BaseResponse_1.BaseResponse.ok(dummyData, "Success", response);
        };
    }
}
exports.default = new ExampleController();
