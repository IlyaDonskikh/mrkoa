import * as Koa from 'koa';

import UserDefaultSerializer from '../../../../serializers/user/default.serializer';
import PanelPrimeUserCreateService from '../../../../services/panel/user/create.service';
import PanelUserListService from '../../../../services/panel/user/list.service';
import { validate } from '../../../../utils/requestValidator';
import { schemas } from '../../../../utils/schemas';

const index = async (ctx: any) => {
  const attrs = validate<Api.MrPanelUserIndexRequest>({
    schema: schemas.MrPanelUserIndexRequest,
    data: ctx.request.query,
    localePath: __filename + '.index',
  });

  const { body } = await PanelUserListService.call(attrs);

  ctx.body = body;
};

const create = async (ctx: Koa.Context) => {
  const attrs = validate<Api.MrPanelUserCreateRequest>({
    schema: schemas.MrPanelUserCreateRequest,
    data: ctx.request.body,
    localePath: __filename + '.create',
  });

  const service = await PanelPrimeUserCreateService.call(attrs);

  if (service.isSuccess()) {
    ctx.body = {
      user: await UserDefaultSerializer.serialize(service.user),
    };
  } else {
    ctx.body = { errors: service.errors.messages() };
    ctx.status = 422;
  }
};

export { index, create };
