import { Controller } from './controller';

import { Request, Response } from 'express';

import { BaseResponse } from '../../model/dto/base-response';


class ExampleController extends Controller {
  
  public exampleRest = (request: Request, response: Response): Response => {
    
    const dummyData = {
      data: "string", 
      attribute: 1
    };

    return BaseResponse.ok(
      dummyData,
      "Success",
      response
    );
  }

}

export default new ExampleController();
