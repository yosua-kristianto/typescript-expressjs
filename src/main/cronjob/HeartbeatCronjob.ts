import { BaseCronjob } from 'cuakx-express-core/facade/cron';
import { Log } from 'cuakx-express-core/config';

/**
 * Example cronjob used to prove scheduling bootstrap is active.
 */
export class HeartbeatCronjob extends BaseCronjob {
  /**
   * Returns unique cronjob name.
   */
  name(): string {
    return 'heartbeat-cronjob';
  }

  /**
   * Runs every minute by default. Override with HEARTBEAT_CRON.
   */
  expression(): string {
    return process.env.HEARTBEAT_CRON ?? '* * * * *';
  }

  /**
   * Logs heartbeat execution metadata.
   */
  execute(): void {
    Log.i('CRON', `Heartbeat cron executed at ${new Date().toISOString()}`);
  }
}
