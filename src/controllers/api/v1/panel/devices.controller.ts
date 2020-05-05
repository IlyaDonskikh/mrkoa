import ListService from '../../../../services/device/list.service';
import CreateService from '../../../../services/device/create.service';
import UpdateService from '../../../../services/device/update.service';
import ShowService from '../../../../services/device/show.service';

const index = async (ctx) => {
  const attrs = { page: ctx.request.query.page, filters: ctx.request.query.filters };
  const { body } = await ListService.call(attrs);

  ctx.body = body;
};

const show = async (ctx) => {
  const attrs = { id: ctx.params.id };
  const { body, notFound } = await ShowService.call(attrs);

  if (!notFound) {
    ctx.body = body;
  } else {
    ctx.status = 404;
  }
};

const create = async (ctx) => {
  const attrs = { attrs: ctx.request.body.device };
  const service = await CreateService.call(attrs);

  if (service.isSuccess()) {
    ctx.body = { device: service.device };
  } else {
    ctx.body = { errors: service.errors.messages() };
    ctx.status = 422;
  }
};

const update = async (ctx) => {
  const attrs = { id: ctx.params.id, attrs: ctx.request.body.device };
  const service = await UpdateService.call(attrs);

  if (service.isSuccess()) {
    ctx.body = { device: service.device };
  } else {
    ctx.body = { errors: service.errors.messages() };
    ctx.status = 422;
  }
};

export {
  index, show, create, update,
};
