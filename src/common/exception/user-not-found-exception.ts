import { ErrorHandler } from '../../config/exception';

export class UserNotFoundException extends ErrorHandler {

  constructor(){
    super(
        404,
        "User with requested id not found"
    );
  }

}