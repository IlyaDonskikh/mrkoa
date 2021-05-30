import * as faker from 'faker';

import { User } from '../../../../src/models/user.model';
import { PanelUserCreateCase } from '../../../../src/usecases/panel/user/create.case';
import { UserFactory } from '../../../factories/user.factory';

interface UserAttrs {
  email: string;
  password: string;
  passwordConfirmation: string;
}

describe('Panel | User Services', () => {
  describe('Create', () => {
    function useCaseCall(userAttrs: UserAttrs) {
      const attrs = {
        user: userAttrs,
      };

      return PanelUserCreateCase.call(attrs);
    }

    let userAttrs: UserAttrs;

    beforeEach(async () => {
      const user = await UserFactory.build();

      userAttrs = {
        email: user.email,
        password: user.password,
        passwordConfirmation: user.passwordConfirmation,
      };
    });

    it('success', async () => {
      const useCase = await useCaseCall(userAttrs);

      expect(useCase.user).toBeInstanceOf(User);
    });

    describe('when email contains capital chars', () => {
      const emailWithCapitalChars = faker.internet.email().toUpperCase();

      beforeEach(async () => {
        userAttrs.email = emailWithCapitalChars;
      });

      it('downcase email', async () => {
        const lowercaseEmail = emailWithCapitalChars.toLowerCase();
        const useCase = await useCaseCall(userAttrs);

        expect(useCase.user.email).toEqual(lowercaseEmail);
      });
    });

    describe('when user password too short ', () => {
      beforeEach(async () => {
        userAttrs.password = 'a';
      });

      it('reject with password presence error', async () => {
        await expect(useCaseCall(userAttrs)).rejects.toMatchObject({
          errors: { password: ['length', 'confirmation'] },
        });
      });
    });

    describe('when password and confirmation password is not same', () => {
      beforeEach(async () => {
        userAttrs.password = `is_not_the_same${userAttrs.passwordConfirmation}`;
      });

      it('reject with password confirmation error', async () => {
        await expect(useCaseCall(userAttrs)).rejects.toMatchObject({
          errors: { password: ['confirmation'] },
        });
      });
    });

    describe('when user email has a wrong format', () => {
      const emailWrongFormat = 'wrong_format';

      beforeEach(async () => {
        userAttrs.email = emailWrongFormat;
      });

      test('reject with email format error', async () => {
        await expect(useCaseCall(userAttrs)).rejects.toMatchObject({
          errors: { email: ['format'] },
        });
      });
    });

    describe('when user with same email exists', () => {
      let user: any;

      beforeEach(async () => {
        user = await UserFactory.create();

        userAttrs.email = user.email;
      });

      test('reject with email uniq error', async () => {
        await expect(useCaseCall(userAttrs)).rejects.toMatchObject({
          errors: { email: ['uniq'] },
        });
      });
    });
  });
});
