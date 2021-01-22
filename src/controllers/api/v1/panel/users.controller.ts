import * as Koa from 'koa';

import { UserDefaultSerializer } from '../../../../serializers/user/default.serializer';
import { PanelUserCreateCase } from '../../../../usecases/panel/user/create.case';
import { PanelUserListCase } from '../../../../usecases/panel/user/list.case';

import { validate } from '../../../../utils/request.validator';
import { schemas } from '../../../../utils/schemas';

const index = async (ctx: any) => {
  const attrs = validate<Api.MrPanelUserIndexRequest>({
    schema: schemas.MrPanelUserIndexRequest,
    data: ctx.request.query,
  });

  const { body } = await PanelUserListCase.call(attrs);

  ctx.body = body;
};

const create = async (ctx: Koa.Context) => {
  const attrs = validate<Api.MrPanelUserCreateRequest>({
    schema: schemas.MrPanelUserCreateRequest,
    data: ctx.request.body,
  });

  const { user } = await PanelUserCreateCase.call(attrs);

  ctx.body = {
    user: await UserDefaultSerializer.serialize(user),
  };
};

export { index, create };
