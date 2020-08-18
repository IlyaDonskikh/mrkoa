import * as userFactory from '../../../../factories/user.factory';
import { buildAuthHeaderBy, expect, request } from '../../../../setup';

describe('Panel | Users Controller', () => {
  let user;
  let authHeader: string[];

  beforeEach('Setup user', async () => {
    user = await userFactory.create();
  });

  beforeEach('Setup authHeader', async () => {
    authHeader = await buildAuthHeaderBy(user);
  });

  // index
  describe('#index', () => {
    const path = '/api/v1/panel/users';

    it('return 200 response', async () => {
      const currentRequest = await request()
        .get(path)
        .set(authHeader[0], authHeader[1]);

      expect(currentRequest).to.have.status(200);
    });

    it('return users array', async () => {
      const currentRequest = await request()
        .get(path)
        .set(authHeader[0], authHeader[1]);

      expect(currentRequest.body.users).to.be.an('array');
    });

    it('return one user in array', async () => {
      const currentRequest = await request()
        .get(path)
        .set(authHeader[0], authHeader[1]);

      expect(currentRequest.body.users.length).to.be.eq(1);
    });
  });

  // create
  describe('#create', () => {
    function createRequest(path: string, itemAttrs: object) {
      return request()
        .post(path)
        .set(authHeader[0], authHeader[1])
        .send({ user: itemAttrs });
    }

    const path = '/api/v1/panel/users';
    let itemAttrs;

    beforeEach('Setup attrs', async () => {
      const userInstance = await userFactory.build();

      itemAttrs = userInstance.toJSON();
    });

    it('return 200 response', async () => {
      const currentRequest = await createRequest(path, itemAttrs);

      expect(currentRequest).to.have.status(200);
    });

    it('return user', async () => {
      const currentRequest = await createRequest(path, itemAttrs);

      expect(currentRequest.body.user).to.have.any.keys('id', 'email');
    });
  });
});
