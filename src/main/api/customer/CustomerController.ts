import {BaseController} from '../BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '../../model/dto/BaseResponse';
import {CustomerControllerHandler} from "./CustomerControllerHandler";
import {CreateCustomerResponseDTO} from '../../model/dto/response/customer/CreateCustomerResponseDTO';

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

      return BaseResponse.ok(dto, "Sukses", response);
    });

    return app;
  }

}

export default new CustomerController().routes();
