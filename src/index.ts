import cors from '@koa/cors';
import koaQs from 'koa-qs';
import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

import { sequelize } from './models';
import { router } from './routers/index';

require('dotenv').config();

const app = new Koa();

// Context
app.context.sequelize = sequelize;

// Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

app.use(cors());
app.use(json());
app.use(bodyParser());
koaQs(app);

// Routes
app.use(router.routes()).use(router.allowedMethods());

// Listen
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT);
}

// Exports
export { app };
