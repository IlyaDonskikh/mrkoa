import * as Koa from 'koa';

import { UserDefaultSerializer } from '../../../../serializers/user/default.serializer';
import { PanelUserCreateService } from '../../../../services/panel/user/create.service';
import { PanelUserListService } from '../../../../services/panel/user/list.service';

import { validate } from '../../../../utils/request.validator';
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

  const service = await PanelUserCreateService.call(attrs);

  ctx.body = {
    user: await UserDefaultSerializer.serialize(service.user),
  };
};

export { index, create };
