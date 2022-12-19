import {ErrorHandler} from '../../../config/Exception';

export class ExampleAgeBelowEightTeenException extends ErrorHandler {

  constructor(){
    super(
        "EXA0001",
        "Age is below 18! Please try to input age again."
    );
  }

}