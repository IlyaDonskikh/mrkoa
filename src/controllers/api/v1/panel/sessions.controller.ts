import * as Koa from 'koa';

import { AuthSessionDestroyCase } from '../../../../usecases/auth/session/destroy.case';

const destroy = async (ctx: Koa.Context) => {
  await AuthSessionDestroyCase.call({
    id: ctx.currentSession.id,
  });

  ctx.body = {};
};

export { destroy };
