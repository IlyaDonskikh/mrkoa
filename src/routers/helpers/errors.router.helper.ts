import * as Koa from 'koa';
import ErrorsService from '../../services/errors.service';

const errorsRouterHelper = async (ctx: Koa.Context, next: Function) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ErrorsService) {
      ctx.status = 422;
      ctx.body = { errors: err.messages() };
    } else {
      throw err;
    }
  }
};

export default errorsRouterHelper;
