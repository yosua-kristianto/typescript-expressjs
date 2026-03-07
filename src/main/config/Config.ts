import dotenv from 'dotenv';
import path from 'path';
import {Dialect} from 'sequelize';

dotenv.config();

export default {
  /*
  |--------------------------------------------------------------------------
  | Server Identification
  |--------------------------------------------------------------------------
  |
  | Here is where you register the server identification. 
  | This value is used when the framework needs to place application's name.
  | 
  */
  server: {
    hostname  : process.env.SERVER_HOSTNAME ?? 'localhost',
    port      : process.env.SERVER_PORT ?? "57898",
    app       : process.env.APP_NAME ?? 'My App',
    env       : process.env.APP_ENV ?? 'production'
  },

  /*
  |--------------------------------------------------------------------------
  | Default Database Connection Configuration
  |--------------------------------------------------------------------------
  |
  | Here you may specify which of the database connections below you wish
  | to use as your default connection for all database work. Of course
  | you may use many connections at once using the Database library.
  |
  */
  database: {

    "main": {
      "dialect"   : (process.env.DB_MAIN_CONNECTION ?? "mssql") as Dialect,
      "uri"       : process.env.DB_MAIN_HOSTNAME ?? "127.0.0.1",
      "port"      : parseInt(process.env.DB_MAIN_PORT ?? "1433"),
      "database"  : process.env.DB_MAIN_DATABASE ?? '',
      "username"  : process.env.DB_MAIN_USERNAME ?? 'sa',
      "password"  : process.env.DB_MAIN_PASSWORD ?? 'root',
      "orm_driver": process.env.DB_ORM_DRIVER ?? 'sequelize',
      "path"      : [ path.join(__dirname, "../model/entity/main") ],
      "enable"    : true
    },

  },

  "memcache": {
    "main": {
      "host": process.env.MEMCACHE_MAIN_HOSTNAME ?? 'localhost',
      "port": parseInt(process.env.MEMCACHE_MAIN_PORT ?? '6379'),
      "db_cluster": parseInt(process.env.MEMCACHE_MAIN_DB_CLUSTER ?? '0'),
      "family": parseInt(process.env.MEMCACHE_MAIN_IP_VERSION ?? '4'),
      "password": process.env.MEMCACHE_MAIN_PASSWORD ?? 'root',
      "enable": false
    }
  },

  "messaging": {
    "main": {
      "connection_string": process.env.RABBITMQ_CONNECTION_STRING_MAIN ?? 'amqp://10.1.12.71:5672',
      "enable": false
    }
  },

  "mongod": {
    "main": {
      "host"      : process.env.MONGODB_HOSTNAME ?? "127.0.0.1",
      "port"      : parseInt(process.env.MONGODB_PORT ?? "27017"),
      "database"  : process.env.MONGODB_DATABASE ?? '',
      "username"  : process.env.MONGODB_USERNAME ?? '',
      "password"  : process.env.MONGODB_PASSWORD ?? '',
      "enable"   : false
    },
  }
  
}
