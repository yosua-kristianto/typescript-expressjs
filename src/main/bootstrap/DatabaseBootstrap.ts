import { DBFacade, Log } from 'cuakx-express-core/config';

import config from '@config/Config';

/**
 * Registers and starts configured database connections.
 */
export function registerDatabaseConnections(): void {
  try {
    DBFacade.init(config.database);
    DBFacade.connection('main');
  } catch (error: unknown) {
    Log.w('DATABASE', 'Main database connection is not started. Check DB_MAIN_ENABLE and database credentials.', error);
  }
}
