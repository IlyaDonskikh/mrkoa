import type { AuthenticatedContext } from '../../types/koa';

export const validateCurrentUserRouterHelper = async (
  ctx: AuthenticatedContext,
  next: () => Promise<any>,
) => {
  if (!ctx.currentUser || !ctx.currentSession) {
    ctx.status = 403;
    return;
  }

  await next();
};
