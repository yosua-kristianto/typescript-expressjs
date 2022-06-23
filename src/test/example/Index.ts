import {ExampleControllerHandler} from "../../main/handler/ExampleControllerHandler";

async function main(): Promise<void> {
  const exampleHandler = new ExampleControllerHandler();

  if(exampleHandler.addition(10, 11)){
    console.log("Addition Functional Test Passed!");
  }

  if(exampleHandler.ageValidation(18)){
    console.log("Age Validation Test Passed!");
  }
}

export default main();