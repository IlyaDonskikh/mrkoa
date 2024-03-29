import request from 'supertest';

import { app } from '../../../../../src';
import { User } from '../../../../../src/models/user.model';
import { components } from '../../../../../src/types/api';
import { schemas } from '../../../../../src/utils/schemas';
import { UserFactory } from '../../../../factories/user.factory';
import { buildAuthHeaderTestHelper } from '../../../../helpers';

describe('Panel', () => {
  describe('Users Controller', () => {
    // index
    describe('#index', () => {
      test('return 200 response', async () => {
        const { authHeader } = await buildUserWithAuthHeader();

        const currentRequest = await indexRequest({ authHeader });

        expect(currentRequest.status).toBe(200);
        expect(currentRequest.body).toMatchSchema(
          schemas.component.MrPanelUserIndexResponse,
        );
        expect(currentRequest.body.items).not.toHaveLength(0);
      });

      describe('when page filter passed in wrong format', () => {
        test('return page error', async () => {
          const { authHeader } = await buildUserWithAuthHeader();

          const currentRequest = await indexRequest({
            authHeader,
            query: { page: 18.2 },
          });

          expect(currentRequest.status).toBe(422);
          expect(currentRequest.body.errors.page).toContain(
            'Set the Page parameter as an integer',
          );
        });
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
          schemas.component.MrPanelUserCreateResponse,
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

function indexRequest({
  authHeader,
  query,
}: {
  authHeader: [string, string];
  query?: Record<string, any>;
}) {
  const path = '/api/v1/panel/users';

  return request(app.callback())
    .get(path)
    .query(query || {})
    .set(...authHeader);
}

function createRequest(
  itemAttrs: Partial<components['schemas']['MrPanelUserCreateRequestUser']>,
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
  overrides?: Partial<components['schemas']['MrPanelUserCreateRequestUser']>;
} = {}): Partial<components['schemas']['MrPanelUserCreateRequestUser']> {
  const user = UserFactory.build({ ...overrides });

  return {
    email: user.email,
    password: user.password,
    passwordConfirmation: user.passwordConfirmation,
    ...overrides,
  };
}
