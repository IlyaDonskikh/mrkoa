import * as Koa from 'koa';

import { SessionDefaultSerializer } from '../../../../serializers/session/default.serializer';
import { components } from '../../../../types/api';
import { AuthSessionCreateCase } from '../../../../usecases/auth/session/create.case';
import { validate } from '../../../../utils/request.validator';
import { schemas } from '../../../../utils/schemas';

const create = async (ctx: Koa.Context) => {
  const attrs = validate<components['schemas']['MrAuthSessionCreateRequest']>({
    schema: schemas.component.MrAuthSessionCreateRequest,
    data: ctx.request.body,
  });

  const { session } = await AuthSessionCreateCase.call(attrs);

  ctx.body = {
    item: await SessionDefaultSerializer.serialize(session),
  };
};

export { create };
