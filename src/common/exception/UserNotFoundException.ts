import { ErrorHandler } from '../../config/Exception';

export class UserNotFoundException extends ErrorHandler {

  constructor(){
    super(
        "404",
        "User with requested id not found"
    );
  }

}