/* eslint-disable no-unused-expressions */

import {
  request, expect, buildAuthHeaderBy,
} from '../../../../setup';
import * as userFactory from '../../../../factories/user.factory';

describe('Users Controller', () => {
  let user: any;
  let path: string;
  let authHeader: string[];

  beforeEach('Setup device', async () => {
    user = await userFactory.create();
  });

  // create
  describe('#create', () => {
    beforeEach('Setup path', async () => {
      path = '/api/v1/auth/sign_in';
    });

    function createRequest() {
      return request()
        .post(path)
        .send({
          email: user.email,
          password: user.passwordConfirmation,
        });
    }

    it('return 200 response', (done) => {
      createRequest()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('return token', (done) => {
      createRequest()
        .end((err, res) => {
          expect(res.body.user.token).not.to.be.undefined;
          done();
        });
    });
  });

  // destory
  describe('#destroy', () => {
    beforeEach('Setup path', async () => {
      path = '/api/v1/auth/sign_out';
    });

    function destroyRequest() {
      return request()
        .delete(path);
    }

    context('when auth header not passed', () => {
      it('return 403 response', (done) => {
        destroyRequest()
          .end((err, res) => {
            expect(res).to.have.status(403);
            done();
          });
      });
    });

    context('when auth header passed', () => {
      beforeEach('Setup authHeader', async () => {
        authHeader = buildAuthHeaderBy(user);
      });

      it('return 200 response', (done) => {
        destroyRequest()
          .set(authHeader[0], authHeader[1])
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
});
