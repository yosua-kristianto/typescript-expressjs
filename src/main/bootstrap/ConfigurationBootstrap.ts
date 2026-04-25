import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Log } from 'cuakx-express-core/config';

import config from '@config/Config';

const BANNER_PATH = path.resolve(process.cwd(), 'src/resources/banner/Banner.txt');

/**
 * Loads env values and prints server banner to the console.
 */
export function setupConfiguration(): void {
  dotenv.config();

  Log.init({
    appName: config.server.app,
    driver: config.logging.driver,
    logDirectory: config.logging.directory,
    logstash: {
      enabled: config.logging.logstash.enable,
      host: config.logging.logstash.host,
      port: config.logging.logstash.port,
      protocol: config.logging.logstash.protocol
    }
  });

  const banner = fs.readFileSync(BANNER_PATH, 'utf-8');

  console.log(`
Session ${new Date()}

${banner}
`);
}
