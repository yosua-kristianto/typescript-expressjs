# 🦆 Cuakx Express — Express.js TypeScript Boilerplate

```
   ________  _____    __ ___  __                 
  / ____/ / / /   |  / //_/ |/ /                 
 / /   / / / / /| | / ,<  |   /                  
/ /___/ /_/ / ___ |/ /| |/   |                   
\____/\____/_/__|_/_/_|_/_/|_|_  ________________
        / ____/ |/ // __ \/ __ \/ ____/ ___/ ___/
       / __/  |   // /_/ / /_/ / __/  \__ \\__ \ 
      / /___ /   |/ ____/ _, _/ /___ ___/ /__/ / 
     /_____//_/|_/_/   /_/ |_/_____//____/____/  
```                                              


> “For 4 years I couldn’t name it… but now, meet **Cuakx**.”  
> A modern, scalable, opinionated backend starter built with **Express.js + TypeScript**.

---

## 📦 Overview

**Cuakx Express** is a highly structured and extensible backend boilerplate for modern backend services.  
Designed for **modular architecture**, this project is ready for microservices, monoliths, or anything in between.

It includes native integrations with:

- 🟥 **Redis** (via `redis-io`)
- 🍃 **MongoDB** (via `Mongoose`)
- 🗃️ **SQL Databases** (MySQL, PostgreSQL, MSSQL via Sequelize or Knex)
- 🐇 **RabbitMQ** (via `amqplib`)
- 🧪 **Testing** (via `Jest`)
- 🐳 **Docker** support
- ✅ **ESLint**, **Prettier**, and **Husky Git Hooks**

---

## 📁 Project Structure

.
├── main/ # Source code
│ ├── main.api/ # Business logic (Modular structure: each has controller + handler)
│ ├── main.common/ # Reusable modules
│ │ ├── exception/ # Custom exceptions
│ │ ├── facade/ # Facade helpers for integration logic
│ │ ├── middleware/ # Express middleware
│ │ └── validation/ # Express validation logic
│ ├── main.config/ # Configurations for Redis, DB, Mongo, RabbitMQ, Logging
│ ├── main.messaging/ # RabbitMQ publisher & consumer
│ ├── main.model/ # Shared entity models for Redis, MongoDB, SQL
│ ├── main.repository/ # Data access layer
│ └── main.routes/ # Route registration
├── resources/ # Swagger docs & Sequelize migrations
├── test/ # Unit & contract tests (Jest)
├── .eslintrc.js # ESLint config
├── .prettierrc # Prettier config
├── .husky/ # Git hook setup
├── docker-compose.yml # Dev container orchestration
└── Dockerfile # Runtime container definition



---

## ⚙️ Features

### ✅ Built-In Technologies

- **Express.js** with modular route/controller handler pattern
- **TypeScript** for type safety
- **MongoDB + Mongoose** setup
- **SQL DBs via Sequelize or Knex** (supports MySQL, PostgreSQL, MSSQL)
- **Redis** integration via `redis`
- **RabbitMQ** via `amqplib` with ready-to-use publisher/consumer layers
- **Swagger** (OpenAPI 3) support for API documentation
- **Centralized error handling** and standardized exceptions
- **Jest** unit testing setup
- **ESLint + Prettier** formatting rules
- **Husky** pre-commit Git hooks for code linting
- **Docker** ready for production and local dev
- **Dynamic config loading** with `.env` support

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Docker (for RabbitMQ, Redis, DB, etc.)
- npm

### 1. Clone and install dependencies
```bash
git clone https://github.com/your-user/cuakx.git
cd cuakx
npm install
```

### 2. Setup .env file
```bash
cp .env.example .env
```

### NPM Scripts Overview

| Script                      | Description                                                           |
| --------------------------- | --------------------------------------------------------------------- |
| `dev`                       | Start the development server with hot reload using `nodemon`.         |
| `start`                     | Start the production-ready server using compiled JavaScript.          |
| `build`                     | Compile TypeScript code using `tsconfig.build.json`.                  |
| `test`                      | Run all tests using `Jest`.                                           |
| `db:init`                   | Create the database using Sequelize CLI.                              |
| `migrate`                   | Run all pending database migrations.                                  |
| `migrate:rollback`          | Undo the last executed migration.                                     |
| `migrate:rollback:all`      | Undo all executed migrations (reset schema).                          |
| `migrate:refresh`           | Drop the DB, re-create it, and apply all migrations.                  |
| `seed`                      | Run all seed files using custom `seed:all` script.                    |
| `seed:refresh`              | Reset DB and seed fresh data (`migrate:refresh` + `seed`).            |
| `deploy:production`         | Run migrations, build the app, then start it for production.          |
| `deploy:production:dummies` | Refresh DB, seed with dummy data, build, and start production server. |
| `lint`                      | Run ESLint on source files in `src/main`.                             |
| `prepare`                   | Install Husky Git hooks (used automatically during `npm install`).    |


🙏 Credits
Built with ❤️ by McCarsaree
Inspired by 4 years of "almost building things but never shipping it." 🫠

🦆 Why "Cuakx"?
Because ducks don’t rewrite their backend boilerplates every month.
They just swim straight to the point. 🦆

MIT © 2025 McCarsaree