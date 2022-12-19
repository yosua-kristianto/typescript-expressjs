import {ErrorHandler} from '../../config/Exception';

export class UserNotFoundException extends ErrorHandler {

  constructor(){
    super(
        "409",
        "User with requested id not found"
    );
  }

}