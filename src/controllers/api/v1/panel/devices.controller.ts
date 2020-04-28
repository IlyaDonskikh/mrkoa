import ListService from '../../../../services/device/list.service';
import CreateService from '../../../../services/device/create.service';
import ShowService from '../../../../services/device/show.service';

const index = async (ctx, next) => {
  const attrs = { page: ctx.request.query.page };
  const { body } = await ListService.call(attrs);

  ctx.body = body;
  ctx.status = 200;

  await next;
};

const show = async (ctx, next) => {
  const attrs = { id: ctx.params.id };
  const { body, notFound } = await ShowService.call(attrs);

  if (!notFound) {
    ctx.body = body;
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }

  await next;
};

const create = async (ctx, next) => {
  const attrs = { attrs: ctx.request.body.device };
  const service = await CreateService.call(attrs);

  if (service.isSuccess()) {
    ctx.body = service.body;
    ctx.status = 200;
  } else {
    ctx.body = { errors: service.errors.messages() };
    ctx.status = 422;
  }

  await next;
};

export { index, show, create };
