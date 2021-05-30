/* eslint-disable no-unused-expressions */

import { AuthSessionDestroyCase } from '../../../../src/usecases/auth/session/destroy.case';
import { UserSession } from '../../../../src/models/user/session.model';
import { UserSessionFactory } from '../../../factories/user/session.factory';

describe('Auth', () => {
  describe('Session', () => {
    describe('AuthSessionDestroyCase', () => {
      describe('#call', () => {
        test('delete session', async () => {
          const session = await UserSessionFactory.create();

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
