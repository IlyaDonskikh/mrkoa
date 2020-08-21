/* eslint-disable no-unused-expressions */

import { expect } from '../../setup';
import * as userFactory from '../../factories/user.factory';
import CreateService from '../../../dist/services/user/create.service';

describe('User Services', () => {
  describe('Create', () => {
    function serviceCall(userAttrs: object) {
      const attrs = { attrs: userAttrs };

      return CreateService.call(attrs);
    }

    let userAttrs: any;

    beforeEach('Set user attrs', async () => {
      const user = await userFactory.build();

      userAttrs = user.toJSON();
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
