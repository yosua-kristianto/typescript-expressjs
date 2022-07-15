import {ExampleControllerHandler} from "../main/handler/ExampleControllerHandler";
import UserRepositoryImpl from "../main/repository/impl/UserRepositoryImpl";
import {handleTestResult} from "./support/CallbackTemplate";

async function main(): Promise<void> {
  const exampleHandler = new ExampleControllerHandler();

  // Run test to create User
  await UserRepositoryImpl.createUser({
    "email": 'test@gmail.com',
    "phone": '012345678'
  }).then(handleTestResult)
    .catch(handleTestResult);
}

export default main();