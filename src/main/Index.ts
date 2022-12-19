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
import routes from './routes/RouteManagement';

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
router.use('/api', routes);

/*
|--------------------------------------------------------------------------
| Route Fallback
|--------------------------------------------------------------------------
|
| If the routes happened to be not found, this section will be called 
| automatically. Feel free to change the behavior.
|
*/
router.use((error: ErrorHandler, request: Request, response: Response, next: NextFunction) => {

  console.log("Heho: "+ error);

  if(error){
    handleError(response, error);
  }else{
    next();
  }

});

router.use((error: any, response: Response) => response.status(404).json(BaseResponse.custom(false, "404", "Not Found", null)));


/*
|--------------------------------------------------------------------------
| Request Listener / Run The Application
|--------------------------------------------------------------------------
|
| @since November, 19th 2022
| The main server now using @fastify/express engine.
| Enjoy! :)
|
| The main entry point for the lopping event listener for 
| Node JS to interact with incoming requests.
| Enjoy changing this configuration, but don't forget to
| leave the message to tell that this API is running.
|
*/

const app = require('fastify')();

app.register(require("@fastify/express"))
    .after(() => {
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(router);
    })

app.listen({"port": config.server.port}, () => {
  Log.i(NAMESPACE, `Server is running on ${config.server.port}`);
});
