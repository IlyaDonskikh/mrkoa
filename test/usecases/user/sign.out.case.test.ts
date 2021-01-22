/* eslint-disable no-unused-expressions */

import { UserSignOutCase } from '../../../src/usecases/user/sign.out.case';
import * as userSessionFactory from '../../factories/user/session.factory';
import { UserSession } from '../../../src/models/user/session.model';

describe('User Services', () => {
  describe('SignOut', () => {
    let session: any;

    beforeEach(async () => {
      session = await userSessionFactory.create();
    });

    describe('#call', () => {
      test('delete session', async () => {
        await UserSignOutCase.call({
          id: session.id,
        });

        const deletedSession: any = await UserSession.findByPk(session.id, {
          paranoid: false,
        });

        expect(deletedSession.deletedAt).not.toBeNull();
      });

      describe('when currentSession id is wrong', () => {
        test('reject with id find error', async () => {
          const servicePromise = UserSignOutCase.call({
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
