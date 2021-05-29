import * as Koa from 'koa';

import { SessionDefaultSerializer } from '../../../../serializers/session/default.serializer';
import { AuthSessionCreateCase } from '../../../../usecases/auth/session/create.case';
import { AuthSessionDestroyCase } from '../../../../usecases/auth/session/destroy.case';
import { schemas } from '../../../../utils/schemas';
import { validate } from '../../../../utils/request.validator';

const create = async (ctx: Koa.Context) => {
  const attrs = validate<Api.MrAuthSessionCreateRequest>({
    schema: schemas.MrAuthSessionCreateRequest,
    data: ctx.request.body,
  });

  const { session } = await AuthSessionCreateCase.call(attrs);

  ctx.body = {
    item: await SessionDefaultSerializer.serialize(session),
  };
};

const destroy = async (ctx: Koa.Context) => {
  await AuthSessionDestroyCase.call({
    id: ctx.currentSession.id,
  });

  ctx.status = 200;

  ctx.body = {};
};

export { create, destroy };
