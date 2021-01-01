/* eslint-disable no-unused-expressions */

import { UserSignOutService } from '../../../src/services/user/sign.out.service';
import * as userSessionFactory from '../../factories/user/session.factory';
import { UserSession } from '../../../src/models/user/session.model';

describe('User Services', () => {
  describe('SignOut', () => {
    let session: any;

    beforeEach(async () => {
      session = await userSessionFactory.create();
    });

    describe('#call', () => {
      test('success', async () => {
        const service = await UserSignOutService.call({
          id: session.id,
        });

        expect(service.isSuccess()).toBeTruthy();
      });

      test('delete session', async () => {
        await UserSignOutService.call({
          id: session.id,
        });

        const deletedSession: any = await UserSession.findByPk(session.id, {
          paranoid: false,
        });

        expect(deletedSession.deletedAt).not.toBeNull();
      });

      describe('when currentSession id is wrong', () => {
        test('reject with currentSession presence error', async () => {
          const servicePromise = UserSignOutService.call({
            id: -1,
          });

          await expect(servicePromise).rejects.toMatchObject({
            errors: { currentSession: ['presence'] },
          });
        });
      });
    });
  });
});
