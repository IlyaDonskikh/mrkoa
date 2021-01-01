/* eslint-disable no-unused-expressions */

import { UserFindByAuthorizationService } from '../../../src/services/user/find.by.authorization.header.service';
import * as userFactory from '../../factories/user.factory';
import { buildAuthHeaderTestHelper } from '../../helpers';

describe('User Services', () => {
  describe('FindByAuthorization', () => {
    async function buildAuthorizationHeader(user: any) {
      const header = (await buildAuthHeaderTestHelper(user))[1];

      return header;
    }

    let user: any;

    beforeEach(async () => {
      user = await userFactory.create();
    });

    describe('#call', () => {
      test('success', async () => {
        const service = await UserFindByAuthorizationService.call({
          authorizationHeader: await buildAuthorizationHeader(user),
        });

        expect(service.isSuccess()).toBeTruthy();
      });

      describe('when authorizationHeader is undefined', () => {
        test('reject with token blank error', async () => {
          const servicePromise = UserFindByAuthorizationService.call({
            authorizationHeader: undefined,
          });

          await expect(servicePromise).rejects.toMatchObject({
            errors: { token: ['blank', 'invalid', 'session'] },
          });
        });
      });
    });
  });
});
