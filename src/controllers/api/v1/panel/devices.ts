import ListService from '../../../../services/devices/list_service';
import CreateService from '../../../../services/devices/create_service';
import ShowService from '../../../../services/devices/show_service';

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
  const service = new ShowService(
    ctx.db, ctx.params.id
  );
  const { body, status } = await service.call();

  ctx.body = body;
  ctx.status = status;

  await next;
};

const create = async (ctx, next) => {
  const service = new CreateService(
    ctx.db, ctx.request.body,
  );
  const { body, status } = await service.call();

  ctx.body = body;
  ctx.status = status;

  await next;
};

export { index, show, create };
