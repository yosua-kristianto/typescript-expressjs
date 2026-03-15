import {BaseController} from '@api/BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '@common/facade/BaseResponse';
import MobileUser from '@model/entity/MobileUser';
import { UserControllerHandler } from '@api/user/handler/UserControllerHandler';

class UserController extends BaseController {

  public constructor() {
    super();
  }

  private handler = new UserControllerHandler();

  public routes = (): express.Router => {

    /**
     * @method POST
     * createUser
     *
     * This API will create a User data.
     */
    this.app.post('/user', async (request: Request, response: Response) => {
      const newUser: MobileUser = await this.handler.handleCreateUser(
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
    this.app.get('/user/:id', async (request: Request, response: Response) => {
      const id: string = (request.params.id).toString();

      const user: MobileUser = await this.handler.handleGetUserById(id);

      return BaseResponse.ok(user, "Succesfully returned user data", response);
    });


    return this.app;
  }

}

export default new UserController().routes();
