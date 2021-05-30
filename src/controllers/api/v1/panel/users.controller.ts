import * as Koa from 'koa';

import { UserDefaultSerializer } from '../../../../serializers/user/default.serializer';
import { PanelUserCreateCase } from '../../../../usecases/panel/user/create.case';
import { PanelUserListCase } from '../../../../usecases/panel/user/list.case';
import { buildPagination } from '../../../../utils/pagination';
import { validate } from '../../../../utils/request.validator';
import { schemas } from '../../../../utils/schemas';

const index = async (ctx: Koa.Context) => {
  const attrs = validate<Api.MrPanelUserIndexQuery>({
    schema: schemas.MrPanelUserIndexQuery,
    data: ctx.request.query,
  });

  const { page, perPage } = attrs;
  const pagination = buildPagination({ page, perPage });

  const { body } = await PanelUserListCase.call({
    ...attrs,
    ...buildPagination({ page, perPage }),
  });

  ctx.body = { ...body, ...pagination };
};

const create = async (ctx: Koa.Context) => {
  const attrs = validate<Api.MrPanelUserCreateRequest>({
    schema: schemas.MrPanelUserCreateRequest,
    data: ctx.request.body,
  });

  const { user } = await PanelUserCreateCase.call(attrs);

  ctx.body = {
    item: await UserDefaultSerializer.serialize(user),
  };
};

export { index, create };
