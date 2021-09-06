import { Controller } from './Controller';
import { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';

class ExampleController extends Controller {
  
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
  public exampleRest = async (request: Request, response: Response): Promise<any> => BaseResponse.ok(request.body, "Success", response);

  public exampleValidatedRest = async (request: Request, response: Response): Promise<any> => {
    super.requestValidator(request);

    return BaseResponse.ok(request.body, "Success", response);
  }

}

export default new ExampleController();
