import * as Koa from 'koa';

import { UserFindByAuthorizationCase } from '../../usecases/user/find.by.authorization.header.case';

export const authRouterHelper = async (ctx: Koa.Context, next: Function) => {
  const authorizationHeader = ctx.request.headers.authorization;

  const useCase = await callService(authorizationHeader);

  if (useCase) {
    ctx.currentSession = useCase.session;
    ctx.currentUser = await ctx.currentSession.getUser();

    await next();
  } else {
    ctx.status = 403;
  }
};

// private

async function callService(authorizationHeader: string) {
  try {
    const useCase = await UserFindByAuthorizationCase.call({
      authorizationHeader,
    });

    return useCase;
  } catch (err) {
    // Always welcome to set debug logger if you would like to track the useCase.
  }
}
