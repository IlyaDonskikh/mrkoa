import * as Router from 'koa-router';
import devicesRoutes from './api/v1/panel/devices';
import eventsRoutes from './api/v1/panel/events';


const apiRouter = new Router({
  prefix: '/api/v1',
});

apiRouter.get('/', async (ctx, next) => {
  ctx.body = { version: 'v1', status: 'current version' };

  await next();
});

// Devices
apiRouter.use('/panel/devices', devicesRoutes);

// Events
apiRouter.use('/panel/events', eventsRoutes);

// Export
export default apiRouter;
