import * as userFactory from '../../factories/user.factory';
import { UserSignInCase } from '../../../src/usecases/user/sign.in.case';
import { User } from '../../../src/models/user.model';
import { UserSession } from '../../../src/models/user/session.model';

describe('User Services', () => {
  describe('SignIn', () => {
    let user: User;
    let password: string;
    let attrs: any;

    beforeEach(async () => {
      user = await userFactory.create({});
    });

    describe('#call', () => {
      beforeEach(() => {
        password = user.passwordConfirmation;
      });

      test('success', async () => {
        const useCase = await UserSignInCase.call({
          email: user.email,
          password,
        });

        expect(useCase.session).toBeInstanceOf(UserSession);
      });

      test('return user session', async () => {
        const useCase = await UserSignInCase.call({
          email: user.email,
          password,
        });

        expect(useCase.session.userId).toEqual(user.id);
      });

      describe('when password are wrong', () => {
        beforeEach(() => {
          attrs = {
            email: user.email,
            password: 'sorry, but i am wrong. And always was :(',
          };
        });

        test('rejected with password error', async () => {
          const servicePromise = UserSignInCase.call(attrs);

          await expect(servicePromise).rejects.toMatchObject({
            errors: { password: ['valid'] },
          });
        });
      });

      describe('when password are encrypted', () => {
        beforeEach(() => {
          attrs = {
            email: user.email,
            password: user.password,
          };
        });

        test('reject with password error', async () => {
          const servicePromise = UserSignInCase.call(attrs);

          await expect(servicePromise).rejects.toMatchObject({
            errors: { password: ['valid'] },
          });
        });
      });

      describe('when email are wrong', () => {
        beforeEach(() => {
          attrs = {
            email: 'i@am.wrong',
            password: user.password,
          };
        });

        test('reject with email error', async () => {
          const servicePromise = UserSignInCase.call(attrs);

          await expect(servicePromise).rejects.toMatchObject({
            errors: { email: ['find'] },
          });
        });

        test('localize email error', async () => {
          try {
            await UserSignInCase.call(attrs);
          } catch (err) {
            const messages = err.messages();
            expect(messages.email).toContain('not found');
          }
        });
      });
    });
  });
});
