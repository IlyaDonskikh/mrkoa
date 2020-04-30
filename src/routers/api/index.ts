import * as Router from 'koa-router';
import v1Routes from './v1/index';
import UserFindByAuthorizationService from '../../services/user/find.by.authorization.header.service';

const router = new Router();

async function hello(ctx, next) {
  const authorizationHeader = ctx.request.headers.authorization
  const service = await UserFindByAuthorizationService.call({
    authorizationHeader: authorizationHeader
  });

  if (service.isSuccess()) {
    // ctx.currentUser = 'hello'

    await next();
  } else {
    return ctx.status = 422
  }
}

router.use('/', hello)

router.get('/', async (ctx, next) => {
  ctx.body = { version: 'v1', status: 'current version' };

  await next();
});

// Api V1
router.use('/v1', v1Routes);

// Export
export default router.routes();
