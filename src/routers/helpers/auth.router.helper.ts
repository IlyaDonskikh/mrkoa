import * as Koa from 'koa';

import UserFindByAuthorizationService from '../../services/user/find.by.authorization.header.service';

export const authRouterHelper = async (ctx: Koa.Context, next: Function) => {
  const authorizationHeader = ctx.request.headers.authorization;

  const service = await callService(authorizationHeader);

  if (service) {
    ctx.currentSession = service.session;
    ctx.currentUser = await ctx.currentSession.getUser();

    await next();
  } else {
    ctx.status = 403;
  }
};

// private

async function callService(authorizationHeader: string) {
  try {
    const service = await UserFindByAuthorizationService.call({
      authorizationHeader,
    });

    return service;
  } catch (err) {
    // Always welcome to set debug logger if you would like to track the case.
  }
}
