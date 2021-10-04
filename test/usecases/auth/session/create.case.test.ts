import * as faker from 'faker';

import { AuthSessionCreateCase } from '../../../../src/usecases/auth/session/create.case';
import { User } from '../../../../src/models/user.model';
import { UserSession } from '../../../../src/models/user/session.model';
import { UserFactory } from '../../../factories/user.factory';

describe('Auth', () => {
  describe('Session', () => {
    describe('AuthSessionCreateCase', () => {
      describe('#call', () => {
        test('success', async () => {
          const user = await UserFactory.create({});

          const useCase = await AuthSessionCreateCase.call({
            session: buildSessionsAttributes({ user }),
          });

          expect(useCase.session).toBeInstanceOf(UserSession);
        });

        test('return user session', async () => {
          const user = await UserFactory.create({});

          const useCase = await AuthSessionCreateCase.call({
            session: buildSessionsAttributes({ user }),
          });

          expect(useCase.session.userId).toEqual(user.id);
        });

        describe('when password are wrong', () => {
          test('rejected with password error', async () => {
            const user = await UserFactory.create({});
            const wrongPassword = 'sorry, but i am wrong. And always was :(';
            const attrs = buildSessionsAttributes({
              user,
              overrides: { password: wrongPassword },
            });

            const useCase = AuthSessionCreateCase.call({
              session: attrs,
            });

            await expect(useCase).rejects.toMatchObject({
              errors: { password: ['valid'] },
            });
          });
        });

        describe('when password are encrypted', () => {
          test('reject with password error', async () => {
            const user = await UserFactory.create({});
            const attrs = buildSessionsAttributes({
              user,
              overrides: { password: user.password },
            });

            const useCase = AuthSessionCreateCase.call({
              session: attrs,
            });

            await expect(useCase).rejects.toMatchObject({
              errors: { password: ['valid'] },
            });
          });
        });

        describe('when email are wrong', () => {
          test('reject with email error', async () => {
            const emailWrong = `${faker.datatype.uuid()}@iam.wrong`;
            const user = await UserFactory.create({});
            const attrs = buildSessionsAttributes({
              user,
              overrides: { email: emailWrong },
            });

            const useCase = AuthSessionCreateCase.call({
              session: attrs,
            });

            await expect(useCase).rejects.toMatchObject({
              errors: { email: ['find'] },
            });
          });

          test('localize email error', async () => {
            const user = await UserFactory.create({});
            const attrs = buildSessionsAttributes({ user });

            try {
              await AuthSessionCreateCase.call({ session: attrs });
            } catch (err: any) {
              const messages = err.messages();
              expect(messages.email).toContain(`${attrs.email} not found`);
            }
          });
        });
      });
    });
  });
});

function buildSessionsAttributes({
  user,
  overrides,
}: {
  user: User;
  overrides?: Partial<Api.MrAuthSessionCreateRequestSession>;
}): Api.MrAuthSessionCreateRequestSession {
  return {
    email: user.email,
    password: user.passwordConfirmation,
    ...overrides,
  };
}
