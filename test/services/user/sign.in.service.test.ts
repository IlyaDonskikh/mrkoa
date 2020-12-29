import * as userFactory from '../../factories/user.factory';
import SignInService from '../../../src/services/user/sign.in.service';
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
        const service = await SignInService.call({
          email: user.email,
          password,
        });

        expect(service.isSuccess()).toBeTruthy();
      });

      test('return user session', async () => {
        const service = await SignInService.call({
          email: user.email,
          password,
        });
        const serviceUser = service.session;

        expect(service.session.userId).toEqual(user.id);
      });

      describe('when password are wrong', () => {
        beforeEach(() => {
          attrs = {
            email: user.email,
            password: 'sorry, but i am wrong. And always was :(',
          };
        });

        test('fail', async () => {
          const service = await SignInService.call(attrs);

          expect(service.isFailed()).toBeTruthy();
        });

        test('return localized password error', async () => {
          const service = await SignInService.call(attrs);
          const passwordErrors = service.errors.messages().password;

          expect(passwordErrors).toContain("doesn't valid or match email");
        });

        test('return password error', async () => {
          const service = await SignInService.call(attrs);
          const passwordErrors = service.errors.errors.password;

          expect(passwordErrors).toContain('valid');
        });
      });

      describe('when password are encrypted', () => {
        beforeEach(() => {
          attrs = {
            email: user.email,
            password: user.password,
          };
        });

        test('fail', async () => {
          const service = await SignInService.call(attrs);

          expect(service.isFailed()).toBeTruthy();
        });

        test('return password error', async () => {
          const service = await SignInService.call(attrs);
          const passwordErrors = service.errors.errors.password;

          expect(passwordErrors).toContain('valid');
        });
      });

      describe('when email are wrong', () => {
        beforeEach(() => {
          attrs = {
            email: 'i@am.wrong',
            password: user.password,
          };
        });

        test('fail', async () => {
          const service = await SignInService.call(attrs);

          expect(service.isFailed()).toBeTruthy();
        });

        test('return email error', async () => {
          const service = await SignInService.call(attrs);
          const emailErrors = service.errors.errors.email;

          expect(emailErrors).toContain('find');
        });
      });
    });
  });
});
