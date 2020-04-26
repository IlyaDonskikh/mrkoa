import ListService from '../../../../services/device/list.service';
import CreateService from '../../../../services/device/create.service';
import ShowService from '../../../../services/device/show.service';

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
    ctx.db, ctx.params.id,
  );
  const { body, status } = await service.call();

  ctx.body = body;
  ctx.status = status;

  await next;
};

const create = async (ctx, next) => {
  const service = new CreateService(
    ctx.db, ctx.request.body.device,
  );
  const { body, status } = await service.call();

  ctx.body = body;
  ctx.status = status;

  await next;
};

export { index, show, create };
