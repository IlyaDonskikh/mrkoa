/* eslint-disable no-unused-expressions */

import SignOutService from '../../../src/services/user/sign.out.service';
import * as userSessionFactory from '../../factories/user/session.factory';
import { expect } from '../../setup';
import { UserSession } from '../../../src/models/user/session.model';

describe('User Services', () => {
  describe('SignOut', () => {
    let session: any;

    beforeEach('Setup user', async () => {
      session = await userSessionFactory.create();
    });

    describe('#call', () => {
      it('success', async () => {
        const service = await SignOutService.call({
          id: session.id,
        });

        expect(service.isSuccess()).to.be.true;
      });

      it('delete session', async () => {
        await SignOutService.call({
          id: session.id,
        });

        const deletedSession: any = await UserSession.findByPk(session.id, {
          paranoid: false,
        });

        expect(deletedSession.deletedAt).not.to.be.null;
      });

      context('when currentSession id is wrong', () => {
        it('failed', async () => {
          const service = await SignOutService.call({
            id: -1,
          });

          expect(service.isFailed()).to.be.true;
        });

        it('return currentSession presence error', async () => {
          const service = await SignOutService.call({
            id: -1,
          });
          const currentSessionErrors = service.errors.errors.currentSession;

          expect(currentSessionErrors).to.include('presence');
        });
      });
    });
  });
});
