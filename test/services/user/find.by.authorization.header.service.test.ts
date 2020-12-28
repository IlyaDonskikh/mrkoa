/* eslint-disable no-unused-expressions */

import FindByAuthorizationService from '../../../src/services/user/find.by.authorization.header.service';
import * as userFactory from '../../factories/user.factory';
import { buildAuthHeaderBy } from '../../setup';

describe('User Services', () => {
  describe('FindByAuthorization', () => {
    async function buildAuthorizationHeader(user: any) {
      const header = (await buildAuthHeaderBy(user))[1];

      return header;
    }

    let user: any;

    beforeEach(async () => {
      user = await userFactory.create();
    });

    describe('#call', () => {
      test('success', async () => {
        const service = await FindByAuthorizationService.call({
          authorizationHeader: await buildAuthorizationHeader(user),
        });

        expect(service.isSuccess()).toBeTruthy();
      });

      describe('when authorizationHeader is undefined', () => {
        test('fail', async () => {
          const service = await FindByAuthorizationService.call({
            authorizationHeader: undefined,
          });

          expect(service.isFailed()).toBeTruthy();
        });

        test('return token user error', async () => {
          const service = await FindByAuthorizationService.call({
            authorizationHeader: undefined,
          });
          const tokenErrors = service.errors.errors.token;

          expect(tokenErrors).toContain('blank');
        });
      });
    });
  });
});
