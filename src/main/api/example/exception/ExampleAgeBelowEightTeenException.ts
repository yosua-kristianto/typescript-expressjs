import { ErrorHandler } from "cuakx-express-core/config";

export class ExampleAgeBelowEightTeenException extends ErrorHandler {

  constructor(){
    super(
        "EXA0001",
        "Age is below 18! Please try to input age again."
    );
  }

}