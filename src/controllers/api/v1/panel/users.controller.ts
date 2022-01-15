import * as Koa from 'koa';

import { UserDefaultSerializer } from '../../../../serializers/user/default.serializer';
import { components, operations } from '../../../../types/Api/openapi';
import { PanelUserCreateCase } from '../../../../usecases/panel/user/create.case';
import { PanelUserListCase } from '../../../../usecases/panel/user/list.case';
import { buildPagination } from '../../../../utils/pagination';
import { validate } from '../../../../utils/request.validator';
import { schemas } from '../../../../utils/schemas';

const index = async (ctx: Koa.Context) => {
  const attrs = validate<operations['getPanelUsers']['parameters']['query']>({
    schema: schemas.query.getPanelUsers,
    data: ctx.request.query,
  });

  const { page, perPage } = attrs;
  const pagination = buildPagination({ page, perPage });

  const {
    body: { items, itemsTotalCount },
  } = await PanelUserListCase.call({
    ...attrs,
    ...buildPagination({ page, perPage }),
  });

  ctx.body = { items, itemsTotalCount, ...pagination };
};

const create = async (ctx: Koa.Context) => {
  const attrs = validate<components['schemas']['MrPanelUserCreateRequest']>({
    schema: schemas.component.MrPanelUserCreateRequest,
    data: ctx.request.body,
  });

  const { user } = await PanelUserCreateCase.call(attrs);

  ctx.body = {
    item: await UserDefaultSerializer.serialize(user),
  };
};

export { index, create };
