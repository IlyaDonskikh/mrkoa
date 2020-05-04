const index = async (ctx, next) => {
  ctx.body = { events: [], time: Date.now() };

  await next;
};

const show = async (ctx, next) => {
  ctx.body = { events: [], time: Date.now() };

  await next;
};

export { index, show };
