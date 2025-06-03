import { Messaging } from "../../config/message.broker/MessagingFacade";

/**
 *
 * MessagingConsumer
 */
export namespace MessagingConsumer {

  const DO_MESSAGING_CONSUMER_TOPIC = "DO_MESSAGING_TOPIC";

  export async function consume() {
    const consumer = await Messaging.connection('main');

    const channel = await consumer.createChannel();
    await channel.assertQueue(DO_MESSAGING_CONSUMER_TOPIC);

    console.log(`${DO_MESSAGING_CONSUMER_TOPIC} channel is running`);

    channel.consume(DO_MESSAGING_CONSUMER_TOPIC, function (message: any) {
        console.log(`Recieved message: ${message.content.toString()} from queueName: ${DO_MESSAGING_CONSUMER_TOPIC}`);
        channel.ack(message);
    });
  }

}