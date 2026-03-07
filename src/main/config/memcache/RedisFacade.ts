import config from '../Config';
import redis from 'ioredis';

export interface RedisConnectionSetup {
  port: number;
  host: string;
  family: number;
  password: string | undefined;
  db: number;
}

/**
 * Messaging
 *
 * This class contain Redis Instance initializer
 * for any function that might use Redis as
 * Message Broker.
 */
class RedisDriver {

  private configuration: RedisConnectionSetup;

  public constructor(setup: RedisConnectionSetup) {
    this.configuration = setup;
  }

  /**
   * authenticate
   *
   * This function will start the authentication to Redis.
   * Once the return statement being made, the returned value is the memcache driver settings loaded.
   */
  public authenticate(): any {
    return new redis({
      port: this.configuration.port,
      host: this.configuration.host,
      family: this.configuration.family,
      db: this.configuration.db,
      password: this.configuration.password,
    });
  }
}

/**
 * DatabaseSlave
 *
 * This function will return Slave that has been loaded with memcache configuration.
 * 1 RedisSlave represent one Memcache Connection.
 *
 * The slave will only make a pool into enabled connection.
 * See config.memcache
 *
 * @param connection
 * @constructor
 */
const RedisSlave = (connection = "main"): any => {
  type RedisConnectionObject = keyof typeof config.memcache;
  const selection = connection as RedisConnectionObject;

  if(!config.memcache[selection].enable){
    throw new Error(`WARNING: Connection ${connection} is not enabled!`);
  }

  return new RedisDriver({
    "port": config.memcache[selection].port,
    "host": config.memcache[selection].host,
    "family": config.memcache[selection].family,
    "db": config.memcache[selection].db_cluster,
    "password": config.memcache[selection].password,
  }).authenticate();
}

export class Memcache {

  private static _instance: Memcache | null = null;
  private memcacheConnectionSelector = {};
  private availableConnectionLabel: Array<string> = [];

  private constructor() {
    for(const e in config.memcache){

      type MemcacheConnectionSelectorKey = keyof typeof this.memcacheConnectionSelector;
      const objectKey = e as MemcacheConnectionSelectorKey;

      try{
        this.availableConnectionLabel.push(e);

        // @ts-ignore
        this.memcacheConnectionSelector[objectKey] = RedisSlave(e);

        console.log(`Connection to Redis ${objectKey} as a Memcache has been established`);
      }catch(error){
        // In some occasion, user. want to prepare multiple database connections
        // End up, the second even the third one will never be used.
        // To prevent error from the database connection, I use try-catch to skip the
        // connection selection on enable false. Check out config.database

        console.log(`Connection to Redis ${objectKey} as a Memcache cannot be establish: ${error}`);
      }

    }

  }

  public static connection = (connection = 'main'): any => {
    console.log("Attempt to change remote memcache to " + connection);
    return this.getInstance().getConnection(connection);
  }

  private getConnection = (connection = 'main'): any => {
    if(!this.availableConnectionLabel.includes(connection)){
      throw new Error(`Connection with label of ${connection} is not set! Please consider to check Config.ts within database configuration`);
    }

    type MemcacheConnectionSelectorKey = keyof typeof this.memcacheConnectionSelector;
    const objectKey = connection as MemcacheConnectionSelectorKey;

    const selectedConnection = this.memcacheConnectionSelector[objectKey];
    return selectedConnection;
  }


  /**
   * getInstance
   * @static
   *
   * Singleton get instance.
   */
  private static getInstance(): Memcache {
    if(this._instance == null){
      this._instance = new Memcache();
    }

    return this._instance;
  }
}

export default Memcache.connection();