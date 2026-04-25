# Cuakx Express — Express.js TypeScript Boilerplate

<pre align="center">
   ________  _____    __ ___  __                 
  / ____/ / / /   |  / //_/ |/ /                 
 / /   / / / / /| | / ,<  |   /                  
/ /___/ /_/ / ___ |/ /| |/   |                   
\____/\____/_/__|_/_/_|_/_/|_|_  ________________
        / ____/ |/ // __ \/ __ \/ ____/ ___/ ___/
       / __/  |   // /_/ / /_/ / __/  \__ \\__ \ 
      / /___ /   |/ ____/ _, _/ /___ ___/ /__/ / 
     /_____//_/|_/_/   /_/ |_/_____//____/____/  
</pre>

A production-ready backend starter kit built with **Express.js** and **TypeScript**. Designed for modular, scalable services with first-class support for SQL, NoSQL, messaging brokers, file storage, caching, notifications, and scheduled jobs — all driven by environment configuration.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [NPM Scripts](#npm-scripts)
- [Configuration Reference](#configuration-reference)
- [Security Middleware](#security-middleware)
- [Logging & Logstash](#logging--logstash)
- [Notification Channels](#notification-channels)
- [Swagger API Docs](#swagger-api-docs)
- [Cuakx CLI Generator](#cuakx-cli-generator)
- [Built-in Endpoints](#built-in-endpoints)
- [Credits](#credits)

---

## Overview

**Cuakx Express** is a structured, opinionated backend boilerplate for Node.js services. All integrations are toggle-controlled via `.env` so unused infrastructure is never initialized at startup.

Included integrations:

| Category | Technology |
| --- | --- |
| HTTP Framework | Express.js 5 via `@fastify/express` |
| Language | TypeScript 5, Node.js >= 22 |
| SQL Databases | MySQL, PostgreSQL, MSSQL via Sequelize |
| NoSQL | MongoDB via Mongoose |
| Caching | Redis via `ioredis` |
| Messaging | RabbitMQ (AMQP), Kafka, Redis Streams, MQTT |
| File Storage | Local disk, AWS S3, MinIO |
| Notifications | SMTP, FCM, Brevo (SendInBlue), SMS, WhatsApp |
| Logging | Local file, Logstash (UDP/TCP) |
| Scheduling | Cron-based job engine |
| Security | Request throttling, CSRF validation, input purifier |
| API Docs | Swagger / OpenAPI 3.0 |
| Testing | Jest + ts-jest + supertest |
| Code Quality | ESLint, Husky pre-commit hooks |
| Containers | Docker-ready |

---

## Project Structure

```
src/
├── cli/
│   └── cuakx.ts                  # Code generator CLI
├── main/
│   ├── Index.ts                  # Application entry point
│   ├── api/
│   │   └── <module>/             # Controller, handler, validation, DTO
│   ├── bootstrap/                # Startup wiring for each subsystem
│   │   ├── ConfigurationBootstrap.ts
│   │   ├── DatabaseBootstrap.ts
│   │   ├── ListenerBootstrap.ts
│   │   ├── RouteBootstrap.ts
│   │   ├── SwaggerBootstrap.ts
│   │   ├── CronBootstrap.ts
│   │   ├── MessagingBootstrap.ts
│   │   └── NotificationBootstrap.ts
│   ├── common/
│   │   ├── facade/auth/          # JWT authentication guard
│   │   └── interceptor/          # CORS, security middleware stack
│   ├── config/
│   │   └── Config.ts             # Centralized env-driven configuration
│   ├── cronjob/                  # Scheduled job implementations
│   ├── messaging/
│   │   ├── puller/               # Message consumers
│   │   └── pusher/               # Message publishers
│   ├── model/
│   │   ├── entity/               # Sequelize/Mongoose model definitions
│   │   └── memcache/             # Redis cache model definitions
│   ├── repository/               # Database repository layer
│   └── routes/
│       └── RouteManagement.ts    # Application route registration
└── resources/
    ├── sequelize-cli/
    │   ├── migrations/
    │   └── seeders/
    └── swagger/
        └── swagger-documentation-example.yaml
```

---

## Getting Started

### Prerequisites

- Node.js >= 22
- Yarn (monorepo uses Yarn workspaces)
- Docker (recommended for local infrastructure: Redis, RabbitMQ, databases)

### Install dependencies

```bash
git clone https://github.com/yosua-kristianto/Cuakx-Express.git
cd Cuakx-Express
yarn install
```

### Configure environment

```bash
cp packages/boilerplate/.env.example packages/boilerplate/.env
```

Edit `.env` and enable only the integrations you need (set `*_ENABLE=true`).

### Start development server

```bash
yarn workspace cuakx-express-boilerplate dev
```

---

## NPM Scripts

Run scripts from the boilerplate package with `yarn workspace cuakx-express-boilerplate <script>`.

| Script | Description |
| --- | --- |
| `dev` | Start development server with hot reload via `nodemon` |
| `build` | Compile TypeScript to `dist/` using `tsconfig.build.json` |
| `start` | Build then start the compiled application |
| `test` | Run all Jest tests |
| `lint` | Run ESLint on `src/main/` |
| `db:init` | Create the database via Sequelize CLI |
| `migrate` | Run all pending Sequelize migrations |
| `migrate:rollback` | Undo the last migration |
| `migrate:rollback:all` | Undo all migrations |
| `migrate:refresh` | Drop, recreate, and re-run all migrations |
| `seed` | Run all Sequelize seed files |
| `migrate:refresh:seed` | `migrate:refresh` + `seed` in sequence |
| `deploy:production` | Migrate → build → start |
| `deploy:production:dummies` | Migrate:refresh → seed → build → start |
| `prepare` | Install Husky Git hooks |

---

## Configuration Reference

All configuration lives in `src/main/config/Config.ts` and is sourced from environment variables. Copy `.env.example` to `.env` to get started.

### Server

| Variable | Default | Description |
| --- | --- | --- |
| `SERVER_HOSTNAME` | `localhost` | Bind hostname |
| `SERVER_PORT` | `57898` | HTTP port |
| `APP_NAME` | `My App` | Application display name |
| `APP_ENV` | `production` | Environment name (affects Swagger visibility) |

### Database (SQL via Sequelize)

| Variable | Default | Description |
| --- | --- | --- |
| `DB_MAIN_ENABLE` | `false` | Enable/disable the main SQL connection |
| `DB_MAIN_CONNECTION` | `mssql` | Dialect: `mysql`, `postgres`, `mssql` |
| `DB_MAIN_HOSTNAME` | `127.0.0.1` | Database host |
| `DB_MAIN_PORT` | `1433` | Database port |
| `DB_MAIN_DATABASE` | — | Database name |
| `DB_MAIN_USERNAME` | `sa` | Username |
| `DB_MAIN_PASSWORD` | `root` | Password |

### MongoDB

| Variable | Default | Description |
| --- | --- | --- |
| `MONGODB_HOSTNAME` | `127.0.0.1` | MongoDB host |
| `MONGODB_PORT` | `27017` | MongoDB port |
| `MONGODB_DATABASE` | — | Database name |
| `MONGODB_USERNAME` | — | Username |
| `MONGODB_PASSWORD` | — | Password |

### Cache (Redis)

| Variable | Default | Description |
| --- | --- | --- |
| `MEMCACHE_MAIN_ENABLE` | `false` | Enable Redis connection |
| `MEMCACHE_MAIN_HOSTNAME` | `localhost` | Redis host |
| `MEMCACHE_MAIN_PORT` | `6379` | Redis port |
| `MEMCACHE_MAIN_PASSWORD` | `root` | Redis password |
| `MEMCACHE_MAIN_DB_CLUSTER` | `0` | Redis DB index |

### Messaging Broker

| Variable | Default | Description |
| --- | --- | --- |
| `MESSAGING_MAIN_ENABLE` | `false` | Enable messaging |
| `MESSAGING_MAIN_DRIVER` | `amqp` | Driver: `amqp`, `redis`, `kafka`, `mqtt` |
| `RABBITMQ_CONNECTION_STRING_MAIN` | `amqp://...` | AMQP connection string (amqp driver) |
| `MESSAGING_MAIN_HOSTNAME` | `127.0.0.1` | Broker host (redis/mqtt) |
| `MESSAGING_MAIN_PORT` | `5672` | Broker port |
| `MESSAGING_MAIN_BROKERS` | — | Comma-separated brokers (kafka driver) |
| `MESSAGING_MAIN_CLIENT_ID` | `cuakx-boilerplate` | Kafka client ID |
| `MESSAGING_MAIN_PROTOCOL` | `mqtt` | MQTT protocol: `mqtt`, `mqtts`, `ws`, `wss` |

### File Storage

| Variable | Default | Description |
| --- | --- | --- |
| `FILE_DRIVER_DEFAULT` | `local` | Driver: `local`, `s3`, `minio` |
| `FILE_DRIVER_LOCAL_ROOT_PATH` | `./storage` | Local storage root |
| `FILE_DRIVER_S3_REGION` | `us-east-1` | AWS region |
| `FILE_DRIVER_S3_BUCKET` | — | S3 bucket name |
| `FILE_DRIVER_S3_ACCESS_KEY_ID` | — | AWS access key |
| `FILE_DRIVER_S3_SECRET_ACCESS_KEY` | — | AWS secret |
| `FILE_DRIVER_MINIO_ENDPOINT` | `127.0.0.1` | MinIO host |
| `FILE_DRIVER_MINIO_PORT` | `9000` | MinIO port |
| `FILE_DRIVER_MINIO_ACCESS_KEY` | — | MinIO access key |
| `FILE_DRIVER_MINIO_SECRET_KEY` | — | MinIO secret |
| `FILE_DRIVER_MINIO_BUCKET` | — | MinIO bucket |

---

## Security Middleware

Three security middleware layers are applied globally to all routes. Each can be independently toggled.

### Throttling

Rate-limits requests per IP + path combination.

| Variable | Default | Description |
| --- | --- | --- |
| `SECURITY_THROTTLING_ENABLE` | `true` | Enable rate limiting |
| `SECURITY_THROTTLING_WINDOW_MS` | `60000` | Time window in milliseconds |
| `SECURITY_THROTTLING_MAX_REQUESTS` | `80` | Max requests per window per IP+path |

Returns `429` with `{ code: "THROTTLED" }` when the limit is exceeded.

### CSRF Validation

Validates a custom header token on state-mutating requests.

| Variable | Default | Description |
| --- | --- | --- |
| `SECURITY_CSRF_ENABLE` | `true` | Enable CSRF validation |
| `SECURITY_CSRF_HEADER` | `x-csrf-token` | Header name to check |
| `SECURITY_CSRF_METHODS` | `POST,PUT,PATCH,DELETE` | Methods that require the token |
| `SECURITY_CSRF_SECRET` | `change-me` | Secret used to validate the token value |

Returns `403` with `{ code: "CSRF_MISSING" }` or `{ code: "CSRF_INVALID" }`.

### Input Purifier

Strips HTML tags and SQL injection patterns from incoming request data in-place.

| Variable | Default | Description |
| --- | --- | --- |
| `SECURITY_PURIFIER_ENABLE` | `true` | Enable input purification |
| `SECURITY_PURIFIER_BODY` | `true` | Purify request body |
| `SECURITY_PURIFIER_QUERY` | `true` | Purify query string parameters |
| `SECURITY_PURIFIER_PARAMS` | `true` | Purify route parameters |

---

## Logging & Logstash

The logging system supports three drivers, configurable at runtime.

| Variable | Default | Description |
| --- | --- | --- |
| `LOG_DRIVER` | `local` | Driver: `local`, `logstash`, `both` |
| `LOG_DIRECTORY` | `./logs` | Directory for local log files (named `YYYY-MM-DD.log`) |
| `LOGSTASH_ENABLE` | `false` | Enable Logstash output |
| `LOGSTASH_HOST` | `127.0.0.1` | Logstash host |
| `LOGSTASH_PORT` | `5000` | Logstash port |
| `LOGSTASH_PROTOCOL` | `udp` | Transport protocol: `udp` or `tcp` |

All log lines emitted via `Log.i()`, `Log.d()`, `Log.e()`, `Log.w()` are dispatched to the active driver(s) without any API change.

---

## Notification Channels

Notifications are sent via a chainable builder. Enable each channel independently in `.env`.

### SMTP

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_SMTP_ENABLE` | `false` | Enable SMTP channel |
| `NOTIFICATION_SMTP_HOST` | `127.0.0.1` | SMTP server host |
| `NOTIFICATION_SMTP_PORT` | `587` | SMTP port |
| `NOTIFICATION_SMTP_SECURE` | `false` | Use TLS |
| `NOTIFICATION_SMTP_USERNAME` | — | SMTP username |
| `NOTIFICATION_SMTP_PASSWORD` | — | SMTP password |
| `NOTIFICATION_SMTP_FROM` | `no-reply@example.com` | Sender address |

### FCM (Firebase Cloud Messaging)

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_FCM_ENABLE` | `false` | Enable FCM push notifications |
| `NOTIFICATION_FCM_ENDPOINT` | FCM v1 URL | FCM HTTP v1 endpoint |
| `NOTIFICATION_FCM_BEARER_TOKEN` | — | OAuth2 bearer token |

### Brevo / SendInBlue

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_SENDINBLUE_ENABLE` | `false` | Enable Brevo transactional email |
| `NOTIFICATION_SENDINBLUE_API_KEY` | — | Brevo API key |
| `NOTIFICATION_SENDINBLUE_FROM_EMAIL` | `no-reply@example.com` | Sender address |
| `NOTIFICATION_SENDINBLUE_FROM_NAME` | `Cuakx App` | Sender display name |

### SMS

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_SMS_ENABLE` | `false` | Enable SMS channel |
| `NOTIFICATION_SMS_ENDPOINT` | — | SMS provider endpoint URL |
| `NOTIFICATION_SMS_API_KEY` | — | SMS provider API key |

### WhatsApp

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_WHATSAPP_ENABLE` | `false` | Enable WhatsApp channel |
| `NOTIFICATION_WHATSAPP_ENDPOINT` | — | WhatsApp provider endpoint URL |
| `NOTIFICATION_WHATSAPP_API_KEY` | — | WhatsApp provider API key |

### Usage example

```typescript
import { registerNotificationChannels } from './bootstrap';

const notif = registerNotificationChannels();

await notif
  .channel()
  .smtp()
  .fcm()
  .send({
    to: 'user@example.com',
    subject: 'Welcome',
    body: 'Your account is ready.',
  });
```

---

## Swagger API Docs

Swagger is available only when `APP_ENV` is not `production`.

| Variable | Default | Description |
| --- | --- | --- |
| `SWAGGER_ENABLE` | `false` | Enable Swagger UI |
| `APP_ENV` | `production` | Must not be `production` to expose docs |

Access the UI at:

```
http://<SERVER_HOSTNAME>:<SERVER_PORT>/api/swagger
```

**Adding documentation:**

- Add OpenAPI 3 YAML blocks to `src/resources/swagger/swagger-documentation-example.yaml`
- Or annotate controller files under `src/main/api/` with JSDoc `@swagger` comments
- The Swagger bootstrap merges both sources automatically on startup

---

## Cuakx CLI Generator

The `cuakx` CLI scaffolds application code and auto-wires generated files into the appropriate bootstrap.

```bash
yarn cuakx <command> <type> <Name>
```

Both `create` and `make` are accepted as the command prefix.

### Commands

| Command | Example | Description |
| --- | --- | --- |
| `make module` | `yarn cuakx make module PaymentGateway` | Scaffold a full API module (controller, handler, validation, DTO) |
| `make cronjob` | `yarn cuakx make cronjob PaymentRetry` | Generate a cron job and auto-register it in `CronBootstrap` |
| `make messaging` | `yarn cuakx make messaging UserOnboarded` | Generate a message consumer and auto-register it in `MessagingBootstrap` |
| `make cache` | `yarn cuakx make cache SessionToken` | Generate a Redis cache repository |
| `make repository` | `yarn cuakx make repository OrderReport` | Generate a database repository |

**Naming rules:**
- All names must be in **PascalCase**: `NotificationPlatform`, `PaymentRetry`
- Folder names are generated in dot-case automatically: `notification.platform/`, `payment.retry/`
- `make cronjob` and `make messaging` update `CronBootstrap.ts` and `MessagingBootstrap.ts` in-place — no manual wiring needed

---

## Built-in Endpoints

The following endpoints are registered automatically by the core layer:

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/heartbeat` | Liveness check — returns `{ status: "alive", timestamp }` |

---

## Credits

Built by Yosua Kristianto.

MIT © 2025