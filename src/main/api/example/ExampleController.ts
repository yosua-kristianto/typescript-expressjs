import {BaseController} from '../BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '../../model/dto/BaseResponse';
import ExampleValidation from '../../common/validation/ExampleValidation';
import AdditionParamsRequestValidation from "../../common/validation/example/AdditionParamsRequestValidation";
import ExampleAgeInputRequestValidation from "../../common/validation/example/ExampleAgeInputRequestValidation";
import {ExampleControllerHandler} from "./ExampleControllerHandler";
import {DB} from '../../config/DBFacade';

const app = express.Router();

class ExampleController extends BaseController {

  public routes = (): express.Router => {

    /**
     * @method GET
     * exampleValidatedRest
     *
     * This API will return every request that sent to body, with constraint of validation provided.
     * @see ExampleValidation
     */
    app.get("/example", (request: Request, response: Response) => BaseResponse.ok(request.body, "Success", response));

    /**
     * @method POST
     * exampleValidatedRest
     *
     * This API will return every request that sent to body, with constraint of validation provided.
     * @see ExampleValidation
     */
    app.post("/example", ExampleValidation, (request: Request, response: Response) => {
      super.requestValidator(request);

      return BaseResponse.ok(request.body, "Success", response);
    });

    /**
     * @method POST
     * addition
     *
     * This API will make an addition from param_1 with param_2
     */
    app.post("/addition", AdditionParamsRequestValidation, (request: Request, response: Response) => {
      super.requestValidator(request);

      return BaseResponse.ok(
        (new ExampleControllerHandler().addition(request.body.param_1, request.body.param_2)),
        "Success",
        response
      );
    });

    /**
     * @method POST
     * exceptionHandlingTest
     *
     * This function will show how an exception will be behaviour.
     */
    app.post("/exception-handling-test", ExampleAgeInputRequestValidation, (request: Request, response: Response) => {
      super.requestValidator(request);

      return BaseResponse.ok(
        (new ExampleControllerHandler().ageValidation(request.body.age)),
        "Success",
        response
      );
    });

    app.post("/sample-db3", async (request: Request, response: Response) => {

      return BaseResponse.ok(
        (await DB.connection('main').query("SELECT TOP 1 t.* FROM some_tablename t"))[0],
        "Success",
        response
      );
    });

    return app;
  }

}

export default new ExampleController().routes();
