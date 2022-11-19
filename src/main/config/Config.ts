import dotenv from 'dotenv';
dotenv.config();

import { Dialect } from 'sequelize';

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
    port      : process.env.SERVER_PORT ?? 57898,
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

    main: {
      dialect   : (process.env.DB_CONNECTION ?? "postgres") as Dialect,
      uri       : process.env.DB_HOSTNAME ?? "127.0.0.1",
      port      : parseInt(process.env.DB_PORT ?? "5432"),
      database  : process.env.DB_DATABASE ?? '',
      username  : process.env.DB_USERNAME ?? 'root',
      password  : process.env.DB_PASSWORD ?? '',
      orm_driver: process.env.DB_ORM_DRIVER ?? 'sequelize',
      enable    : true
    },

    secondary: {
      dialect   : (process.env.DB2_CONNECTION ?? "postgres") as Dialect,
      uri       : process.env.DB2_HOSTNAME ?? "127.0.0.1",
      port      : parseInt(process.env.DB2_PORT ?? "5432"),
      database  : process.env.DB2_DATABASE ?? '',
      username  : process.env.DB2_USERNAME ?? 'root',
      password  : process.env.DB2_PASSWORD ?? '',
      orm_driver: process.env.DB2_ORM_DRIVER ?? 'sequelize',
      enable    : false
    },

    third_connection: {
      dialect   : (process.env.DB3_CONNECTION ?? "mysql") as Dialect,
      uri       : process.env.DB3_HOSTNAME ?? "127.0.0.1",
      port      : parseInt(process.env.DB3_PORT ?? "5432"),
      database  : process.env.DB3_DATABASE ?? '',
      username  : process.env.DB3_USERNAME ?? 'root',
      password  : process.env.DB3_PASSWORD ?? '',
      orm_driver: process.env.DB3_ORM_DRIVER ?? 'sequelize',
      enable    : false
    }

  }
  
}
