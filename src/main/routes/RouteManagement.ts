import express from 'express';
import { registerCoreRoutes } from 'cuakx-express-core/api';
/*
|--------------------------------------------------------------------------
| Import Controllers
|--------------------------------------------------------------------------
|
| Here is where you can register controller that you've already exported
| in ./api/controller/ControllerFile
| Do as you like, but for me it's easier to format the imported variable
| with PascalCase.
|
*/
import ExampleController from "../api/example/ExampleController";
import config from '@config/Config';
/**
 * API root point. Just to make sure the API is okay.
 */
import { BaseResponse, handleBaseResponse} from 'cuakx-express-core/facade/response.util';

const route = express.Router();

// Register your BaseController in here
route.use(ExampleController);
registerCoreRoutes(route);

route.get('/', handleBaseResponse((req: express.Request) => {
   const date = new Date();

   const data = {
     "app": config.server.app,
     "app_time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
     "time": date.toLocaleString()
   };

   return BaseResponse.ok(
     data,
     "This service is running",
   );
}));

/**
 * Always put this on the bottom of routes file
 */
export default route;

