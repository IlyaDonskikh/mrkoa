/* eslint-disable no-unused-expressions */

import CreateService from '../../../../src/services/panel/user/create.service';
import * as userFactory from '../../../factories/user.factory';
import { expect } from '../../../setup';

interface UserAttrs {
  email: string;
  password: string;
  passwordConfirmation: string;
}

describe('Panel | User Services', () => {
  describe('Create', () => {
    function serviceCall(userAttrs: UserAttrs) {
      const attrs = {
        user: userAttrs,
      };

      return CreateService.call(attrs);
    }

    let userAttrs: UserAttrs;

    beforeEach('Set user attrs', async () => {
      const user = await userFactory.build();

      userAttrs = {
        email: user.email,
        password: user.password,
        passwordConfirmation: user.passwordConfirmation,
      };
    });

    it('success', async () => {
      const service = await serviceCall(userAttrs);

      expect(service.isSuccess()).to.be.true;
    });

    context('when email contains capital chars', () => {
      const emailWithCapitalChars = 'Aa@bb.com';

      beforeEach('Change Email', async () => {
        userAttrs.email = emailWithCapitalChars;
      });

      it('downcase email', async () => {
        const downcasedEmail = emailWithCapitalChars.toLowerCase();
        const service = await serviceCall(userAttrs);

        expect(service.user.email).to.be.eq(downcasedEmail);
      });
    });

    context('when user password too short ', () => {
      beforeEach('change password', async () => {
        userAttrs.password = 'a';
      });

      it('return password presence error', async () => {
        const service = await serviceCall(userAttrs);

        const passwordErrors = service.errors.errors.password;

        expect(passwordErrors).to.include('length');
      });
    });

    context('when password and confirmation password is not same', () => {
      beforeEach('Delete password', async () => {
        userAttrs.password = `is_not_the_same${userAttrs.passwordConfirmation}`;
      });

      it('return password confirmation error', async () => {
        const service = await serviceCall(userAttrs);

        const passwordErrors = service.errors.errors.password;

        expect(passwordErrors).to.include('confirmation');
      });
    });

    context('when user email has a wrong format', () => {
      const emailWrongFormat = 'wrong_format';

      beforeEach('Change email', async () => {
        userAttrs.email = emailWrongFormat;
      });

      it('return email format error', async () => {
        const service = await serviceCall(userAttrs);

        const emailErrors = service.errors.errors.email;

        expect(emailErrors).to.include('format');
      });
    });

    context('when user with same email exists', () => {
      let user: any;

      beforeEach('Create user', async () => {
        user = await userFactory.create();
      });

      beforeEach('Update email attribute', () => {
        userAttrs.email = user.email;
      });

      it('failed', async () => {
        const service = await serviceCall(userAttrs);
        expect(service.isFailed()).to.be.true;
      });

      it('return email uniq error', async () => {
        const service = await serviceCall(userAttrs);
        const emailErrors = service.errors.errors.email;

        expect(emailErrors).to.include('uniq');
      });
    });
  });
});
