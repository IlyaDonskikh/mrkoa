import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import apiRouter from './routers/api';

const app = new Koa();

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

// Listen
app.listen(3000);
