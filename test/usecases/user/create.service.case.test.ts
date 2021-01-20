import * as faker from 'faker';

import * as userFactory from '../../factories/user.factory';
import { UserCreateCase } from '../../../src/usecases/user/create.case';

describe('User Services', () => {
  describe('Create', () => {
    function useCaseCall(userAttrs: {
      email: string;
      password: string;
      passwordConfirmation: string;
    }) {
      const attrs = {
        user: userAttrs,
      };

      return UserCreateCase.call(attrs);
    }

    let userAttrs: any;

    beforeEach(async () => {
      const user = await userFactory.build();

      userAttrs = user.toJSON();
    });

    test('success', async () => {
      const useCase = await useCaseCall(userAttrs);

      expect(useCase.isSuccess()).toBeTruthy();
    });

    describe('when email contains capital chars', () => {
      const emailWithCapitalChars = faker.internet.email().toUpperCase();

      beforeEach(async () => {
        userAttrs.email = emailWithCapitalChars;
      });

      test('downcase email', async () => {
        const lowercaseEmail = emailWithCapitalChars.toLowerCase();
        const useCase = await useCaseCall(userAttrs);

        expect(useCase.user.email).toEqual(lowercaseEmail);
      });
    });

    describe('when user with same email exists', () => {
      let user: any;

      beforeEach(async () => {
        user = await userFactory.create();
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
