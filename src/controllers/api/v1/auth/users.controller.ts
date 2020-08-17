import SignInService from '../../../../services/user/sign.in.service';
import SignOutService from '../../../../services/user/sign.out.service';
import UserAuthSerializer from '../../../../serializers/user/auth.serializer';

const create = async (ctx, next) => {
  const service = await SignInService.call(ctx.request.body);

  if (service.isSuccess()) {
    ctx.body = { user: await UserAuthSerializer.serialize(service.user) };
  } else {
    ctx.body = { errors: service.errors.messages() };
    ctx.status = 422;
  }

  await next;
};

const destroy = async (ctx, next) => {
  const service = await SignOutService.call({
    currentUser: ctx.currentUser,
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
