import * as Koa from 'koa';

import { ErrorsBuilder } from '../../utils/errors.builder';

const errorsRouterHelper = async (ctx: Koa.Context, next: Function) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ErrorsBuilder) {
      ctx.status = err.statusCode;
      ctx.body = { errors: err.messages() };
    } else {
      throw err;
    }
  }
};

export { errorsRouterHelper };
