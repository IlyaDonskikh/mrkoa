require('dotenv').config()

// process.env.NODE_ENV = 'development'

import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import createModels from './models';
import router from './routers/index';

const app = new Koa();
const db = createModels();

// Context
app.context.db = db;

// console.log('hello');

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

// Listen
if (process.argv[2] && process.argv[2][0] != 't') {
  app.listen(3000);
}

module.exports = app;
