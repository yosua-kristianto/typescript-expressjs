import { CronEngine } from 'cuakx-express-core/facade/cron';

import { HeartbeatCronjob } from '../cronjob/HeartbeatCronjob';
// cuakx:cronjob:import

let cronEngine: CronEngine | null = null;

/**
 * Registers and starts boilerplate cronjobs.
 */
export function registerCronjobs(): CronEngine {
  if (cronEngine) {
    return cronEngine;
  }

  cronEngine = new CronEngine();

  const jobs = [
    new HeartbeatCronjob(cronEngine),
    // cuakx:cronjob:register
  ];

  jobs.forEach((job) => job.register());
  cronEngine.startAll();

  return cronEngine;
}
