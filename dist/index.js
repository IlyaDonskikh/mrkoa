"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-logger");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const index_1 = require("./routers/index");
const app = new Koa();
// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());
// Routes
app.use(index_1.default.routes()).use(index_1.default.allowedMethods());
// Listen
app.listen(3000);
