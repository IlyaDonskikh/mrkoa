import request from 'supertest';

import { buildAuthHeaderTestHelper } from '../../../../helpers';
import { app } from '../../../../../src';
import { UserFactory } from '../../../../factories/user.factory';

describe('Panel', () => {
  describe('Sessions Controller', () => {
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
          const user = await UserFactory.create();
          const authHeader = await buildAuthHeaderTestHelper(user);

          const currentRequest = await destroyRequest().set(...authHeader);

          expect(currentRequest.status).toBe(200);
        });
      });
    });
  });
});

// helpers

function destroyRequest() {
  const path = '/api/v1/panel/sessions';

  return request(app.callback()).delete(path);
}
