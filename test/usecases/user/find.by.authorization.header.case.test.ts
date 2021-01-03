/* eslint-disable no-unused-expressions */

import { UserFindByAuthorizationCase } from '../../../src/usecases/user/find.by.authorization.header.case';
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
        const useCase = await UserFindByAuthorizationCase.call({
          authorizationHeader: await buildAuthorizationHeader(user),
        });

        expect(useCase.isSuccess()).toBeTruthy();
      });

      describe('when authorizationHeader is undefined', () => {
        test('reject with token blank error', async () => {
          const servicePromise = UserFindByAuthorizationCase.call({
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
