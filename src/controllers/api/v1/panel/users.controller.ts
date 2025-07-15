import { components, operations } from '../../../../types/api';
import { AuthenticatedContext } from '../../../../types/koa';
import { PanelUserCreateCase } from '../../../../usecases/panel/user/create.case';
import { PanelUserListCase } from '../../../../usecases/panel/user/list.case';
import { buildPagination } from '../../../../utils/pagination';
import { validate } from '../../../../utils/request.validator';
import { schemas } from '../../../../utils/schemas';

const index = async (ctx: AuthenticatedContext) => {
  const attrs = validate<operations['getPanelUsers']['parameters']['query']>({
    schema: schemas.query.getPanelUsers,
    data: ctx.request.query,
  });

  const pagination = buildPagination({
    page: attrs?.page,
    perPage: attrs?.perPage,
  });

  const {
    body: { items, itemsTotalCount },
  } = await PanelUserListCase.call({
    ...attrs,
    ...pagination,
  });

  ctx.body = { items, itemsTotalCount, ...pagination };
};

const create = async (ctx: AuthenticatedContext) => {
  const attrs = validate<components['schemas']['MrPanelUserCreateRequest']>({
    schema: schemas.component.MrPanelUserCreateRequest,
    data: ctx.request.body,
  });

  const { item } = await PanelUserCreateCase.call(attrs);

  ctx.body = { item };
};

export { index, create };
