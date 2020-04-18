"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-logger");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const api_1 = require("./routers/api");
const app = new Koa();
// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());
// Routes
app.use(api_1.default.routes()).use(api_1.default.allowedMethods());
// Listen
app.listen(3000);
