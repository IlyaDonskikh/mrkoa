import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import createModels from './models';
import router from './routers/index';
import ErrorsService from './services/errors.service';

require('dotenv').config();

// ToDo handle queries by QS.

const app = new Koa();
const db = createModels();

// Context
app.context.db = db;

// Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

app.use(json());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

// Listen
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT);
}

export = app;
