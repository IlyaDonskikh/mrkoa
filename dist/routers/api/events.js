"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const events = require("../../controllers/events");
const router = new Router();
// Devices
router.get('/events', events.index);
// Export
exports.default = router.routes();
