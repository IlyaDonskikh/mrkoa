import UserFindByAuthorizationService from '../../services/user/find.by.authorization.header.service';

const auth = async (ctx, next) => {
  const authorizationHeader = ctx.request.headers.authorization;
  const service = await UserFindByAuthorizationService.call({
    authorizationHeader,
  });

  if (service.isSuccess()) {
    ctx.currentSession = service.session;
    ctx.currentUser = await ctx.currentSession.getUser();

    await next();
  } else {
    ctx.status = 403;
  }
};

export default auth;
