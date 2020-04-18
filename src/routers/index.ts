import * as Router from 'koa-router';

const apiRouter = new Router({
  prefix: '/api',
});

apiRouter.get('/', async (ctx, next) => {
  ctx.body = { msg: 'Hello world1!' };

  await next();
});

export default apiRouter;
