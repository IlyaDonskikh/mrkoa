import * as faker from 'faker';

import * as userFactory from '../../factories/user.factory';
import CreateService from '../../../src/services/user/create.service';

describe('User Services', () => {
  describe('Create', () => {
    function serviceCall(userAttrs: {
      email: string;
      password: string;
      passwordConfirmation: string;
    }) {
      const attrs = {
        user: userAttrs,
      };

      return CreateService.call(attrs);
    }

    let userAttrs: any;

    beforeEach(async () => {
      const user = await userFactory.build();

      userAttrs = user.toJSON();
    });

    test('success', async () => {
      const service = await serviceCall(userAttrs);

      expect(service.isSuccess()).toBeTruthy();
    });

    describe('when email contains capital chars', () => {
      const emailWithCapitalChars = faker.internet.email().toUpperCase();

      beforeEach(async () => {
        userAttrs.email = emailWithCapitalChars;
      });

      test('downcase email', async () => {
        const downcasedEmail = emailWithCapitalChars.toLowerCase();
        const service = await serviceCall(userAttrs);

        expect(service.user.email).toEqual(downcasedEmail);
      });
    });

    describe('when user with same email exists', () => {
      let user: any;

      beforeEach(async () => {
        user = await userFactory.create();
        userAttrs.email = user.email;
      });

      test('failed', async () => {
        const service = await serviceCall(userAttrs);
        expect(service.isFailed()).toBeTruthy();
      });

      test('return email uniq error', async () => {
        const service = await serviceCall(userAttrs);
        const emailErrors = service.errors.errors.email;

        expect(emailErrors).toContain('uniq');
      });
    });
  });
});
