import { AuthenticatedContext } from '../../../../types/koa';
import { AuthSessionDestroyCase } from '../../../../usecases/auth/session/destroy.case';

const destroy = async (ctx: AuthenticatedContext) => {
  await AuthSessionDestroyCase.call({
    uuid: ctx.currentSession.uuid,
  });

  ctx.body = {};
};

export { destroy };
