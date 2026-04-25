import { Log } from 'cuakx-express-core/config';
import { Messaging } from 'cuakx-express-core/facade/messaging';

import config from '@config/Config';
import { ExampleEventMessaging } from '../messaging/example/ExampleEventMessaging';
// cuakx:messaging:import

/**
 * Registers concrete message broker consumers when messaging is enabled.
 */
export async function registerMessageBroker(): Promise<void> {
  const mainConfig = config.messaging.main;

  if (!mainConfig?.enable) {
    Log.i('MESSAGING', 'Messaging bootstrap skipped because MESSAGING_MAIN_ENABLE=false');
    return;
  }

  Messaging.init(config.messaging);

  const consumers: Array<() => Promise<void>> = [
    async () => {
      const exampleMessaging = new ExampleEventMessaging();
      await exampleMessaging.consume(async (payload) => {
        Log.i('MESSAGING', `Received event=${payload.event}, referenceId=${payload.referenceId}`);
      });
    },
    // cuakx:messaging:register
  ];

  for (const consume of consumers) {
    await consume();
  }

  Log.i('MESSAGING', `Example consumer is listening on ${process.env.EXAMPLE_EVENT_TOPIC ?? 'example-event-topic'}`);
}
