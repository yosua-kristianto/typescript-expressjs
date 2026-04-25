import { BaseMessaging, Messaging, MessagingConsumeHandler } from 'cuakx-express-core/facade/messaging';

import { ExampleEventMessageDTO } from './dto/ExampleEventMessageDTO';

const TOPIC = process.env.EXAMPLE_EVENT_TOPIC ?? 'example-event-topic';
const CONNECTION = process.env.EXAMPLE_EVENT_CONNECTION ?? 'main';

/**
 * Example messaging implementation backed by core multi-driver facade.
 */
export class ExampleEventMessaging extends BaseMessaging<ExampleEventMessageDTO> {
  /**
   * Publishes one example event payload to configured topic.
   */
  async produce(payload: ExampleEventMessageDTO): Promise<void> {
    await Messaging.produce<ExampleEventMessageDTO>({
      topic: TOPIC,
      payload
    }, CONNECTION);
  }

  /**
   * Subscribes to configured topic and delegates each decoded payload.
   */
  async consume(handler: MessagingConsumeHandler<ExampleEventMessageDTO>): Promise<void> {
    await Messaging.consume<ExampleEventMessageDTO>({
      topic: TOPIC,
      groupId: process.env.EXAMPLE_EVENT_GROUP_ID
    }, handler, CONNECTION);
  }
}
