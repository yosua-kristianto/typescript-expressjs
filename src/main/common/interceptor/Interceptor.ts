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
import cors from '@common/interceptor/Cors';
import config from '@config/Config';
import { createDefaultSecurityInterceptors } from 'cuakx-express-core/facade/security';
// import AccessTokenGuard from "./AccessTokenGuard";

const defaultSecurityInterceptors = createDefaultSecurityInterceptors({
  throttling: {
    enabled: config.security.throttling.enable,
    windowMs: config.security.throttling.window_ms,
    maxRequests: config.security.throttling.max_requests
  },
  csrf: {
    enabled: config.security.csrf.enable,
    headerName: config.security.csrf.header,
    methods: config.security.csrf.methods,
    secret: config.security.csrf.secret
  },
  purifier: {
    enabled: config.security.purifier.enable,
    sanitizeBody: config.security.purifier.body,
    sanitizeQuery: config.security.purifier.query,
    sanitizeParams: config.security.purifier.params
  }
});


/**
 * @var array 
 * Interceptor Order Setting
 */
export default [
  cors,
  ...defaultSecurityInterceptors,
  // AccessTokenGuard
];
