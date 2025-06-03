import { Messaging } from "../../config/message.broker/MessagingFacade";

/**
 *
 * MessagingProducer
 */
export namespace MessagingProducer {

  const DO_MESSAGING_CONSUMER_TOPIC = "DO_MESSAGING_TOPIC";

  export async function producer() {
    const producer = await Messaging.connection('main');

    const channel = await producer.createChannel();
    await channel.assertQueue(DO_MESSAGING_CONSUMER_TOPIC);

    const message = 'Hello World! TESTING!!!';

    console.log('Start publishing!');

    await channel.sendToQueue(DO_MESSAGING_CONSUMER_TOPIC, Buffer.from(message));

    await channel.close();
    await producer.close();

  }

}