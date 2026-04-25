import express from 'express';
import { fastify } from 'fastify';
import fastifyExpress from '@fastify/express';

import { Log } from 'cuakx-express-core/config';
import config from '@config/Config';

const NAMESPACE = 'ServerZ';

/**
 * Starts Fastify + Express bridge and begins listening for requests.
 */
export async function startListener(router: express.Router): Promise<void> {
  const app = fastify();

  app.register(fastifyExpress).after(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
  });

  await app.listen({
    port: parseInt(config.server.port),
    host: (process.env.APP_ENV ?? 'local') === 'local' ? '127.0.0.1' : '0.0.0.0'
  });

  Log.i(NAMESPACE, `Server is running on ${config.server.port}`);
}
