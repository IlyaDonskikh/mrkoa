const index = async (ctx) => {
  ctx.body = { events: [], time: Date.now() };
};

const show = async (ctx) => {
  ctx.body = { events: [], time: Date.now() };
};

export { index, show };
