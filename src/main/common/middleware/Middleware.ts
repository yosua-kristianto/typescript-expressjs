/*
|--------------------------------------------------------------------------
| Middleware 
|--------------------------------------------------------------------------
|
| Here is where you can register middlewares for your application. 
| How is it work? This middleware run by order. So if you consider or
| wanted to swap the middleware order, you can just do it by swaping them
| one to other.
|
*/

/**
 * CORS Setting
 */
import cors from './Cors';


/**
 * @var array 
 * Middleware Order Setting
 */
export default [
  cors
];
