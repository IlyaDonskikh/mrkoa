"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const devices = require("../../controllers/devices");
const router = new Router();
// Devices
router.get('/', devices.index);
// Export
exports.default = router.routes();
