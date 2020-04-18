export const index = async (ctx, next) => {
  ctx.body = { devices: [], time: Date.now() };

  await next;
};
