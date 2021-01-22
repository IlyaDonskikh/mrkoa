import * as Koa from 'koa';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';

import { UserSession } from '../../models/user/session.model';

export const authRouterHelper = async (ctx: Koa.Context, next: Function) => {
  const authorizationHeader = ctx.request.headers.authorization;

  const session = await findSession(authorizationHeader);

  if (session) {
    ctx.currentSession = session;
    ctx.currentUser = await ctx.currentSession.getUser();

    await next();
  } else {
    ctx.status = 403;
  }
};

// private

async function findSession(authorizationHeader: string) {
  const rawToken = extractTokenFrom(authorizationHeader);
  const decodedToken = decodeToken(rawToken);

  if (!decodedToken) {
    return;
  }

  const session = await UserSession.findOne({
    where: { token: decodedToken.sessionToken },
  });

  return session;
}

function extractTokenFrom(authorizationHeader?: string) {
  if (typeof authorizationHeader !== 'string') return;

  if (authorizationHeader.startsWith('Bearer ')) {
    return _.replace(authorizationHeader, 'Bearer ', '');
  }
}

function decodeToken(rawToken?: string) {
  if (!rawToken) {
    return;
  }

  try {
    const token = jwt.verify(rawToken, process.env.NODE_APP_TOKEN as string);

    return token as { sessionToken: string };
  } catch (err) {
    return;
  }
}
