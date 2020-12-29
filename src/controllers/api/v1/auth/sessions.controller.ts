import * as Koa from 'koa';

import SessionDefaultSerializer from '../../../../serializers/session/default.serializer';
import SignInService from '../../../../services/user/sign.in.service';
import SignOutService from '../../../../services/user/sign.out.service';
import { schemas } from '../../../../utils/schemas';
import { validate } from '../../../../utils/requestValidator';

const create = async (ctx: Koa.Context) => {
  const attrs = validate<Api.MrAuthSessionCreateRequest>({
    schema: schemas.MrAuthSessionCreateRequest,
    data: ctx.request.body,
    localePath: __filename + '.create',
  });

  const service = await SignInService.call(attrs);

  ctx.body = {
    session: await SessionDefaultSerializer.serialize(service.session),
  };
};

const destroy = async (ctx: Koa.Context) => {
  await SignOutService.call({
    id: ctx.currentSession.id,
  });

  ctx.status = 200;
};

export { create, destroy };
