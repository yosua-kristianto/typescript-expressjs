import {ValidationError} from "express-validator";
import {ErrorHandler} from "../../config/Exception";

export default class RequestValidationException extends ErrorHandler {

  constructor(errorMessage: Array<ValidationError>) {
    super(
      "400",
      `Bad Request - ${(errorMessage[0].msg)}`,
      errorMessage
    );
  }
};