import { faker } from '@faker-js/faker';

import { UserSession } from '../../../../src/models/user/session.model';
import { AuthSessionDestroyCase } from '../../../../src/usecases/auth/session/destroy.case';
import { UserSessionFactory } from '../../../factories/user/session.factory';
import { UserFactory } from '../../../factories/user.factory';

describe('Auth | Session', () => {
  describe('AuthSessionDestroyCase', () => {
    describe('#call', () => {
      test('delete session', async () => {
        const user = await UserFactory.create();
        const session = await UserSessionFactory.create({
          userUUID: user.uuid,
        });

        await AuthSessionDestroyCase.call({
          uuid: session.uuid,
        });

        const deletedSession = await UserSession.findByPk(session.uuid, {
          paranoid: false,
          rejectOnEmpty: true,
        });

        expect(deletedSession.deletedAt).not.toBeNull();
      });

      describe('when currentSession uuid is wrong', () => {
        test('reject with uuid find error', async () => {
          const uuid = faker.string.uuid();

          const servicePromise = AuthSessionDestroyCase.call({
            uuid,
          });

          await expect(servicePromise).rejects.toMatchObject({
            errors: { uuid: ['find'] },
          });
        });
      });
    });
  });
});
