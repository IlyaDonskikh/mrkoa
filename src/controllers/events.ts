export const index = async (ctx, next) => {
  ctx.body = { events: [], time: Date.now() };

  await next;
};
