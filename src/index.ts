import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import { createModels } from './models';
import router from './routers/index';

const app = new Koa();
const db = createModels();

//console.log(db)
db.Device.findAll()
  .then(devices => console.log(devices))

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

// Listen
app.listen(3000);
