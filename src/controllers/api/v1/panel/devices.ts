import ListService from '../../../../services/devices/listService';

const index = async (ctx, next) => {
  const service = new ListService(
    ctx.request.query.page,
  );
  const data = await service.call();

  ctx.body = data.body;
  ctx.status = data.status;

  await next;
};

const show = async (ctx, next) => {
  ctx.body = { test: 'test' };

  await next;
};


export { index, show };
