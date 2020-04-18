"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const devices_1 = require("./api/devices");
const events_1 = require("./api/events");
const apiRouter = new Router({
    prefix: '/api/v1',
});
apiRouter.get('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = { version: 'v1', status: 'current version' };
    yield next();
}));
// Devices
apiRouter.use('/devices', devices_1.default);
// Events
apiRouter.use('/events', events_1.default);
// Export
exports.default = apiRouter;
