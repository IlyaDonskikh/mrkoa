import * as Router from 'koa-router';
import devicesRoutes from './api/devices';
import eventsRoutes from './api/events';


const apiRouter = new Router({
  prefix: '/api/v1',
});

apiRouter.get('/', async (ctx, next) => {
  ctx.body = { version: 'v1', status: 'current version' };

  await next();
});

// Devices
apiRouter.use('/devices', devicesRoutes)

// Events
apiRouter.use('/events', eventsRoutes)

// Export
export default apiRouter;
