/* eslint-disable no-unused-expressions */

import { AuthSessionDestroyCase } from '../../../../src/usecases/auth/session/destroy.case';
import * as userSessionFactory from '../../../factories/user/session.factory';
import { UserSession } from '../../../../src/models/user/session.model';

describe('Auth', () => {
  describe('Session', () => {
    describe('AuthSessionDestroyCase', () => {
      describe('#call', () => {
        test('delete session', async () => {
          const session = await userSessionFactory.create();

          await AuthSessionDestroyCase.call({
            id: session.id,
          });

          const deletedSession: any = await UserSession.findByPk(session.id, {
            paranoid: false,
          });

          expect(deletedSession.deletedAt).not.toBeNull();
        });

        describe('when currentSession id is wrong', () => {
          test('reject with id find error', async () => {
            const servicePromise = AuthSessionDestroyCase.call({
              id: -1,
            });

            await expect(servicePromise).rejects.toMatchObject({
              errors: { id: ['find'] },
            });
          });
        });
      });
    });
  });
});
