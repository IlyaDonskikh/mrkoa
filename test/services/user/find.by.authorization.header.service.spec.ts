/* eslint-disable no-unused-expressions */

import { expect, buildAuthHeaderBy } from '../../setup';
import * as userFactory from '../../factories/user.factory';
import FindByAuthorizationService from '../../../dist/services/user/find.by.authorization.header.service';

describe('User Services', () => {
  describe('FindByAuthorization', () => {
    function buildServiceAttrsBy(user) {
      return buildAuthHeaderBy(user)[1];
    }

    let user: any;

    beforeEach('Setup user', async () => {
      user = await userFactory.create();
    });

    describe('#call', () => {
      it('success', async () => {
        const service = await FindByAuthorizationService.call({
          authorizationHeader: buildServiceAttrsBy(user),
        });

        expect(service.isSuccess()).to.be.true;
      });

      context('when authorizationHeader is null', () => {
        it('fail', async () => {
          const service = await FindByAuthorizationService.call({
            authorizationHeader: null,
          });

          expect(service.isFailed()).to.be.true;
        });

        it('return token user error', async () => {
          const service = await FindByAuthorizationService.call({
            authorizationHeader: null,
          });
          const tokenErrors = service.errors.errors.token;

          expect(tokenErrors).to.include('blank');
        });
      });

      context('when passed token of not existed user', () => {
        beforeEach('Change header', async () => {
          user = await userFactory.build();
        });

        it('fail', async () => {
          const service = await FindByAuthorizationService.call({
            authorizationHeader: buildServiceAttrsBy(user),
          });

          expect(service.isFailed()).to.be.true;
        });

        it('return token user error', async () => {
          const service = await FindByAuthorizationService.call({
            authorizationHeader: buildServiceAttrsBy(user),
          });
          const tokenErrors = service.errors.errors.token;

          expect(tokenErrors).to.include('user');
        });
      });
    });
  });
});
