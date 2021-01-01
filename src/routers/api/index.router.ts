import * as Router from 'koa-router';
import { v1Routes } from './v1/index.router';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { version: 'v1', status: 'current version' };
});

// Api V1
router.use('/v1', v1Routes);

// Export
export const apiRoutes = router.routes();
