/* eslint-disable no-unused-expressions */

import { expect } from '../../setup';
import * as userFactory from '../../factories/user.factory';
import SignInService from '../../../src/services/user/sign.in.service';
import { User } from '../../../src/models/user.model';

describe('User Services', () => {
  describe('SignIn', () => {
    let user: User;
    let password: string;
    let attrs: any;

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

      it('return user session', async () => {
        const service = await SignInService.call({
          email: user.email,
          password,
        });
        const serviceUser = service.session;

        expect(service.session.userId).to.eq(user.id);
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
          const service = await SignInService.call(attrs);
          const passwordErrors = service.errors.messages().password;

          expect(passwordErrors).to.include("doesn't valid or match email");
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
