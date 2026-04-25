import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default {
  "definition": {
    "openapi": "3.0.0",
    "info": {
      "title": `${process.env.APP_NAME}`,
      "description": "Just another Swagger UI project",
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      },
      "version": "2.0"
    },
    "servers": [{ "url": `http://${process.env.SERVER_URI}:${process.env.SERVER_PORT}` }],
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"]
  },
  "apis": [
    path.resolve('src/main/api/**/*.ts'),
    path.resolve('src/main/routes/**/*.ts'),
    path.resolve('src/resources/swagger/**/*.yaml')
  ],
}