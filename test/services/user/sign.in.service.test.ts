import * as userFactory from '../../factories/user.factory';
import { UserSignInService } from '../../../src/services/user/sign.in.service';
import { User } from '../../../src/models/user.model';

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
        const service = await UserSignInService.call({
          email: user.email,
          password,
        });

        expect(service.isSuccess()).toBeTruthy();
      });

      test('return user session', async () => {
        const service = await UserSignInService.call({
          email: user.email,
          password,
        });

        expect(service.session.userId).toEqual(user.id);
      });

      describe('when password are wrong', () => {
        beforeEach(() => {
          attrs = {
            email: user.email,
            password: 'sorry, but i am wrong. And always was :(',
          };
        });

        test('rejected with password error', async () => {
          const servicePromise = UserSignInService.call(attrs);

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
          const servicePromise = UserSignInService.call(attrs);

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
          const servicePromise = UserSignInService.call(attrs);

          await expect(servicePromise).rejects.toMatchObject({
            errors: { email: ['find'] },
          });
        });
      });
    });
  });
});
