import {BaseController} from '../BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '../../common/facade/BaseResponse';
import {CustomerControllerHandler} from "./CustomerControllerHandler";
import {CreateCustomerResponseDTO} from './response/CreateCustomerResponseDTO';

const app = express.Router();

class CustomerController extends BaseController {

  private handler: CustomerControllerHandler = new CustomerControllerHandler();

  public routes = (): express.Router => {

    app.post('/customer', async (request: Request, response: Response) => {
      const customerFullName: string = await this.handler.createNewCustomer(
        request.body.first_name,
        request.body.last_name,
        request.body.city,
        request.body.country,
        request.body.phone
      );

      const dto: CreateCustomerResponseDTO = {
        "user_full_name": customerFullName
      };

      return BaseResponse.ok(dto, "Success", response);
    });

    return app;
  }

}

export default new CustomerController().routes();
