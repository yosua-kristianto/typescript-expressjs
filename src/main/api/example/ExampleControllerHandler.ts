import {ExampleAgeBelowEightTeenException} from "@api/example/exception/ExampleAgeBelowEightTeenException";

export class ExampleControllerHandler {

  public addition = (firstParam: number, secondParam: number): number => firstParam + secondParam;

  public ageValidation = (age: number): true => {
    if (age < 18) {
      throw new ExampleAgeBelowEightTeenException();
    }

    return true;
  }
}