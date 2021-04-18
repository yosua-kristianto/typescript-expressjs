import express, { Application, Request, Response, NextFunction } from 'express';

import logging from './config/logging';
import config from './config/config';
import base from './model/dto/BaseResponse';

const app = express();

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

app.get('/', (req: Request, res: Response, next: NextFunction) => {

  logging.Log.d(NAMESPACE, "Hello World", res);
  res.send('Hello World');
});

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

  return base.BaseResponse.error("Not Found", 404, res);
});

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
  logging.Log.i(NAMESPACE, `Server is running on ${config.server.port}`);
});
