import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors'; 

import config from './config/Config';
import { Log } from './config/Logging';

import { BaseResponse } from './model/dto/BaseResponse';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * @var string NAMESPACE
 */
const NAMESPACE = 'Server';

/*
|--------------------------------------------------------------------------
| Configuration Part
|--------------------------------------------------------------------------
|
| This part contains the configurations.
| Feel free to change or update the configuration.
|
*/

console.log(`
Session ${new Date()}
 
   ________  _____    __ ___  __
  / ____/ / / /   |  / //_/ |/ /
 / /   / / / / /| | / ,<  |   / 
/ /___/ /_/ / ___ |/ /| |/   |  
\\____/\\____/_/  |_/_/ |_/_/|_|  
                                

`);

/**
 * Process watcher
 *  Make sure you don't fuck with `logging.ts`'s log file path.
 */
 import "./config/Database";
 import { handleError } from './config/Exception';


/*
|--------------------------------------------------------------------------
| Middleware Part
|--------------------------------------------------------------------------
|
| Here is where you can register middlewares for your application. 
| These middlewares are loaded in api/middleware folder. 
| However, you can also register new middleware by adding new one below.
| For best practice reason, please read about Bounded Context approach 
| to make sure this project tides up.
|
*/

import middleware from './api/middleware/Middleware';

/**
 * Loop trough ./api/middleware/middleware.ts
 */
middleware.forEach((e) => {
  app.use(e);
});


/*
|--------------------------------------------------------------------------
| Swagger-UI Part
|--------------------------------------------------------------------------
|
| Here is where you can configure Swagger-UI.
*/

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const specs = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/books",
      },
    ],
  },
  apis: ["./routes/books.js"],
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

/*
|--------------------------------------------------------------------------
| Route Part
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| These routes are loaded in routes folder. 
| However, you can also register new route by adding new one below, but
| just read the upper section below about "Bounded Context" approach.
| This is why I choose Typescript in first place.
|
*/

import routes from './routes/RouteManagement';
app.use('/api', routes);

/*
|--------------------------------------------------------------------------
| Route Fallback
|--------------------------------------------------------------------------
|
| If the routes happened to be not found, this section will be called 
| automatically. Feel free to change the behavior.
|
*/
app.use((error: any, request: Request, response: Response, next: NextFunction) => {

  console.log(error);

  if(error){
    handleError(response, error);
  }else{
    next();
  }

});

app.use((error: any, response: Response) => response.status(404).json(BaseResponse.custom(false, "404", "Not Found", null)));


/*
|--------------------------------------------------------------------------
| Request Listener / Run The Application
|--------------------------------------------------------------------------
|
| The main entry point for the lopping event listener for 
| Node JS to interact with incoming requests.
| Enjoy changing this configuration, but don't forget to
| leave the message to tell that this API is running.
|
*/

app.listen(config.server.port, () => {
  Log.i(NAMESPACE, `Server is running on ${config.server.port}`);
});
