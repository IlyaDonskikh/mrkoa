/* eslint-disable no-unused-expressions */

import { expect, buildAuthHeaderBy } from '../../setup';
import * as userFactory from '../../factories/user.factory';
import SignInservice from '../../../dist/services/user/sign.in.service';

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
        const service = await SignInservice.call({
          email: user.email,
          password,
        });

        expect(service.isSuccess()).to.be.true;
      });

      it('change token', async () => {
        const oldToken = user.token;
        await SignInservice.call({
          email: user.email,
          password,
        });

        await user.reload();

        expect(user.token).not.to.be.null;
        expect(user.token).not.to.be.eql(oldToken);
      });

      it('return user', async () => {
        const service = await SignInservice.call({
          email: user.email,
          password,
        });

        await user.reload();

        expect(service.user.toJSON()).to.eql(user.toJSON());
      });

      context('when password are wrong', () => {
        beforeEach('Setup attrs', () => {
          attrs = {
            email: user.email,
            password: 'sorry, but i am wrong. And always was :(',
          };
        });

        it('fail', async () => {
          const service = await SignInservice.call(attrs);

          expect(service.isFailed()).to.be.true;
        });

        it('return password error', async () => {
          const service = await SignInservice.call(attrs);
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
          const service = await SignInservice.call(attrs);

          expect(service.isFailed()).to.be.true;
        });

        it('return password error', async () => {
          const service = await SignInservice.call(attrs);
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
          const service = await SignInservice.call(attrs);

          expect(service.isFailed()).to.be.true;
        });

        it('return email error', async () => {
          const service = await SignInservice.call(attrs);
          const emailErrors = service.errors.errors.email;

          expect(emailErrors).to.include('find');
        });
      });
    });
  });
});
