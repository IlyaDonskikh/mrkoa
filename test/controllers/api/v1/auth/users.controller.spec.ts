/* eslint-disable no-unused-expressions */

import {
  request, expect, buildAuthHeaderBy,
} from '../../../../setup';
import * as userFactory from '../../../../factories/user.factory';
import { User } from '../../../../../dist/models/user.model';

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

    it('return 200 response', async () => {
      const currentRequest = await createRequest();

      expect(currentRequest).to.have.status(200);
    });

    it('return tokenJWT', async () => {
      const currentRequest = await createRequest();

      expect(currentRequest.body.user.tokenJWT).not.to.be.undefined;
    });
  });

  // destroy
  describe('#destroy', () => {
    beforeEach('Setup path', async () => {
      path = '/api/v1/auth/sign_out';
    });

    function destroyRequest() {
      return request()
        .delete(path);
    }

    context('when auth header not passed', () => {
      it('return 403 response', async () => {
        const currentRequest = await destroyRequest();

        expect(currentRequest).to.have.status(403);
      });
    });

    context('when auth header passed', () => {
      beforeEach('Setup authHeader', async () => {
        authHeader = buildAuthHeaderBy(user);
      });

      it('return 200 response', async () => {
        const currentRequest = await destroyRequest()
          .set(authHeader[0], authHeader[1]);

        expect(currentRequest).to.have.status(200);
      });
    });
  });
});
