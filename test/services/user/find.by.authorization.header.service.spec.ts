/* eslint-disable no-unused-expressions */

import FindByAuthorizationService from '../../../dist/services/user/find.by.authorization.header.service';
import * as userFactory from '../../factories/user.factory';
import { buildAuthHeaderBy, expect } from '../../setup';

describe('User Services', () => {
  describe('FindByAuthorization', () => {
    async function buildAuthorizationHeader(user: any) {
      const header = (await buildAuthHeaderBy(user))[1];

      return header;
    }

    let user: any;

    beforeEach('Setup session', async () => {
      user = await userFactory.create();
    });

    describe('#call', () => {
      it('success', async () => {
        const service = await FindByAuthorizationService.call({
          authorizationHeader: await buildAuthorizationHeader(user),
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
    });
  });
});
