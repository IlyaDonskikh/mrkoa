import * as Koa from 'koa';

import UserFindByAuthorizationService from '../../services/user/find.by.authorization.header.service';

const authRouterHelper = async (ctx: Koa.Context, next: Function) => {
  const authorizationHeader = ctx.request.headers.authorization;
  const service = await UserFindByAuthorizationService.call({
    authorizationHeader,
  });

  ctx.currentSession = service.session;
  ctx.currentUser = await ctx.currentSession.getUser();

  await next();
};

export default authRouterHelper;
