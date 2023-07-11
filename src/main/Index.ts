import dotenv from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';

import 'express-async-errors';

import config from './config/Config';
import {Log} from './config/Logging';

import {BaseResponse} from './model/dto/BaseResponse';
/**
 * Process watcher
 *  Make sure you don't fuck with `logging.ts`'s log file path.
 */
import "./config/DBFacade";
import {ErrorHandler, handleError} from './config/Exception';


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
import middleware from './common/middleware/Middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import SwaggerOption from "../resources/swagger/SwaggerOption";

dotenv.config();

const router = express.Router();

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
 * Loop trough ./api/middleware/middleware.ts
 */
middleware.forEach((e) => {
  router.use(e);
});


/*
|--------------------------------------------------------------------------
| Swagger-UI Part
|--------------------------------------------------------------------------
|
| Here is where you can configure Swagger-UI.
*/

if(!["production"].includes(process.env.APP_ENV!) && process.env.SWAGGER_ENABLE! == "true"){
  const specs = swaggerJsDoc(SwaggerOption);

  router.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
}
