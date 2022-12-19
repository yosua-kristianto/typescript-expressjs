import {BaseController} from '../BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '../../model/dto/BaseResponse';
import User from '../../model/entity/User';
import {UserHandler} from "./UserControllerHandler";

const app = express.Router();

class UserController extends BaseController {

  private handler: UserHandler = new UserHandler();

  public routes = (): express.Router => {

    /**
     * @method POST
     * createUser
     *
     * This API will create a User data.
     */
    app.post('/user', async (request: Request, response: Response) => {
      const newUser: User = await this.handler.createUserHandler(
        request.body.email,
        request.body.phone
      );

      return BaseResponse.ok(newUser, "User is successfully created!", response);
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
