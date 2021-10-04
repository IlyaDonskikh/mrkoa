import request from 'supertest';

import { app } from '../../../../../src';
import { User } from '../../../../../src/models/user.model';
import { schemas } from '../../../../../src/utils/schemas';
import { UserFactory } from '../../../../factories/user.factory';
import { buildAuthHeaderTestHelper } from '../../../../helpers';

describe('Panel', () => {
  describe('Users Controller', () => {
    // index
    describe('#index', () => {
      test('return 200 response', async () => {
        const { authHeader } = await buildUserWithAuthHeader();

        const currentRequest = await indexRequest(authHeader);

        expect(currentRequest.status).toBe(200);
        expect(currentRequest.body).toMatchSchema(
          schemas.MrPanelUserIndexResponse,
        );
        expect(currentRequest.body.items).not.toHaveLength(0);
      });
    });

    // create
    describe('#create', () => {
      test('return 200 response', async () => {
        const { authHeader } = await buildUserWithAuthHeader();
        const itemAttrs = buildUserAttributes();

        const currentRequest = await createRequest(itemAttrs, authHeader);

        expect(currentRequest.status).toBe(200);
        expect(currentRequest.body).toMatchSchema(
          schemas.MrPanelUserCreateResponse,
        );
      });

      test('return user', async () => {
        const { authHeader } = await buildUserWithAuthHeader();
        const itemAttrs = buildUserAttributes();

        const currentRequest = await createRequest(itemAttrs, authHeader);

        expect(currentRequest.body.item).toMatchObject({
          id: expect.any(Number),
          email: itemAttrs.email,
        });
      });

      describe('when email not passed', () => {
        test('return error', async () => {
          const { authHeader } = await buildUserWithAuthHeader();
          const itemAttrs = buildUserAttributes({
            overrides: { email: undefined },
          });

          const currentRequest = await createRequest(itemAttrs, authHeader);

          expect(currentRequest.status).toBe(422);
          expect(currentRequest.body.errors.email).toContain(
            'Fill in the Email filed',
          );
        });
      });
    });
  });
});

// helpers
async function buildUserWithAuthHeader({ user }: { user?: User } = {}) {
  let currentUser: User | undefined = user;

  if (!currentUser) {
    currentUser = await UserFactory.create();
  }

  const authHeader = await buildAuthHeaderTestHelper(currentUser);

  return { user: currentUser, authHeader };
}

function indexRequest(authHeader: [string, string]) {
  const path = '/api/v1/panel/users';

  return request(app.callback())
    .get(path)
    .set(...authHeader);
}

function createRequest(
  itemAttrs: Partial<Api.MrPanelUserCreateRequestUser>,
  authHeader: [string, string],
) {
  const path = '/api/v1/panel/users';

  return request(app.callback())
    .post(path)
    .set(...authHeader)
    .send({ user: itemAttrs });
}

function buildUserAttributes({
  overrides,
}: {
  overrides?: Partial<Api.MrPanelUserCreateRequestUser>;
} = {}): Partial<Api.MrPanelUserCreateRequestUser> {
  const user = UserFactory.build({ ...overrides });

  return {
    email: user.email,
    password: user.password,
    passwordConfirmation: user.passwordConfirmation,
    ...overrides,
  };
}
