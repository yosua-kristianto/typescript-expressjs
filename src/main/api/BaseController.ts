import {validationResult} from "express-validator";
import RequestValidationException from "../common/exception/RequestValidationException";
import {Request} from "express";

export abstract class BaseController {
  
  /**
   * This is empty
   */
  protected doSomething(): void {
    
  }

  
  /**
   * requestValidator
   * 
   * This function is an extract method to make sure
   * that validation through request is right.
   * 
   * If it has a validation error within, throw RequestValidationException
   * 
   * @see RequestValidationException
   * 
   * @param request 
   */
  public requestValidator(request: Request) {

    const errors = validationResult(request);

    if(!errors.isEmpty()){
      throw new RequestValidationException(
        errors.array()
      );
    }
  }

}