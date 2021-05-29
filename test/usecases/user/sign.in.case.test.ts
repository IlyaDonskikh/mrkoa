import * as faker from 'faker';

import * as userFactory from '../../factories/user.factory';
import { UserSignInCase } from '../../../src/usecases/user/sign.in.case';
import { User } from '../../../src/models/user.model';
import { UserSession } from '../../../src/models/user/session.model';

describe('User Services', () => {
  describe('SignIn', () => {
    describe('#call', () => {
      test('success', async () => {
        const user = await userFactory.create({});

        const useCase = await UserSignInCase.call({
          session: buildSessionsAttributes({ user }),
        });

        expect(useCase.session).toBeInstanceOf(UserSession);
      });

      test('return user session', async () => {
        const user = await userFactory.create({});

        const useCase = await UserSignInCase.call({
          session: buildSessionsAttributes({ user }),
        });

        expect(useCase.session.userId).toEqual(user.id);
      });

      describe('when password are wrong', () => {
        test('rejected with password error', async () => {
          const user = await userFactory.create({});
          const wrongPassword = 'sorry, but i am wrong. And always was :(';
          const attrs = buildSessionsAttributes({
            user,
            overrides: { password: wrongPassword },
          });

          const useCase = UserSignInCase.call({
            session: attrs,
          });

          await expect(useCase).rejects.toMatchObject({
            errors: { password: ['valid'] },
          });
        });
      });

      describe('when password are encrypted', () => {
        test('reject with password error', async () => {
          const user = await userFactory.create({});
          const attrs = buildSessionsAttributes({
            user,
            overrides: { password: user.password },
          });

          const useCase = UserSignInCase.call({
            session: attrs,
          });

          await expect(useCase).rejects.toMatchObject({
            errors: { password: ['valid'] },
          });
        });
      });

      describe('when email are wrong', () => {
        test('reject with email error', async () => {
          const emailWrong = `${faker.random.uuid()}@iam.wrong`;
          const user = await userFactory.create({});
          const attrs = buildSessionsAttributes({
            user,
            overrides: { email: emailWrong },
          });

          const useCase = UserSignInCase.call({
            session: attrs,
          });

          await expect(useCase).rejects.toMatchObject({
            errors: { email: ['find'] },
          });
        });

        test('localize email error', async () => {
          const user = await userFactory.create({});
          const attrs = buildSessionsAttributes({ user });

          try {
            await UserSignInCase.call({ session: attrs });
          } catch (err) {
            const messages = err.messages();
            expect(messages.email).toContain(`${attrs.email} not found`);
          }
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
