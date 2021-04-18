import express, { Application, Request, Response, NextFunction } from 'express';

import config from './config/config';
import { Log } from './config/logging';

import { BaseResponse } from './model/dto/BaseResponse';

const app = express();

/**
 * @var string NAMESPACE
 */
const NAMESPACE = 'Server';


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

import middleware from './api/middleware/middleware';

/**
 * Loop trough ./api/middleware/middleware.ts
 */
middleware.forEach((e, i) => {
  app.use(e);
});

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

import routes from './routes/routes';
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

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found');
  return BaseResponse.error("Not Found", 404, res);
});

/*
|--------------------------------------------------------------------------
| Exception Reporting
|--------------------------------------------------------------------------
|
| This part contains the exception reporting.
| Feel free to change reporting configuration.
|
*/

/**
 * Process watcher
 *  Make sure you don't fuck with `logging.ts`'s log file path.
 */
import process from "./config/exception";

/*
|--------------------------------------------------------------------------
| Request Listener
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
