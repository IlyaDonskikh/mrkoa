import * as Koa from 'koa';

import { AuthSessionDestroyCase } from '../../../../usecases/auth/session/destroy.case';

const destroy = async (ctx: Koa.Context) => {
  await AuthSessionDestroyCase.call({
    uuid: ctx.currentSession.uuid,
  });

  ctx.body = {};
};

export { destroy };
