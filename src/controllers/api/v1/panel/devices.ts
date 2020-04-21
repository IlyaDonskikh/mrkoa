import ListService from '../../../../services/devices/list_service';
import CreateService from '../../../../services/devices/create_service';

const index = async (ctx, next) => {
  const service = new ListService(
    ctx.db, ctx.request.query.page,
  );
  const { body, status } = await service.call();

  ctx.body = body;
  ctx.status = status;

  await next;
};

const show = async (ctx, next) => {
  ctx.body = { test: 'test' };

  await next;
};

const create = async (ctx, next) => {
  console.log(ctx.request.body)

  const service = new CreateService(
    ctx.db, ctx.request.body,
  );
  const { body, status } = await service.call();

  ctx.body = body;
  ctx.status = status;

  await next;
};

export { index, show, create };