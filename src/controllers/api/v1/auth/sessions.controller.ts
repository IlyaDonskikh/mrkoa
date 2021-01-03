import * as Koa from 'koa';

import { SessionDefaultSerializer } from '../../../../serializers/session/default.serializer';
import { UserSignInCase } from '../../../../usecases/user/sign.in.case';
import { UserSignOutCase } from '../../../../usecases/user/sign.out.case';
import { schemas } from '../../../../utils/schemas';
import { validate } from '../../../../utils/request.validator';

const create = async (ctx: Koa.Context) => {
  const attrs = validate<Api.MrAuthSessionCreateRequest>({
    schema: schemas.MrAuthSessionCreateRequest,
    data: ctx.request.body,
    localePath: __filename + '.create',
  });

  const useCase = await UserSignInCase.call(attrs);

  ctx.body = {
    session: await SessionDefaultSerializer.serialize(useCase.session),
  };
};

const destroy = async (ctx: Koa.Context) => {
  await UserSignOutCase.call({
    id: ctx.currentSession.id,
  });

  ctx.status = 200;

  ctx.body = {};
};

export { create, destroy };
