import ListService from '../../../../services/device/list.service';
import CreateService from '../../../../services/device/create.service';
import ShowService from '../../../../services/device/show.service';

const index = async (ctx, next) => {
  const attrs = { db: ctx.db, page: ctx.request.query.page };
  const { body, status } = await ListService.call(attrs);

  ctx.body = body;
  ctx.status = status;

  await next;
};

const show = async (ctx, next) => {
  const attrs = { db: ctx.db, id: ctx.params.id }
  const { body, status } = await ShowService.call(attrs);

  ctx.body = body;
  ctx.status = status;

  await next;
};

const create = async (ctx, next) => {
  const attrs = { db: ctx.db, attrs: ctx.request.body.device };
  const { body, status } = await CreateService.call(attrs);

  ctx.body = body;
  ctx.status = status;

  await next;
};

export { index, show, create };
