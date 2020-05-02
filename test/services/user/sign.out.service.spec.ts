/* eslint-disable no-unused-expressions */

import { expect, buildAuthHeaderBy } from '../../setup';
import * as userFactory from '../../factories/user.factory';
import SignOutService from '../../../dist/services/user/sign.out.service';

describe('User Services', () => {
  describe('SignIn', () => {
    let user: any;
    let password: string;
    let attrs: object;

    beforeEach('Setup user', async () => {
      user = await userFactory.create();
    });

    describe('#call', () => {
      it('success', async () => {
        const service = await SignOutService.call({
          currentUser: user,
        });

        expect(service.isSuccess()).to.be.true;
      });

      it('remove token', async () => {
        const oldToken = user.token;
        await SignOutService.call({
          currentUser: user,
        });

        user.reload();

        expect(oldToken).not.to.be.null;
        expect(user.token).to.be.null;
      });

      context('when currentUser is null', () => {
        it('failed', async () => {
          const service = await SignOutService.call({
            currentUser: null,
          });

          expect(service.isFailed()).to.be.true;
        });

        it('return currentUser uniq error', async () => {
          const service = await SignOutService.call({
            currentUser: null,
          });
          const currentUserErrors = service.errors.errors.currentUser;

          expect(currentUserErrors).to.include('presence');
        });
      });

      context('when currentUser not passed', () => {
        it('failed', async () => {
          const service = await SignOutService.call();

          expect(service.isFailed()).to.be.true;
        });
      });
    });
  });
});
