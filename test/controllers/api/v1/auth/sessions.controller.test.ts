import * as request from 'supertest';

import { buildAuthHeaderTestHelper } from '../../../../helpers';
import { app } from '../../../../../src';
import * as userFactory from '../../../../factories/user.factory';
import { User } from '../../../../../src/models/user.model';

describe('Auth', () => {
  describe('Sessions Controller', () => {
    // create
    describe('#create', () => {
      test('return 200 response', async () => {
        const user = await userFactory.create();
        const attrs = buildSessionsAttributes({ user });

        const currentRequest = await createRequest({ attrs });

        expect(currentRequest.status).toBe(200);
      });

      test('return tokenJWT', async () => {
        const user = await userFactory.create();
        const attrs = buildSessionsAttributes({ user });

        const currentRequest = await createRequest({ attrs });

        expect(currentRequest.body.item.tokenJWT).not.toBeUndefined();
      });

      describe('when email not passed', () => {
        test('return email error', async () => {
          const user = await userFactory.create();
          const attrs = buildSessionsAttributes({ user });

          delete attrs.email;

          const currentRequest = await createRequest({ attrs });

          expect(currentRequest.body.errors.email).toContain(
            'Fill in the Email filed',
          );
        });
      });
    });

    // destroy
    describe('#destroy', () => {
      describe('when auth header not passed', () => {
        test('return 403 response', async () => {
          const currentRequest = await destroyRequest();

          expect(currentRequest.status).toBe(403);
        });
      });

      describe('when auth header passed', () => {
        test('return 200 response', async () => {
          const user = await userFactory.create();
          const authHeader = await buildAuthHeaderTestHelper(user);

          const currentRequest = await destroyRequest().set(...authHeader);

          expect(currentRequest.status).toBe(200);
        });
      });
    });
  });
});

// helpers

function createRequest({
  attrs,
}: {
  attrs: Partial<Api.MrAuthSessionCreateRequestSession>;
}) {
  const path = '/api/v1/auth/sessions';

  return request(app.callback()).post(path).send({ session: attrs });
}

function buildSessionsAttributes({
  user,
  overrides,
}: {
  user: User;
  overrides?: Partial<Api.MrAuthSessionCreateRequestSession>;
}): Partial<Api.MrAuthSessionCreateRequestSession> {
  return {
    email: user.email,
    password: user.passwordConfirmation,
    ...overrides,
  };
}

function destroyRequest() {
  const path = '/api/v1/auth/session';

  return request(app.callback()).delete(path);
}
