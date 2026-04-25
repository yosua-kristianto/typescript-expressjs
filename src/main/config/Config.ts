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
      "path"      : [ path.join(__dirname, "../model/entity/main") ],
      "enable"    : (process.env.DB_MAIN_ENABLE ?? 'false') === 'true'
    },

  },

  "memcache": {
    "main": {
      "host": process.env.MEMCACHE_MAIN_HOSTNAME ?? 'localhost',
      "port": parseInt(process.env.MEMCACHE_MAIN_PORT ?? '6379'),
      "db_cluster": parseInt(process.env.MEMCACHE_MAIN_DB_CLUSTER ?? '0'),
      "family": parseInt(process.env.MEMCACHE_MAIN_IP_VERSION ?? '4'),
      "password": process.env.MEMCACHE_MAIN_PASSWORD ?? 'root',
      "enable": (process.env.MEMCACHE_MAIN_ENABLE ?? 'false') === 'true'
    }
  },

  "messaging": {
    "main": {
      // Driver examples:
      // amqp  => set connection_string
      // redis => set host/port/database
      // kafka => set brokers and client_id
      // mqtt  => set protocol/host/port
      "driver": (process.env.MESSAGING_MAIN_DRIVER ?? 'amqp') as 'amqp' | 'redis' | 'kafka' | 'mqtt',
      "connection_string": process.env.RABBITMQ_CONNECTION_STRING_MAIN ?? 'amqp://10.1.12.71:5672',
      "host": process.env.MESSAGING_MAIN_HOSTNAME ?? '127.0.0.1',
      "port": parseInt(process.env.MESSAGING_MAIN_PORT ?? '5672'),
      "username": process.env.MESSAGING_MAIN_USERNAME,
      "password": process.env.MESSAGING_MAIN_PASSWORD,
      "database": parseInt(process.env.MESSAGING_MAIN_DB ?? '0'),
      "brokers": (process.env.MESSAGING_MAIN_BROKERS ?? '').split(',').map((e) => e.trim()).filter(Boolean),
      "client_id": process.env.MESSAGING_MAIN_CLIENT_ID ?? 'cuakx-boilerplate',
      "protocol": (process.env.MESSAGING_MAIN_PROTOCOL ?? 'mqtt') as 'mqtt' | 'mqtts' | 'ws' | 'wss',
      "enable": (process.env.MESSAGING_MAIN_ENABLE ?? 'false') === 'true'
    }
  },

  "file_driver": {
    "default_driver": (process.env.FILE_DRIVER_DEFAULT ?? 'local') as 'local' | 's3' | 'minio',
    "local": {
      "root_path": process.env.FILE_DRIVER_LOCAL_ROOT_PATH ?? path.resolve(process.cwd(), 'storage')
    },
    "s3": {
      "region": process.env.FILE_DRIVER_S3_REGION ?? 'us-east-1',
      "bucket": process.env.FILE_DRIVER_S3_BUCKET ?? 'bucket-name',
      "access_key_id": process.env.FILE_DRIVER_S3_ACCESS_KEY_ID ?? '',
      "secret_access_key": process.env.FILE_DRIVER_S3_SECRET_ACCESS_KEY ?? '',
      "endpoint": process.env.FILE_DRIVER_S3_ENDPOINT,
      "force_path_style": (process.env.FILE_DRIVER_S3_FORCE_PATH_STYLE ?? 'false') === 'true'
    },
    "minio": {
      "end_point": process.env.FILE_DRIVER_MINIO_ENDPOINT ?? '127.0.0.1',
      "port": parseInt(process.env.FILE_DRIVER_MINIO_PORT ?? '9000'),
      "use_ssl": (process.env.FILE_DRIVER_MINIO_USE_SSL ?? 'false') === 'true',
      "access_key": process.env.FILE_DRIVER_MINIO_ACCESS_KEY ?? '',
      "secret_key": process.env.FILE_DRIVER_MINIO_SECRET_KEY ?? '',
      "bucket": process.env.FILE_DRIVER_MINIO_BUCKET ?? 'bucket-name'
    }
  },

  "security": {
    "throttling": {
      "enable": (process.env.SECURITY_THROTTLING_ENABLE ?? 'true') === 'true',
      "window_ms": parseInt(process.env.SECURITY_THROTTLING_WINDOW_MS ?? '60000'),
      "max_requests": parseInt(process.env.SECURITY_THROTTLING_MAX_REQUESTS ?? '80')
    },
    "csrf": {
      "enable": (process.env.SECURITY_CSRF_ENABLE ?? 'true') === 'true',
      "header": process.env.SECURITY_CSRF_HEADER ?? 'x-csrf-token',
      "methods": (process.env.SECURITY_CSRF_METHODS ?? 'POST,PUT,PATCH,DELETE').split(',').map((e) => e.trim()).filter(Boolean),
      "secret": process.env.SECURITY_CSRF_SECRET ?? 'change-me'
    },
    "purifier": {
      "enable": (process.env.SECURITY_PURIFIER_ENABLE ?? 'true') === 'true',
      "body": (process.env.SECURITY_PURIFIER_BODY ?? 'true') === 'true',
      "query": (process.env.SECURITY_PURIFIER_QUERY ?? 'true') === 'true',
      "params": (process.env.SECURITY_PURIFIER_PARAMS ?? 'true') === 'true'
    }
  },

  "logging": {
    "driver": (process.env.LOG_DRIVER ?? 'local') as 'local' | 'logstash' | 'both',
    "directory": process.env.LOG_DIRECTORY ?? path.resolve(process.cwd(), 'logs'),
    "logstash": {
      "enable": (process.env.LOGSTASH_ENABLE ?? 'false') === 'true',
      "host": process.env.LOGSTASH_HOST ?? '127.0.0.1',
      "port": parseInt(process.env.LOGSTASH_PORT ?? '5000'),
      "protocol": (process.env.LOGSTASH_PROTOCOL ?? 'udp') as 'udp' | 'tcp'
    }
  },

  "notification": {
    "smtp": {
      "enable": (process.env.NOTIFICATION_SMTP_ENABLE ?? 'false') === 'true',
      "host": process.env.NOTIFICATION_SMTP_HOST ?? '127.0.0.1',
      "port": parseInt(process.env.NOTIFICATION_SMTP_PORT ?? '587'),
      "secure": (process.env.NOTIFICATION_SMTP_SECURE ?? 'false') === 'true',
      "username": process.env.NOTIFICATION_SMTP_USERNAME ?? '',
      "password": process.env.NOTIFICATION_SMTP_PASSWORD ?? '',
      "from": process.env.NOTIFICATION_SMTP_FROM ?? 'no-reply@example.com'
    },
    "fcm": {
      "enable": (process.env.NOTIFICATION_FCM_ENABLE ?? 'false') === 'true',
      "endpoint": process.env.NOTIFICATION_FCM_ENDPOINT ?? 'https://fcm.googleapis.com/v1/projects/project-id/messages:send',
      "bearer_token": process.env.NOTIFICATION_FCM_BEARER_TOKEN ?? ''
    },
    "sendinblue": {
      "enable": (process.env.NOTIFICATION_SENDINBLUE_ENABLE ?? 'false') === 'true',
      "api_key": process.env.NOTIFICATION_SENDINBLUE_API_KEY ?? '',
      "from_email": process.env.NOTIFICATION_SENDINBLUE_FROM_EMAIL ?? 'no-reply@example.com',
      "from_name": process.env.NOTIFICATION_SENDINBLUE_FROM_NAME ?? 'Cuakx App'
    },
    "sms": {
      "enable": (process.env.NOTIFICATION_SMS_ENABLE ?? 'false') === 'true',
      "endpoint": process.env.NOTIFICATION_SMS_ENDPOINT ?? 'https://sms-provider.example/send',
      "api_key": process.env.NOTIFICATION_SMS_API_KEY ?? ''
    },
    "whatsapp": {
      "enable": (process.env.NOTIFICATION_WHATSAPP_ENABLE ?? 'false') === 'true',
      "endpoint": process.env.NOTIFICATION_WHATSAPP_ENDPOINT ?? 'https://whatsapp-provider.example/send',
      "api_key": process.env.NOTIFICATION_WHATSAPP_API_KEY ?? ''
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
