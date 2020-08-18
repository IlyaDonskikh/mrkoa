import SessionDefaultSerializer from '../../../../serializers/session/default.serializer';
import SignInService from '../../../../services/user/sign.in.service';
import SignOutService from '../../../../services/user/sign.out.service';

const create = async (ctx, next) => {
  const service = await SignInService.call(ctx.request.body);

  if (service.isSuccess()) {
    ctx.body = { session: await SessionDefaultSerializer.serialize(service.session) };
  } else {
    ctx.body = { errors: service.errors.messages() };
    ctx.status = 422;
  }

  await next;
};

const destroy = async (ctx, next) => {
  const service = await SignOutService.call({
    currentSession: ctx.currentSession,
  });


  if (service.isSuccess()) {
    ctx.status = 200;
  } else {
    ctx.body = { errors: service.errors.messages() };
    ctx.status = 422;
  }

  await next;
};

export {
  create, destroy,
};
