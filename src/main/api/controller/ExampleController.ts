import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import ExampleValidation from '../../common/validation/ExampleValidation';
import AdditionParamsRequestValidation from "../../common/validation/example/AdditionParamsRequestValidation";
import {ExampleAgeBelowEightTeenException} from "../../common/exception/example/ExampleAgeBelowEightTeenException";
import ExampleAgeInputRequestValidation from "../../common/validation/example/ExampleAgeInputRequestValidation";
import {ExampleControllerHandler} from "../../handler/ExampleControllerHandler";

const app = express.Router();

class ExampleController extends Controller {

  public routes = (): express.Router => {

    /**
     * exampleRest
     * 
     * This API will return every request that sent to body.
     * 
     * /api/example
     * 
     * @param request 
     * @param response 
     * @returns 
     */
    app.get("/example", (request: Request, response: Response) => BaseResponse.ok(request.body, "Success", response));

    /**
     * exampleValidatedRest
     * This API will return every request that sent to body, with constraint of validation provided. 
     * @see ExampleValidation
     */
    app.post("/example", ExampleValidation, (request: Request, response: Response) => {
      super.requestValidator(request);

      return BaseResponse.ok(request.body, "Success", response);
    });

    /**
     * exampleHandlerUsage
     * This API will give you an example of using handler.
     */
    app.post("/addition", AdditionParamsRequestValidation, (request: Request, response: Response) => {
      super.requestValidator(request);

      return BaseResponse.ok(
        (new ExampleControllerHandler().addition(request.body.param_1, request.body.param_2)),
        "Success",
        response
      );
    });

    app.post("/exception-handling-test", ExampleAgeInputRequestValidation, (request: Request, response: Response) => {
      super.requestValidator(request);

      return BaseResponse.ok(
        (new ExampleControllerHandler().ageValidation(request.body.age)),
        "Success",
        response
      );
    });

    return app;
  }

}

export default new ExampleController().routes();
