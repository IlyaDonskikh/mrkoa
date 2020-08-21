/* eslint-disable no-unused-expressions */

import SignOutService from '../../../src/services/user/sign.out.service';
import * as userSessionFactory from '../../factories/user/session.factory';
import { expect } from '../../setup';
import user from '../../../locales/services/user';
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
          currentSession: session,
        });

        expect(service.isSuccess()).to.be.true;
      });

      it('delete session', async () => {
        await SignOutService.call({
          currentSession: session,
        });

        const deletedSession: any = await UserSession.findByPk(session.id, { paranoid: false });

        expect(deletedSession.deletedAt).not.to.be.null;
      });

      context('when currentSession is null', () => {
        it('failed', async () => {
          const service = await SignOutService.call({
            currentSession: null,
          });

          expect(service.isFailed()).to.be.true;
        });

        it('return currentSession presence error', async () => {
          const service = await SignOutService.call({
            currentSession: null,
          });
          const currentSessionErrors = service.errors.errors.currentSession;

          expect(currentSessionErrors).to.include('presence');
        });
      });

      context('when currentSession not passed', () => {
        it('failed', async () => {
          const service = await SignOutService.call();

          expect(service.isFailed()).to.be.true;
        });
      });
    });
  });
});
