import * as Router from 'koa-router';
import v1Routes from './v1/index';

const router = new Router();


router.get('/', async (ctx, next) => {
  ctx.body = { version: 'v1', status: 'current version' };

  await next();
});

// Api V1
router.use('/v1', v1Routes);

// Export
export default router.routes();
