import * as faker from 'faker';

import CreateService from '../../../../src/services/panel/user/create.service';
import * as userFactory from '../../../factories/user.factory';

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

    beforeEach(async () => {
      const user = await userFactory.build();

      userAttrs = {
        email: user.email,
        password: user.password,
        passwordConfirmation: user.passwordConfirmation,
      };
    });

    it('success', async () => {
      const service = await serviceCall(userAttrs);

      expect(service.isSuccess()).toBeTruthy();
    });

    describe('when email contains capital chars', () => {
      const emailWithCapitalChars = faker.internet.email().toUpperCase();

      beforeEach(async () => {
        userAttrs.email = emailWithCapitalChars;
      });

      it('downcase email', async () => {
        const lowercaseEmail = emailWithCapitalChars.toLowerCase();
        const service = await serviceCall(userAttrs);

        expect(service.user.email).toEqual(lowercaseEmail);
      });
    });

    describe('when user password too short ', () => {
      beforeEach(async () => {
        userAttrs.password = 'a';
      });

      it('return password presence error', async () => {
        const service = await serviceCall(userAttrs);

        const passwordErrors = service.errors.errors.password;

        expect(passwordErrors).toContain('length');
      });
    });

    describe('when password and confirmation password is not same', () => {
      beforeEach(async () => {
        userAttrs.password = `is_not_the_same${userAttrs.passwordConfirmation}`;
      });

      it('return password confirmation error', async () => {
        const service = await serviceCall(userAttrs);

        const passwordErrors = service.errors.errors.password;

        expect(passwordErrors).toContain('confirmation');
      });
    });

    describe('when user email has a wrong format', () => {
      const emailWrongFormat = 'wrong_format';

      beforeEach(async () => {
        userAttrs.email = emailWrongFormat;
      });

      it('return email format error', async () => {
        const service = await serviceCall(userAttrs);

        const emailErrors = service.errors.errors.email;

        expect(emailErrors).toContain('format');
      });
    });

    describe('when user with same email exists', () => {
      let user: any;

      beforeEach(async () => {
        user = await userFactory.create();

        userAttrs.email = user.email;
      });

      it('failed', async () => {
        const service = await serviceCall(userAttrs);
        expect(service.isFailed()).toBeTruthy();
      });

      it('return email uniq error', async () => {
        const service = await serviceCall(userAttrs);
        const emailErrors = service.errors.errors.email;

        expect(emailErrors).toContain('uniq');
      });
    });
  });
});
