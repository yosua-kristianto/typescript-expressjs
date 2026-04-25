import express, {NextFunction, Request, Response} from 'express';


import { DBFacade, ErrorHandler, handleError, Log } from 'cuakx-express-core/config';
import { BaseResponse, ResponseHTTPCode, responseHandler } from 'cuakx-express-core/facade/response.util';

/**
 * Process watcher
 *  Make sure you don't fuck with `logging.ts`'s log file path.
 */

// Uncomment to enable Redis
// import "@config/memcache/RedisFacade";

// Uncomment to enable MongoDB Connection
// import "./config/MongooseConfig";



/*
|--------------------------------------------------------------------------
| Interceptor Part
|--------------------------------------------------------------------------
|
| Here is where you can register interceptors for your application.
| These interceptors are loaded in common/interceptor/interceptor folder.
| However, you can also register new interceptor by adding new one below.
| For best practice reason, please read about Bounded Context approach
| to make sure this project tides up.
|
*/
import interceptor from './common/interceptor/Interceptor';
import {
  registerCronjobs,
  registerDatabaseConnections,
  registerMessageBroker,
  registerNotificationChannels,
  registerRoutes,
  registerSwagger,
  setupConfiguration,
  startListener
} from './bootstrap';

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Configuration Part
|--------------------------------------------------------------------------
|
| This part contains the configurations.
| Feel free to change or update the configuration.
|
*/
setupConfiguration();
registerDatabaseConnections();
registerCronjobs();
registerNotificationChannels();


interceptor.forEach((e) => {
  router.use(e);
});

// Add response handler middleware to automatically handle BaseResponse objects
router.use(responseHandler);


/*
|--------------------------------------------------------------------------
| Swagger-UI Part
|--------------------------------------------------------------------------
|
| Here is where you can configure Swagger-UI.
*/

registerSwagger(router);


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
registerRoutes(router);

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

  console.log(error);

  if(error){
    handleError(error);
  }else{
    next();
  }

});

router.use((error: any) => {
  const response: BaseResponse = new BaseResponse();

  response.status = ResponseHTTPCode.NOT_FOUND;
  response.message = "Not Found";
  response.code = "404";

  return response;
});

/*
 |--------------------------------------------------------------------------
 | Register Message Brokers (RabbitMQ)
 |--------------------------------------------------------------------------
 |
 | Register your message broker consumer in here, this section will be called
 | automatically. Import the Consumer, or try to uncomment this line below, and run consume.
 |
 */
void registerMessageBroker();

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
void startListener(router).catch((error: unknown) => {
  Log.e('ServerZ', 'Failed to start listener', error);
});
