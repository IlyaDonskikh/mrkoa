import { User } from '../src/models/user.model';
import { UserSessionFactory } from './factories/user/session.factory';

export async function buildAuthHeaderTestHelper(
  user: User,
): Promise<[string, string]> {
  const token: string = await buildAuthTokenBy(user);

  return ['Authorization', `Bearer ${token}`];
}

/// private
async function buildAuthTokenBy(user: User): Promise<string> {
  const session: any = await UserSessionFactory.create({ userId: user.id });

  return session.tokenJWT;
}
