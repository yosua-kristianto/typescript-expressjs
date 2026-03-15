/*
|--------------------------------------------------------------------------
| Interceptor 
|--------------------------------------------------------------------------
|
| Why I change this naming to Interceptor?
| Turns out many people calling Gateway or middleman service as Middleware.
| Here is where you can register interceptor for your application. 
| How is it work? This interceptor run by order. So if you consider or
| wanted to swap the interceptor order, you can just do it by swaping them
| one to other.
|
*/

/**
 * CORS Setting
 */
import cors from './Cors';
// import AccessTokenGuard from "./AccessTokenGuard";


/**
 * @var array 
 * Interceptor Order Setting
 */
export default [
  cors,
  // AccessTokenGuard
];
