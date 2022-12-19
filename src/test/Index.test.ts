/**
 * WRITING TEST
 *
 * You can specify every unit Tests in here.
 */
import {ExampleControllerHandler} from "../main/api/example/ExampleControllerHandler";
import {ExampleAgeBelowEightTeenException} from "../main/common/exception/example/ExampleAgeBelowEightTeenException";

test("[POSITIVE] Should be return true when given 19", () => {
  expect(new ExampleControllerHandler().ageValidation(19))
    .toBe(true);
});

test("[NEGATIVE] Should be throw age validation error when given under 18", () => {
  expect(() => {
    new ExampleControllerHandler().ageValidation(13)
  })
    .toThrow(new ExampleAgeBelowEightTeenException().message);
});

