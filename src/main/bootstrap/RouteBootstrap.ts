import express from 'express';

import routes from '../routes/RouteManagement';

/**
 * Registers main application routes.
 */
export function registerRoutes(router: express.Router): void {
  router.use('/api', routes);
}
