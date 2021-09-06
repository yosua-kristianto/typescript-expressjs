import { BaseResponse } from '../model/dto/BaseResponse';
import express from 'express';
const route = express.Router();

/*
|--------------------------------------------------------------------------
| Import Controllers
|--------------------------------------------------------------------------
|
| Here is where you can register controller that you've already exported
| in ./api/controller/controller-file
| Do as you like, but for me it's easier to format the imported variable 
| with PascalCase.
|
*/

import ExampleController from '../api/controller/ExampleController';

/*
 |--------------------------------------------------------------------------
 | Collective Validation Imports Part
 |--------------------------------------------------------------------------
 |
 | Here is where you can register Request Validation routes for your controller.
 |
 */
import ExampleValidation from '../common/validation/ExampleValidation';

/*
|--------------------------------------------------------------------------
| Route Part
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| Do you started to remembering something with this route?
|
*/

/**
 * /example prefix
 */

const EXAMPLE_PREFIX = "/example";

route.get(`${EXAMPLE_PREFIX}`, ExampleController.exampleRest);
route.post(`${EXAMPLE_PREFIX}`, ExampleValidation, ExampleController.exampleValidatedRest);



/**
 * API root point. Just to make sure the API is okay.
 */
 import config from '../config/Config';
 
 route.get('/', (req, res) => {
   const date = new Date();  
   
   const data = {
     "app": config.server.hostname,
     "app_time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
     "time": date.toLocaleString()
   };
 
   return BaseResponse.ok(
     data,
     config.server.app,
     res
   );
 });
 

/**
 * Always put this on the bottom of routes file
 */
export = route;
