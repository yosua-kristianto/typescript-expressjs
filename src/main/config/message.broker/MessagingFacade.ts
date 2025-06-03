import config from "../Config";
import amqplib from "amqplib";


interface MessagingConnectionSetup {
  "connection_string": string;
}

class MessagingDriver {
  private configuration: MessagingConnectionSetup;

  public constructor(setup: MessagingConnectionSetup){
    this.configuration = setup;
  }

  /**
   * authenticate
   *
   * This function will start the authentication to RabbitMQ.
   * Once the return statement being made, the returned value is the message broker driver settings loaded.
   */
  public async authenticate(): Promise<any> {
      return await amqplib.connect(this.configuration.connection_string);
  }
}

/**
 * MessagingSlave
 *
 * This function will return Slave that has been loaded with message broker configuration.
 * 1 MessagingSlave represent one Messaging Connection.
 *
 * The slave will only make a pool into enabled connection.
 * See config.messaging
 *
 * @param connection
 * @constructor
 */
const MessagingSlave = (connection = "main"): any => {
  type MessagingConnectionObject = keyof typeof config.messaging;

  const selection = connection as MessagingConnectionObject;

  if(!config.messaging[selection].enable){
    throw new Error(`WARNING: Connection ${connection} is not enabled!`);
  }

  return new MessagingDriver({
    "connection_string": config.messaging[selection].connection_string
  }).authenticate()
}

export class Messaging {

  private static _instance: Messaging | null = null;
  private messageBrokerConnectionSelector = {};
  private availableConnectionLabel: Array<string> = [];

  private constructor() {
    for(const e in config.messaging){

      type MessageBrokerConnectionSelectorKey = keyof typeof this.messageBrokerConnectionSelector;
      const objectKey = e as MessageBrokerConnectionSelectorKey;

      try {
        this.availableConnectionLabel.push(e);

        // @ts-ignore
        this.messageBrokerConnectionSelector[objectKey] = MessagingSlave(e);

        
        console.log(`Connection to Messaging ${objectKey} as a Message Broker has been established`);
        
      } catch(error: any){
        // In some occasion, user. want to prepare multiple message broker connections
        // End up, the second even the third one will never be used.
        // To prevent error from the connection, I use try-catch to skip the
        // connection selection on enable false. Check out config.messaging

        console.log(`Connection to Messaging ${objectKey} as a Message Broker cannot be establish: ${error}`);
      }

    }
  }

  public static connection = (connection = 'main'): any => {
    console.log("Attempt to change remote message broker to " + connection);
    return this.getInstance().getConnection(connection);
  }

  private getConnection = (connection = 'main'): any => {
    if (!this.availableConnectionLabel.includes(connection)) {
      throw new Error(`Connection with label of ${connection} is not set! Please consider to check Config.ts within database configuration`);
    }

    type MessageBrokerConnectionSelectorKey = keyof typeof this.messageBrokerConnectionSelector;
    const objectKey = connection as MessageBrokerConnectionSelectorKey;

    console.log(this.availableConnectionLabel)

    const seletedConnection = this.messageBrokerConnectionSelector[objectKey];
    return seletedConnection;
  }

  /**
   * getInstance
   * @static
   *
   * Singleton get instance.
   */
  private static getInstance(): Messaging {
    if(this._instance == null){
      this._instance = new Messaging();
    }

    return this._instance;
  }
}

export default Messaging.connection();