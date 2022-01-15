import request from 'supertest';

import { schemas } from '../../../../../src/utils/schemas';
import { app } from '../../../../../src';
import { User } from '../../../../../src/models/user.model';
import { UserFactory } from '../../../../factories/user.factory';
import { components } from '../../../../../src/types/Api/openapi';

describe('Auth', () => {
  describe('Sessions Controller', () => {
    // create
    describe('#create', () => {
      test('return 200 response', async () => {
        const user = await UserFactory.create();
        const attrs = buildSessionsAttributes({ user });

        const currentRequest = await createRequest({ attrs });

        expect(currentRequest.status).toBe(200);
        expect(currentRequest.body).toMatchSchema(
          schemas.component.MrAuthSessionCreateResponse,
        );
      });

      test('return tokenJWT', async () => {
        const user = await UserFactory.create();
        const attrs = buildSessionsAttributes({ user });

        const currentRequest = await createRequest({ attrs });

        expect(currentRequest.body.item.tokenJWT).not.toBeUndefined();
      });

      describe('when email not passed', () => {
        test('return email error', async () => {
          const user = await UserFactory.create();
          const attrs = buildSessionsAttributes({ user });

          delete attrs.email;

          const currentRequest = await createRequest({ attrs });

          expect(currentRequest.body.errors.email).toContain(
            'Fill in the Email filed',
          );
        });
      });
    });
  });
});

// helpers
function createRequest({
  attrs,
}: {
  attrs: Partial<components['schemas']['MrAuthSessionCreateRequestSession']>;
}) {
  const path = '/api/v1/auth/sessions';

  return request(app.callback()).post(path).send({ session: attrs });
}

function buildSessionsAttributes({
  user,
  overrides,
}: {
  user: User;
  overrides?: Partial<
    components['schemas']['MrAuthSessionCreateRequestSession']
  >;
}): Partial<components['schemas']['MrAuthSessionCreateRequestSession']> {
  return {
    email: user.email,
    password: user.passwordConfirmation,
    ...overrides,
  };
}
