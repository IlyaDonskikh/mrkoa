/* eslint-disable no-unused-expressions */

import { request, expect, buildAuthHeaderBy } from '../../../../setup';
import * as userFactory from '../../../../factories/user.factory';

interface CreateSessionAttributes {
  email?: string;
  password?: string;
}

describe('Sessions Controller', () => {
  let user: any;
  let path: string;
  let authHeader: string[];

  beforeEach('Setup device', async () => {
    user = await userFactory.create();
  });

  // create
  describe('#create', () => {
    let sessionAttributes: CreateSessionAttributes;

    beforeEach('Setup path', async () => {
      path = '/api/v1/auth/sign_in';
    });

    beforeEach('Setup create session attributes', async () => {
      sessionAttributes = {
        email: user.email,
        password: user.passwordConfirmation,
      };
    });

    function createRequest(attrs: CreateSessionAttributes) {
      return request().post(path).send(attrs);
    }

    it('return 200 response', async () => {
      const currentRequest = await createRequest(sessionAttributes);

      expect(currentRequest).to.have.status(200);
    });

    it('return tokenJWT', async () => {
      const currentRequest = await createRequest(sessionAttributes);

      expect(currentRequest.body.session.tokenJWT).not.to.be.undefined;
    });

    context('when email not passed', () => {
      beforeEach('Setup create session attributes', async () => {
        sessionAttributes = {
          password: user.passwordConfirmation,
        };
      });

      it('return email error', async () => {
        const currentRequest = await createRequest(sessionAttributes);

        expect(currentRequest.body.errors.email).to.include(
          'fill in the filed',
        );
      });
    });
  });

  // destroy
  describe('#destroy', () => {
    beforeEach('Setup path', async () => {
      path = '/api/v1/auth/sign_out';
    });

    function destroyRequest() {
      return request().delete(path);
    }

    context('when auth header not passed', () => {
      it('return 403 response', async () => {
        const currentRequest = await destroyRequest();

        expect(currentRequest).to.have.status(403);
      });
    });

    context('when auth header passed', () => {
      beforeEach('Setup authHeader', async () => {
        authHeader = await buildAuthHeaderBy(user);
      });

      it('return 200 response', async () => {
        const currentRequest = await destroyRequest().set(
          authHeader[0],
          authHeader[1],
        );

        expect(currentRequest).to.have.status(200);
      });
    });
  });
});
