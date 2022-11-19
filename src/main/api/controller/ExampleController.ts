import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import ExampleValidation from '../../common/validation/ExampleValidation';
import AdditionParamsRequestValidation from "../../common/validation/example/AdditionParamsRequestValidation";
import ExampleAgeInputRequestValidation from "../../common/validation/example/ExampleAgeInputRequestValidation";
import {ExampleControllerHandler} from "../../handler/ExampleControllerHandler";
import DBFacade, {DB} from "../../config/DBFacade";

const app = express.Router();

class ExampleController extends Controller {

  public routes = (): express.Router => {

    /**
     * exampleValidatedRest
     *
     * @swagger
     * /api/example:
     *  get:
     *    parameters:
     *    - in: body
     *      schema:
     *        type: object
     *        properties:
     *          name:
     *            type: string
     *            example: "Kinthil"
     *    description: This API will return every request that sent to body, with constraint of validation provided.
     *    responses:
     *      200:
     *        description: This API will return the exact same from your request
     *        schema:
     *          type: object
     *          properties:
     *            name:
     *              type: string
     *              example: "Kinthil"
     *
     *
     * @see ExampleValidation
     */
    app.get("/example", (request: Request, response: Response) => BaseResponse.ok(request.body, "Success", response));

    /**
     * exampleValidatedRest
     *
     * @swagger
     * /api/example:
     *  post:
     *    parameters:
     *    - in: body
     *      schema:
     *        type: object
     *        required:
     *          - name
     *        properties:
     *          name:
     *            type: string
     *            example: "Kinthil"
     *    description: This API will return every request that sent to body, with constraint of validation provided.
     *    responses:
     *      200:
     *        description: This API will return the exact same from your request
     *        schema:
     *          type: object
     *          properties:
     *            name:
     *              type: string
     *              example: "Kinthil"
     *
     *
     * @see ExampleValidation
     */
    app.post("/example", ExampleValidation, (request: Request, response: Response) => {
      super.requestValidator(request);

      return BaseResponse.ok(request.body, "Success", response);
    });

    /**
     * addition
     *
     * @swagger
     * /api/addition:
     *  post:
     *    parameters:
     *    - in: body
     *      schema:
     *        type: object
     *        required:
     *          - name
     *        properties:
     *          name:
     *            type: string
     *            example: "Kinthil"
     *    description: This API will return every request that sent to body, with constraint of validation provided.
     *    responses:
     *      200:
     *        description: This API will return the exact same from your request
     *        schema:
     *          type: object
     *          properties:
     *            name:
     *              type: string
     *              example: "Kinthil"
     *
     *
     * @see ExampleValidation
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

    app.post("/sample-knex", async (request: Request, response: Response) => {

      return BaseResponse.ok(
        (await DBFacade("uma_tbl_user").select('*')),
        "Success",
        response
      );
    });

    app.post("/sample-sequelize", async (request: Request, response: Response) => {

      return BaseResponse.ok(
        (await DBFacade.query("SELECT * FROM `uma_tbl_user`"))[0],
        "Success",
        response
      );
    });

    app.post("/sample-db2", async (request: Request, response: Response) => {

      return BaseResponse.ok(
        (await DB.connection('secondary').query("SELECT * FROM `table_name`"))[0],
        "Success",
        response
      );
    });

    app.post("/sample-db3", async (request: Request, response: Response) => {

      return BaseResponse.ok(
        (await DB.connection('third_connection')('table_name').select('*')),
        "Success",
        response
      );
    });

    return app;
  }

}

export default new ExampleController().routes();
