import * as request from 'supertest';

import { app } from '../../../../../src';
import { User } from '../../../../../src/models/user.model';
import * as userFactory from '../../../../factories/user.factory';
import { buildAuthHeaderTestHelper } from '../../../../helpers';

describe('Panel | Users Controller', () => {
  let user: User;
  let authHeader: string[];

  beforeEach(async () => {
    user = await userFactory.create();
    authHeader = await buildAuthHeaderTestHelper(user);
  });

  // index
  describe('#index', () => {
    const path = '/api/v1/panel/users';

    test('return 200 response', async () => {
      const currentRequest = await request(app.callback())
        .get(path)
        .set(authHeader[0], authHeader[1]);

      expect(currentRequest.status).toBe(200);
    });

    test('return users array', async () => {
      const currentRequest = await request(app.callback())
        .get(path)
        .set(authHeader[0], authHeader[1]);

      expect(currentRequest.body.users).toBeInstanceOf(Array);
    });

    test('return user in the array', async () => {
      const currentRequest = await request(app.callback())
        .get(path)
        .set(authHeader[0], authHeader[1]);

      const userIds = currentRequest.body.users.map((u: User) => u.id);

      expect(userIds).toContain(user.id);
    });
  });

  // create
  describe('#create', () => {
    function createRequest(path: string, itemAttrs: object) {
      return request(app.callback())
        .post(path)
        .set(authHeader[0], authHeader[1])
        .send({ user: itemAttrs });
    }

    const path = '/api/v1/panel/users';
    let itemAttrs: any;

    beforeEach(async () => {
      const userInstance = await userFactory.build();

      itemAttrs = userInstance.toJSON();
    });

    test('return 200 response', async () => {
      const currentRequest = await createRequest(path, itemAttrs);

      expect(currentRequest.status).toBe(200);
    });

    test('return user', async () => {
      const currentRequest = await createRequest(path, itemAttrs);

      expect(currentRequest.body.user).toMatchObject({
        id: expect.any(Number),
        email: itemAttrs.email,
      });
    });

    describe('when email not passed', () => {
      beforeEach(async () => {
        delete itemAttrs.password;
        delete itemAttrs.email;
      });

      test('return status 403', async () => {
        const currentRequest = await createRequest(path, itemAttrs);

        expect(currentRequest.status).toBe(422);
      });

      test('return email error', async () => {
        const currentRequest = await createRequest(path, itemAttrs);

        expect(currentRequest.body.errors.email).toContain('fill in the filed');
      });
    });
  });
});
