/* eslint-disable no-unused-expressions */

import SignOutService from '../../../src/services/user/sign.out.service';
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
        const service = await SignOutService.call({
          id: session.id,
        });

        expect(service.isSuccess()).toBeTruthy();
      });

      test('delete session', async () => {
        await SignOutService.call({
          id: session.id,
        });

        const deletedSession: any = await UserSession.findByPk(session.id, {
          paranoid: false,
        });

        expect(deletedSession.deletedAt).not.toBeNull();
      });

      describe('when currentSession id is wrong', () => {
        test('failed', async () => {
          const service = await SignOutService.call({
            id: -1,
          });

          expect(service.isFailed()).toBeTruthy();
        });

        test('return currentSession presence error', async () => {
          const service = await SignOutService.call({
            id: -1,
          });
          const currentSessionErrors = service.errors.errors.currentSession;

          expect(currentSessionErrors).toContain('presence');
        });
      });
    });
  });
});
