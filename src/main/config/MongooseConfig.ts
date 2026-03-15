import mongoose from "mongoose";
import config from "@config/Config";

interface MongooseConnectionSetup {
  "host": string;
  "port": number;
  "database": string;
  "username": string;
  "password": string;
}

class MongooseDriver {
  private configuration: MongooseConnectionSetup;

  public constructor(setup: MongooseConnectionSetup){
    this.configuration = setup;
  }

  /**
   * authenticate
   *
   * This function will start the authentication to Mongoose.
   * Once the return statement being made, the returned value is the mongoose driver settings loaded.
   */
  public async authenticate(): Promise<any> {
    const connectionString = `mongodb://${this.configuration.username === '' && this.configuration.password === '' ? '' : `${this.configuration.username}:${this.configuration.password}@`}${this.configuration.host}:${this.configuration.port}`;

    return await mongoose.connect(connectionString, {
      dbName: this.configuration.database,
    });
  }
}

/**
 * MongooseSlave
 *
 * This function will return Slave that has been loaded with mongoose configuration.
 * 1 MongooseSlave represent one Mongoose Connection.
 *
 * The slave will only make a pool into enabled connection.
 * See config.mongod
 *
 * @param connection
 * @constructor
 */
const MongooseSlave = (connection = "main"): any => {
  type MongooseConnectionObject = keyof typeof config.mongod;

  const selection = connection as MongooseConnectionObject;

  if(!config.mongod[selection].enable){
    throw new Error(`WARNING: Connection ${connection} is not enabled!`);
  }

  return new MongooseDriver({
    "host": config.mongod[selection].host,
    "port": config.mongod[selection].port,
    "database": config.mongod[selection].database,
    "username": config.mongod[selection].username,
    "password": config.mongod[selection].password
  }).authenticate()
}

export class Mongoose {

  private static _instance: Mongoose | null = null;
  private mongodConnectionSelector = {};
  private availableConnectionLabel: Array<string> = [];

  private constructor() {
    for(const e in config.mongod){

      type MongodConnectionSelectorKey = keyof typeof this.mongodConnectionSelector;
      const objectKey = e as MongodConnectionSelectorKey;

      try {
        this.availableConnectionLabel.push(e);

        // @ts-ignore
        this.mongodConnectionSelector[objectKey] = MongooseSlave(e);

        
        console.log(`Connection to MongoDB ${objectKey} has been established`);
        
      } catch(error: any){
        // In some occasion, user. want to prepare multiple mongoose connections
        // End up, the second even the third one will never be used.
        // To prevent error from the connection, I use try-catch to skip the
        // connection selection on enable false. Check out config.mongod

        console.log(`Connection to MongoDB ${objectKey} cannot be establish: ${error}`);
      }

    }
  }

  public static connection = (connection = 'main'): any => {
    console.log("Attempt to change remote mongod to " + connection);
    return this.getInstance().getConnection(connection);
  }

  private getConnection = (connection = 'main'): any => {
    if (!this.availableConnectionLabel.includes(connection)) {
      throw new Error(`Connection with label of ${connection} is not set! Please consider to check Config.ts within mongod configuration`);
    }

    type MongodConnectionSelectorKey = keyof typeof this.mongodConnectionSelector;
    const objectKey = connection as MongodConnectionSelectorKey;

    console.log(this.availableConnectionLabel)

    const seletedConnection = this.mongodConnectionSelector[objectKey];
    return seletedConnection;
  }

  /**
   * getInstance
   * @static
   *
   * Singleton get instance.
   */
  private static getInstance(): Mongoose {
    if(this._instance == null){
      this._instance = new Mongoose();
    }

    return this._instance;
  }
}

export default Mongoose.connection();