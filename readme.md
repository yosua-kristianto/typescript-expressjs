# Cuakx Express Boilerplate

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
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [NPM Scripts](#npm-scripts)
- [Startup Sequence](#startup-sequence)
- [Configuration Reference](#configuration-reference)
- [Data Model](#data-model)
- [API Layer](#api-layer)
- [Messaging](#messaging)
- [Scheduled Jobs](#scheduled-jobs)
- [Security Middleware](#security-middleware)
- [Logging & Logstash](#logging--logstash)
- [Notification Channels](#notification-channels)
- [Swagger API Docs](#swagger-api-docs)
- [Database Migrations & Seeds](#database-migrations--seeds)
- [Cuakx CLI Generator](#cuakx-cli-generator)
- [Testing](#testing)
- [Built-in Endpoints](#built-in-endpoints)
- [Docker](#docker)
- [Credits](#credits)

---

## Overview

**Cuakx Express** is a structured, opinionated backend boilerplate for Node.js services. It is built on top of [`cuakx-express-core`](https://www.npmjs.com/package/cuakx-express-core), which provides the base classes, facades, and utilities. This boilerplate wires them together into a runnable service.

All integrations are toggle-controlled via `.env` — unused infrastructure is never initialized at startup.

---

## Tech Stack

| Category | Technology |
| --- | --- |
| HTTP Framework | Express.js 5 bridged via `@fastify/express` |
| Language | TypeScript 5, Node.js >= 22 |
| Core Library | `cuakx-express-core` |
| SQL ORM | Sequelize 6 + `sequelize-typescript` |
| SQL Drivers | MySQL 2, PostgreSQL (`pg`), MSSQL (`mssql` + `tedious`) |
| NoSQL | MongoDB via Mongoose |
| Caching | Redis via `ioredis` |
| Messaging | RabbitMQ (AMQP), Kafka, Redis Streams, MQTT |
| File Storage | Local disk, AWS S3, MinIO |
| Notifications | SMTP, FCM, Brevo (SendinBlue), SMS, WhatsApp |
| Logging | Local file, Logstash (UDP/TCP) |
| Scheduling | Cron engine via `node-cron` |
| Validation | `express-validator` |
| Security | Rate limiting, CSRF validation, input sanitizer |
| API Docs | Swagger UI / OpenAPI 3.0 |
| Testing | Jest 30 + `ts-jest` |
| Code Quality | ESLint, Husky pre-push hooks |
| Containers | Docker |

---

## Project Structure

```
src/
├── main/
│   ├── Index.ts                  # Application entry point
│   ├── api/
│   │   └── <module>/             # Controller, handler, DTO, validation, exception
│   ├── bootstrap/                # Startup wiring for each subsystem
│   │   ├── ConfigurationBootstrap.ts   # dotenv + logging + banner
│   │   ├── DatabaseBootstrap.ts        # SQL database connection
│   │   ├── RouteBootstrap.ts           # Express route registration
│   │   ├── SwaggerBootstrap.ts         # Swagger UI
│   │   ├── CronBootstrap.ts            # Scheduled job registration
│   │   ├── MessagingBootstrap.ts       # Message broker consumer registration
│   │   ├── NotificationBootstrap.ts    # Notification channel initialization
│   │   ├── ListenerBootstrap.ts        # Fastify + Express HTTP listener
│   │   └── index.ts                    # Barrel re-exports
│   ├── common/
│   │   ├── facade/auth/          # JWT decode and validation helpers
│   │   └── interceptor/          # CORS + security middleware stack
│   ├── config/
│   │   └── Config.ts             # Centralized env-driven configuration
│   ├── cronjob/                  # Cron job implementations
│   ├── messaging/
│   │   ├── example/              # Example event consumer
│   │   ├── puller/               # Generic broker consumer entry
│   │   └── pusher/               # Generic broker publisher entry
│   ├── model/
│   │   ├── entity/               # Sequelize-TypeScript entity definitions
│   │   └── memcache/             # Redis cache model definitions
│   ├── repository/               # Database repository layer
│   └── routes/
│       └── RouteManagement.ts    # Application route registration
├── resources/
│   ├── banner/
│   │   └── Banner.txt            # ASCII art printed at startup
│   ├── sequelize-cli/
│   │   ├── SequelizeCliConfig.js
│   │   ├── migrations/
│   │   └── seeders/
│   └── swagger/
│       ├── SwaggerOption.ts
│       └── swagger-documentation-example.yaml
└── test/
    └── Index.test.ts
```

---

## Getting Started

### Prerequisites

- Node.js >= 22
- npm >= 10

### Install dependencies

```bash
git clone https://github.com/yosua-kristianto/Cuakx-Express.git
cd Cuakx-Express
npm install
```

### Configure environment

```bash
cp .env.example .env
```

Edit `.env` and enable only the integrations you need (set the corresponding `*_ENABLE=true`).

### Start development server

```bash
npm run dev
```

The server starts on `http://localhost:57898` by default (configurable via `SERVER_PORT`).

---

## NPM Scripts

| Script | Description |
| --- | --- |
| `dev` | Start development server with hot reload (`nodemon` + `ts-node`) |
| `build` | Compile TypeScript to `dist/` via `tsconfig.build.json` |
| `start` | Build, then run the compiled output |
| `test` | Run all Jest tests |
| `lint` | Run ESLint over `src/main/` |
| `db:init` | Create the database schema (Sequelize CLI) |
| `migrate` | Run all pending migrations |
| `migrate:rollback` | Undo the last applied migration |
| `migrate:rollback:all` | Undo all migrations |
| `migrate:refresh` | Drop → create → re-run all migrations |
| `seed` | Run all seeder files |
| `migrate:refresh:seed` | `migrate:refresh` then `seed` |
| `deploy:production` | `migrate` → `build` → `start` |
| `deploy:production:dummies` | `migrate:refresh` → `seed` → `build` → `start` |
| `prepare` | Install Husky Git hooks |

---

## Startup Sequence

`src/main/Index.ts` boots the application in the following fixed order:

1. **`setupConfiguration()`** — load `.env`, initialize logging, print the ASCII banner
2. **`registerDatabaseConnections()`** — connect to the configured SQL database (non-blocking; logs a warning on failure)
3. **`registerCronjobs()`** — create the cron engine and start all registered jobs
4. **`registerNotificationChannels()`** — initialize enabled notification channel adapters
5. **Interceptors** — attach CORS headers, throttling, CSRF validation, and input sanitization middleware to the Express router
6. **Response handler** — mount the core response serializer
7. **`registerSwagger()`** — conditionally mount Swagger UI at `/api/swagger`
8. **`registerRoutes()`** — register application routes under `/api`
9. **Error handler** — global Express error middleware via `ErrorHandler`
10. **404 fallback** — returns `{ status: 404, message: "Not Found" }`
11. **`registerMessageBroker()`** — start async message consumers (fire-and-forget)
12. **`startListener()`** — bind the Fastify + Express HTTP server

---

## Configuration Reference

All configuration is sourced from environment variables and centralized in `src/main/config/Config.ts`.

### Server

| Variable | Default | Description |
| --- | --- | --- |
| `SERVER_HOSTNAME` | `localhost` | Bind hostname (uses `0.0.0.0` in production) |
| `SERVER_PORT` | `57898` | HTTP port |
| `SERVER_URI` | — | Public base URI (used in Swagger server block) |
| `APP_NAME` | `My App` | Application display name |
| `APP_ENV` | `production` | Environment label; controls Swagger visibility |

### Database (SQL via Sequelize)

| Variable | Default | Description |
| --- | --- | --- |
| `DB_MAIN_ENABLE` | `false` | Enable the main SQL connection |
| `DB_MAIN_CONNECTION` | `mssql` | Dialect: `mysql`, `postgres`, or `mssql` |
| `DB_MAIN_HOSTNAME` | `127.0.0.1` | Database host |
| `DB_MAIN_PORT` | `1433` | Database port |
| `DB_MAIN_DATABASE` | — | Database/schema name |
| `DB_MAIN_USERNAME` | `sa` | Database username |
| `DB_MAIN_PASSWORD` | `root` | Database password |

### MongoDB

| Variable | Default | Description |
| --- | --- | --- |
| `MONGODB_HOSTNAME` | `127.0.0.1` | MongoDB host |
| `MONGODB_PORT` | `27017` | MongoDB port |
| `MONGODB_DATABASE` | — | Database name |
| `MONGODB_USERNAME` | — | Username |
| `MONGODB_PASSWORD` | — | Password |

MongoDB integration is available but disabled by default. Uncomment the import in `src/main/Index.ts` to activate it.

### Cache (Redis)

| Variable | Default | Description |
| --- | --- | --- |
| `MEMCACHE_MAIN_ENABLE` | `false` | Enable the main Redis connection |
| `MEMCACHE_MAIN_HOSTNAME` | `localhost` | Redis host |
| `MEMCACHE_MAIN_PORT` | `6379` | Redis port |
| `MEMCACHE_MAIN_PASSWORD` | `root` | Redis auth password |
| `MEMCACHE_MAIN_DB_CLUSTER` | `0` | Redis DB index |
| `MEMCACHE_MAIN_IP_VERSION` | `4` | IP version (`4` or `6`) |

### Messaging Broker

| Variable | Default | Description |
| --- | --- | --- |
| `MESSAGING_MAIN_ENABLE` | `false` | Enable the messaging subsystem |
| `MESSAGING_MAIN_DRIVER` | `amqp` | Driver: `amqp`, `redis`, `kafka`, or `mqtt` |
| `RABBITMQ_CONNECTION_STRING_MAIN` | `amqp://10.1.12.71:5672` | Full AMQP connection string (amqp driver) |
| `MESSAGING_MAIN_HOSTNAME` | `127.0.0.1` | Broker host (redis / mqtt drivers) |
| `MESSAGING_MAIN_PORT` | `5672` | Broker port |
| `MESSAGING_MAIN_USERNAME` | — | Broker username |
| `MESSAGING_MAIN_PASSWORD` | — | Broker password |
| `MESSAGING_MAIN_DB` | `0` | Redis DB index (redis driver) |
| `MESSAGING_MAIN_BROKERS` | — | Comma-separated broker addresses (kafka driver) |
| `MESSAGING_MAIN_CLIENT_ID` | `cuakx-boilerplate` | Kafka client ID |
| `MESSAGING_MAIN_PROTOCOL` | `mqtt` | MQTT protocol: `mqtt`, `mqtts`, `ws`, or `wss` |

### File Storage

| Variable | Default | Description |
| --- | --- | --- |
| `FILE_DRIVER_DEFAULT` | `local` | Driver: `local`, `s3`, or `minio` |
| `FILE_DRIVER_LOCAL_ROOT_PATH` | `storage/` | Root path for local storage |
| `FILE_DRIVER_S3_REGION` | — | AWS region |
| `FILE_DRIVER_S3_BUCKET` | — | S3 bucket name |
| `FILE_DRIVER_S3_ACCESS_KEY_ID` | — | AWS access key ID |
| `FILE_DRIVER_S3_SECRET_ACCESS_KEY` | — | AWS secret access key |
| `FILE_DRIVER_S3_ENDPOINT` | — | Custom S3-compatible endpoint |
| `FILE_DRIVER_S3_FORCE_PATH_STYLE` | `false` | Force path-style URLs |
| `FILE_DRIVER_MINIO_ENDPOINT` | `127.0.0.1` | MinIO endpoint |
| `FILE_DRIVER_MINIO_PORT` | `9000` | MinIO port |
| `FILE_DRIVER_MINIO_USE_SSL` | `false` | Enable SSL for MinIO |
| `FILE_DRIVER_MINIO_ACCESS_KEY` | — | MinIO access key |
| `FILE_DRIVER_MINIO_SECRET_KEY` | — | MinIO secret key |
| `FILE_DRIVER_MINIO_BUCKET` | — | MinIO bucket name |

---

## Data Model

The boilerplate ships with a **User Management Architecture (UMA)** schema as an example, covering mobile users, admin users, roles, CMS menus, and role-based menu access control.

### Entities

| Entity | Table | Description |
| --- | --- | --- |
| `MobileUser` | `uma_tbl_mobile_users` | End-user accounts (email, name, status, soft delete) |
| `AdminUser` | `uma_tbl_admin_users` | Back-office admin accounts (email, hashed password, soft delete) |
| `Role` | `uma_tbl_roles` | Role definitions (name) |
| `CmsMenu` | `uma_tbl_cms_menu` | Hierarchical CMS menu items (self-referencing `parent_menu_id`) |
| `LovDeviceType` | `uma_tbl_lov_device_type` | List-of-values for device types |
| `UserDevice` | `uma_tbl_user_devices` | Devices registered to a mobile user; tracks last login |
| `MapAdminRole` | `uma_tbl_map_admin_role` | Junction: AdminUser ↔ Role |
| `MapRoleMenuAccess` | `uma_tbl_map_role_menu_access` | Junction: Role ↔ CmsMenu (with access label) |

### Relationship diagram

```
AdminUser ──1:N──▶ MapAdminRole ◀──N:1─── Role ──1:N──▶ MapRoleMenuAccess ◀──N:1─── CmsMenu
                                                                                          │
                                                                                   (self-ref parent)

MobileUser ──1:N──▶ UserDevice ──N:1──▶ LovDeviceType
```

All primary keys are UUID. All entities support soft delete via `deleted_at`.

---

## API Layer

### Adding a new module

Each API module lives in `src/main/api/<module>/` and follows this structure:

```
<module>/
├── <Module>Controller.ts         # Extends BaseController; defines routes
├── <Module>ControllerHandler.ts  # Business logic methods
├── dto/
│   ├── request/                  # Request DTO interfaces
│   └── response/                 # Response DTO interfaces
├── validation/                   # express-validator rule arrays
└── exception/                    # Custom ErrorHandler subclasses
```

### Controller example

```typescript
import { BaseController, Request } from 'cuakx-express-core/api';
import { BaseResponse } from 'cuakx-express-core/facade/response.util';

export class ExampleController extends BaseController {
  routes() {
    this.get<ExampleRequestDTO>('/example', (dto) => { ... });
    this.post<ExampleRequestDTO>('/example', ExampleValidation, (dto) => { ... });
    this.post<ExampleMultipartUploadRequestDTO>(
      '/example/upload',
      ExampleMultipartUploadValidation,
      (dto) => { ... },
      this.multipartSingle('document')
    );
    return this.app;
  }
}
```

Route helpers provided by `BaseController`: `this.get()`, `this.post()`, `this.multipartSingle(field)`.

### Registering a controller

Add it to `src/main/routes/RouteManagement.ts`:

```typescript
route.use(new ExampleController().routes());
```

### Custom exceptions

```typescript
import { ErrorHandler } from 'cuakx-express-core/config';

export class ExampleAgeBelowEightTeenException extends ErrorHandler {
  code = 'EXA0001';
  message = 'Age is below 18! Please try to input age again.';
}
```

Throw the exception inside any handler; the global error middleware in `Index.ts` will catch it and serialize the response automatically.

---

## Messaging

When `MESSAGING_MAIN_ENABLE=true`, the messaging subsystem is initialized in `MessagingBootstrap.ts`.

### Adding a consumer

1. Create a class extending `BaseMessaging<DTO>` in `src/main/messaging/<module>/`:

```typescript
import { BaseMessaging } from 'cuakx-express-core/facade/messaging';

export class ExampleEventMessaging extends BaseMessaging<ExampleEventMessageDTO> {
  protected topic = process.env.EXAMPLE_EVENT_TOPIC ?? 'example-event-topic';
  protected connection = process.env.EXAMPLE_EVENT_CONNECTION ?? 'main';
  protected groupId = process.env.EXAMPLE_EVENT_GROUP_ID;
}
```

2. Register the consumer in `MessagingBootstrap.ts` at the `// cuakx:messaging:register` marker:

```typescript
async () => {
  const consumer = new ExampleEventMessaging();
  await consumer.consume(async (payload) => {
    Log.i('MESSAGING', `Received: ${payload.event}`);
  });
},
```

### Publishing a message

```typescript
import { Messaging } from 'cuakx-express-core/facade/messaging';

await Messaging.produce('example-event-topic', payload, 'main');
```

Supported drivers: `amqp` (RabbitMQ), `kafka`, `redis`, `mqtt`.

---

## Scheduled Jobs

Cron jobs are registered in `CronBootstrap.ts` and scheduled via standard cron expressions.

### Adding a cron job

1. Create a class extending `BaseCronjob` in `src/main/cronjob/`:

```typescript
import { BaseCronjob } from 'cuakx-express-core/facade/cron';
import { Log } from 'cuakx-express-core/config';

export class HeartbeatCronjob extends BaseCronjob {
  name() { return 'heartbeat-cronjob'; }
  expression() { return process.env.HEARTBEAT_CRON ?? '* * * * *'; }
  async execute() {
    Log.i('CRON', `Heartbeat executed at ${new Date().toISOString()}`);
  }
}
```

2. Register it in `CronBootstrap.ts` at the `// cuakx:cronjob:register` marker.

The built-in `HeartbeatCronjob` runs every minute by default. Override `HEARTBEAT_CRON` in `.env` to change the schedule.

---

## Security Middleware

Three security layers are applied globally before any route handler. All are configurable via `.env`.

### Rate Limiting (Throttling)

Limits the number of requests per IP per endpoint within a rolling time window.

| Variable | Default | Description |
| --- | --- | --- |
| `SECURITY_THROTTLING_ENABLE` | `true` | Enable rate limiting |
| `SECURITY_THROTTLING_WINDOW_MS` | `60000` | Time window in milliseconds |
| `SECURITY_THROTTLING_MAX_REQUESTS` | `80` | Max requests per window per IP+path |

Requests over the limit receive HTTP `429`.

### CSRF Validation

Validates a token in a custom request header on state-changing methods.

| Variable | Default | Description |
| --- | --- | --- |
| `SECURITY_CSRF_ENABLE` | `true` | Enable CSRF protection |
| `SECURITY_CSRF_HEADER` | `x-csrf-token` | Header name to check |
| `SECURITY_CSRF_METHODS` | `POST,PUT,PATCH,DELETE` | Methods that require the header |
| `SECURITY_CSRF_SECRET` | `change-me` | Secret used to validate the token |

Requests without a valid token receive HTTP `403`.

### Input Purifier

Strips HTML and SQL injection patterns from request data before handlers run.

| Variable | Default | Description |
| --- | --- | --- |
| `SECURITY_PURIFIER_ENABLE` | `true` | Enable input sanitization |
| `SECURITY_PURIFIER_BODY` | `true` | Sanitize request body |
| `SECURITY_PURIFIER_QUERY` | `true` | Sanitize query string parameters |
| `SECURITY_PURIFIER_PARAMS` | `true` | Sanitize URL route parameters |

---

## Logging & Logstash

The logging system supports three drivers, configurable at runtime.

| Variable | Default | Description |
| --- | --- | --- |
| `LOG_DRIVER` | `local` | Driver: `local`, `logstash`, or `both` |
| `LOG_DIRECTORY` | `logs/` | Directory for local log files |
| `LOGSTASH_HOST` | `127.0.0.1` | Logstash host |
| `LOGSTASH_PORT` | `5000` | Logstash port |
| `LOGSTASH_PROTOCOL` | `udp` | Transport: `udp` or `tcp` |

All log calls go through `Log.i()`, `Log.d()`, `Log.w()`, `Log.e()` from `cuakx-express-core/config`. The active driver(s) receive every line — no code changes required when switching drivers.

Local log files are written to `LOG_DIRECTORY` and named by date (`YYYY-MM-DD.log`).

---

## Notification Channels

`NotificationBootstrap.ts` initializes a `NotificationFacade` singleton. Each channel is opt-in via `.env`.

### SMTP

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_SMTP_ENABLE` | `false` | Enable SMTP |
| `NOTIFICATION_SMTP_HOST` | `127.0.0.1` | SMTP host |
| `NOTIFICATION_SMTP_PORT` | `587` | SMTP port |
| `NOTIFICATION_SMTP_SECURE` | `false` | Use TLS |
| `NOTIFICATION_SMTP_USERNAME` | — | SMTP username |
| `NOTIFICATION_SMTP_PASSWORD` | — | SMTP password |
| `NOTIFICATION_SMTP_FROM` | `no-reply@example.com` | Sender address |

### FCM (Firebase Cloud Messaging)

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_FCM_ENABLE` | `false` | Enable FCM push |
| `NOTIFICATION_FCM_ENDPOINT` | — | FCM HTTP v1 endpoint |
| `NOTIFICATION_FCM_BEARER_TOKEN` | — | OAuth2 bearer token |

### Brevo / SendinBlue

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_SENDINBLUE_ENABLE` | `false` | Enable Brevo email |
| `NOTIFICATION_SENDINBLUE_API_KEY` | — | Brevo API key |
| `NOTIFICATION_SENDINBLUE_FROM_EMAIL` | `no-reply@example.com` | Sender address |
| `NOTIFICATION_SENDINBLUE_FROM_NAME` | `Cuakx App` | Sender name |

### SMS

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_SMS_ENABLE` | `false` | Enable SMS |
| `NOTIFICATION_SMS_ENDPOINT` | — | Provider endpoint |
| `NOTIFICATION_SMS_API_KEY` | — | Provider API key |

### WhatsApp

| Variable | Default | Description |
| --- | --- | --- |
| `NOTIFICATION_WHATSAPP_ENABLE` | `false` | Enable WhatsApp |
| `NOTIFICATION_WHATSAPP_ENDPOINT` | — | Provider endpoint |
| `NOTIFICATION_WHATSAPP_API_KEY` | — | Provider API key |

---

## Swagger API Docs

Swagger is only available when `APP_ENV` is **not** `production`.

| Variable | Default | Description |
| --- | --- | --- |
| `SWAGGER_ENABLE` | `false` | Enable Swagger UI |

Access the UI at:

```
http://<SERVER_HOSTNAME>:<SERVER_PORT>/api/swagger
```

**Adding documentation:**

- Add OpenAPI 3 YAML to `src/resources/swagger/*.yaml`
- Or add JSDoc `@swagger` blocks in controller files under `src/main/api/`

Both sources are merged automatically by `SwaggerBootstrap.ts` at startup.

---

## Database Migrations & Seeds

This boilerplate uses Sequelize CLI. Config is at `src/resources/sequelize-cli/SequelizeCliConfig.js`.

### Provided migrations (in order)

| Migration | Table Created |
| --- | --- |
| `20260307100001` | `uma_tbl_mobile_users` |
| `20260307100002` | `uma_tbl_lov_device_type` |
| `20260307100003` | `uma_tbl_admin_users` |
| `20260307100004` | `uma_tbl_roles` |
| `20260307100005` | `uma_tbl_cms_menu` |
| `20260307100006` | `uma_tbl_user_devices` |
| `20260307100007` | `uma_tbl_map_admin_role` |
| `20260307100008` | `uma_tbl_map_role_menu_access` |

### Provided seeders (in order)

| Seeder | Seeds |
| --- | --- |
| `20260307100101` | `uma_tbl_lov_device_type` |
| `20260307100102` | `uma_tbl_mobile_users` (10 sample users) |
| `20260307100103` | `uma_tbl_admin_users` |
| `20260307100104` | `uma_tbl_roles` |
| `20260307100105` | `uma_tbl_cms_menu` |
| `20260307100106` | `uma_tbl_user_devices` |
| `20260307100107` | `uma_tbl_map_admin_role` |
| `20260307100108` | `uma_tbl_map_role_menu_access` |

### Common commands

```bash
npm run migrate                  # apply all pending migrations
npm run seed                     # insert all seed data
npm run migrate:refresh:seed     # fresh database with seed data
npm run migrate:rollback         # undo last migration
```

---

## Cuakx CLI Generator

The `cuakx` script scaffolds code and auto-wires it into the relevant bootstrap or route file.

```bash
# Linux / macOS
./cuakx make <type> <Name>

# Windows (PowerShell)
.\cuakx.ps1 make <type> <Name>

# Windows (Command Prompt)
cuakx.cmd make <type> <Name>
```

Both `create` and `make` are accepted as the command verb.

### Commands

| Command | Example | Description |
| --- | --- | --- |
| `make module` | `./cuakx make module PaymentGateway` | Scaffold a full API module (controller, handler, DTO, validation, exception) |
| `make cronjob` | `./cuakx make cronjob PaymentRetry` | Generate a cron job and register it in `CronBootstrap.ts` |
| `make messaging` | `./cuakx make messaging UserOnboarded` | Generate a message consumer and register it in `MessagingBootstrap.ts` |
| `make cache` | `./cuakx make cache SessionToken` | Generate a Redis cache repository |
| `make repository` | `./cuakx make repository OrderReport` | Generate a database repository |

**Naming rules:**
- Names must be in **PascalCase**: `PaymentGateway`, `UserOnboarded`
- Folder names are generated in dot-case: `payment.gateway/`, `user.onboarded/`
- `make cronjob` and `make messaging` update `CronBootstrap.ts` and `MessagingBootstrap.ts` in-place at their `// cuakx:*:register` markers — no manual wiring needed

---

## Testing

Tests live in `src/test/` and are run via Jest with `ts-jest`.

```bash
npm test
```

### Example test pattern

```typescript
// Positive case
test('returns true for age 19', () => {
  expect(new ExampleControllerHandler().ageValidation(19)).toBe(true);
});

// Negative case — validates thrown exception message
test('throws for age under 18', () => {
  expect(() => new ExampleControllerHandler().ageValidation(13))
    .toThrow(new ExampleAgeBelowEightTeenException().message);
});
```

---

## Built-in Endpoints

These endpoints are registered automatically by `cuakx-express-core`.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api` | Returns `{ app, app_time_zone, time }` |
| `POST` | `/api/heartbeat` | Liveness check — returns `{ status: "alive", timestamp }` |

---

## Docker

A `dockerfile` is included in the repository root. Build and run:

```bash
docker build -t cuakx-express .
docker run -p 57898:57898 --env-file .env cuakx-express
```

---

## Credits

Built by [Yosua Kristianto](https://github.com/yosua-kristianto).

ISC © 2025
