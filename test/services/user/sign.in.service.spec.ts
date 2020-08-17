/* eslint-disable no-unused-expressions */

import { expect } from '../../setup';
import * as userFactory from '../../factories/user.factory';
import SignInService from '../../../dist/services/user/sign.in.service';

describe('User Services', () => {
  describe('SignIn', () => {
    let user: any;
    let password: string;
    let attrs: object;

    beforeEach('Setup user', async () => {
      user = await userFactory.create();
    });

    describe('#call', () => {
      beforeEach('Setup password', () => {
        password = user.passwordConfirmation;
      });

      it('success', async () => {
        const service = await SignInService.call({
          email: user.email,
          password,
        });

        expect(service.isSuccess()).to.be.true;
      });

      it('change token', async () => {
        const oldToken = user.token;
        await SignInService.call({
          email: user.email,
          password,
        });

        await user.reload();

        expect(user.token).not.to.be.null;
        expect(user.token).not.to.be.eql(oldToken);
      });

      it('return user', async () => {
        const service = await SignInService.call({
          email: user.email,
          password,
        });
        const serviceUser = service.user.toJSON();

        await user.reload();
        delete serviceUser.tokenJWT;

        expect(serviceUser).to.eql(user.toJSON());
      });

      context('when password are wrong', () => {
        beforeEach('Setup attrs', () => {
          attrs = {
            email: user.email,
            password: 'sorry, but i am wrong. And always was :(',
          };
        });

        it('fail', async () => {
          const service = await SignInService.call(attrs);

          expect(service.isFailed()).to.be.true;
        });

        it('return localized password error', async () => {
          // ToDo: localization

          // const service = await SignInService.call(attrs);
          // const passwordErrors = service.errors.messages().password;

          // expect(passwordErrors).to.include('doesn\'t valid or match email');
        });

        it('return password error', async () => {
          const service = await SignInService.call(attrs);
          const passwordErrors = service.errors.errors.password;

          expect(passwordErrors).to.include('valid');
        });
      });

      context('when password are encrypted', () => {
        beforeEach('Setup attrs', () => {
          attrs = {
            email: user.email,
            password: user.password,
          };
        });

        it('fail', async () => {
          const service = await SignInService.call(attrs);

          expect(service.isFailed()).to.be.true;
        });

        it('return password error', async () => {
          const service = await SignInService.call(attrs);
          const passwordErrors = service.errors.errors.password;

          expect(passwordErrors).to.include('valid');
        });
      });

      context('when email are wrong', () => {
        beforeEach('Setup attrs', () => {
          attrs = {
            email: 'i@am.wrong',
            password: user.password,
          };
        });

        it('fail', async () => {
          const service = await SignInService.call(attrs);

          expect(service.isFailed()).to.be.true;
        });

        it('return email error', async () => {
          const service = await SignInService.call(attrs);
          const emailErrors = service.errors.errors.email;

          expect(emailErrors).to.include('find');
        });
      });
    });
  });
});
