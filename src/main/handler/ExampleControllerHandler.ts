import {ExampleAgeBelowEightTeenException} from "../common/exception/example/ExampleAgeBelowEightTeenException";
import {Database} from "../config/Database ";

export class ExampleControllerHandler {

  public addition = (firstParam: number, secondParam: number): number => firstParam + secondParam;

  public ageValidation = (age: number): true => {
      console.log(Database().select().from('po_uma.uma_tbl_users'))

    if (age < 18) {
      throw new ExampleAgeBelowEightTeenException();
    }

    return true;
  }
}