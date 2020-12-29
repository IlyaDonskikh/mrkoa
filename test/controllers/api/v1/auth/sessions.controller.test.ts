import * as request from 'supertest';

import { buildAuthHeaderTestHelper } from '../../../../helpers';
import * as app from '../../../../../src';
import * as userFactory from '../../../../factories/user.factory';

interface CreateSessionAttributes {
  email?: string;
  password?: string;
}

describe('Sessions Controller', () => {
  let user: any;
  let path: string;
  let authHeader: string[];

  beforeEach(async () => {
    user = await userFactory.create();
  });

  // create
  describe('#create', () => {
    let sessionAttributes: CreateSessionAttributes;

    beforeEach(async () => {
      path = '/api/v1/auth/sign_in';
      sessionAttributes = {
        email: user.email,
        password: user.passwordConfirmation,
      };
    });

    function createRequest(attrs: CreateSessionAttributes) {
      return request(app.callback()).post(path).send(attrs);
    }

    test('return 200 response', async () => {
      const currentRequest = await createRequest(sessionAttributes);

      expect(currentRequest.status).toBe(200);
    });

    test('return tokenJWT', async () => {
      const currentRequest = await createRequest(sessionAttributes);

      expect(currentRequest.body.session.tokenJWT).not.toBeUndefined();
    });

    describe('when email not passed', () => {
      beforeEach(async () => {
        sessionAttributes = {
          password: user.passwordConfirmation,
        };
      });

      test('return email error', async () => {
        const currentRequest = await createRequest(sessionAttributes);

        expect(currentRequest.body.errors.email).toContain('fill in the filed');
      });
    });
  });

  // destroy
  describe('#destroy', () => {
    beforeEach(async () => {
      path = '/api/v1/auth/sign_out';
    });

    function destroyRequest() {
      return request(app.callback()).delete(path);
    }

    describe('when auth header not passed', () => {
      test('return 403 response', async () => {
        const currentRequest = await destroyRequest();

        expect(currentRequest.status).toBe(403);
      });
    });

    describe('when auth header passed', () => {
      beforeEach(async () => {
        authHeader = await buildAuthHeaderTestHelper(user);
      });

      test('return 200 response', async () => {
        const currentRequest = await destroyRequest().set(
          authHeader[0],
          authHeader[1],
        );

        expect(currentRequest.status).toBe(200);
      });
    });
  });
});
