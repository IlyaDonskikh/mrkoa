import * as Koa from 'koa';

import { SessionDefaultSerializer } from '../../../../serializers/session/default.serializer';
import { UserSignInService } from '../../../../services/user/sign.in.service';
import { UserSignOutService } from '../../../../services/user/sign.out.service';
import { schemas } from '../../../../utils/schemas';
import { validate } from '../../../../utils/request.validator';

const create = async (ctx: Koa.Context) => {
  const attrs = validate<Api.MrAuthSessionCreateRequest>({
    schema: schemas.MrAuthSessionCreateRequest,
    data: ctx.request.body,
    localePath: __filename + '.create',
  });

  const service = await UserSignInService.call(attrs);

  ctx.body = {
    session: await SessionDefaultSerializer.serialize(service.session),
  };
};

const destroy = async (ctx: Koa.Context) => {
  await UserSignOutService.call({
    id: ctx.currentSession.id,
  });

  ctx.status = 200;

  ctx.body = {};
};

export { create, destroy };
