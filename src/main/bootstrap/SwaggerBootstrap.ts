import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import SwaggerOption from '../../resources/swagger/SwaggerOption';

/**
 * Registers Swagger UI route when enabled.
 */
export function registerSwagger(router: express.Router): void {
  if (!['production'].includes(process.env.APP_ENV ?? 'production') && (process.env.SWAGGER_ENABLE ?? 'false') === 'true') {
    const specs = swaggerJsDoc(SwaggerOption);

    router.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(specs));
  }
}
