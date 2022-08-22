import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import { UserHandler } from '../../handler/UserHandler';
import User from '../../model/entity/User';

const app = express.Router();

class UserController extends Controller {

  private handler: UserHandler = new UserHandler();

  public routes = (): express.Router => {

    /**
     * createUser
     *
     * @swagger
     * /api/user:
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
     *    description: This API will create new user data.
     *    responses:
     *      200:
     *        description: This API will return the exact same from your request
     *        schema:
     *          type: object
     *          properties:
     *            name:
     *              type: string
     *              example: "Kinthil"
     */
    app.post('/user', async (request: Request, response: Response) => {
        const newUser: User = await this.handler.createUserHandler(
          request.body.email,
          request.body.phone
        );

        return BaseResponse.ok(newUser, "User is succesfully created!", response);
    });

    /**
     * @method get
     * getUserById
     * 
     * This API will return user data with destinated source of ID.
     */
    app.get('/user/:id', async (request: Request, response: Response) => {
      const id: number = parseInt((request.params.id).toString());

      const user: User = await this.handler.getUserByIdHandler(id);

      return BaseResponse.ok(user, "Succesfully returned user data", response);
    });


    return app;
  }

}

export default new UserController().routes();
