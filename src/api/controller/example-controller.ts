import { Controller } from './controller';

import { Request, Response } from 'express';

import { BaseResponse } from '../../model/dto/base-response';


class ExampleController extends Controller {
  
  public  exampleRest = async (request: Request, response: Response): Promise<any> => {
    
    const dummyData = {
      data: "string", 
      attribute: 1
    };

    return new BaseResponse().ok(
      dummyData,
      "Success",
      response
    );
  }

}

export default new ExampleController();
