"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const logging_1 = require("./config/logging");
const BaseResponse_1 = require("./model/dto/BaseResponse");
const app = express_1.default();
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
const middleware_1 = __importDefault(require("./api/middleware/middleware"));
/**
 * Loop trough ./api/middleware/middleware.ts
 */
middleware_1.default.forEach((e, i) => {
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
const routes_1 = __importDefault(require("./routes/routes"));
app.use('/api', routes_1.default);
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   Log.d(NAMESPACE, "Hello World");
//   res.send('Hello World' + 1);
// });
/*
|--------------------------------------------------------------------------
| Route Fallback
|--------------------------------------------------------------------------
|
| If the routes happened to be not found, this section will be called
| automatically. Feel free to change the behavior.
|
*/
app.use((req, res, next) => {
    const error = new Error('Not Found');
    return BaseResponse_1.BaseResponse.error("Not Found", 404, res);
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
app.listen(config_1.default.server.port, () => {
    logging_1.Log.i(NAMESPACE, `Server is running on ${config_1.default.server.port}`);
});
