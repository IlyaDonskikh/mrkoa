import {
  request, expect, buildAuthHeaderBy,
} from '../../../../setup';
import * as deviceFactory from '../../../../factories/device.factory';
import * as userFactory from '../../../../factories/user.factory';

describe('Devices Controller', () => {
  let user;
  let authHeader: string[];

  beforeEach('Setup device', async () => {
    user = await userFactory.create();
  });

  beforeEach('Setup authHeader', async () => {
    authHeader = buildAuthHeaderBy(user);
  });

  // index
  describe('#index', () => {
    const path = '/api/v1/panel/devices';

    context('when auth header not passed', () => {
      it('return 403 response', (done) => {
        request()
          .get(path)
          .end((err, res) => {
            expect(res).to.have.status(403);
            done();
          });
      });
    });

    context('when auth header passed', () => {
      it('return 200 response', (done) => {
        request()
          .get(path)
          .set(authHeader[0], authHeader[1])
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('return empty devices list', (done) => {
        request()
          .get(path)
          .set(authHeader[0], authHeader[1])
          .end((err, res) => {
            expect(res.body.devices).to.eql([]);
            done();
          });
      });
    });
  });

  // show
  describe('#show', () => {
    context('when one device exists', () => {
      let device;
      let path;

      beforeEach('Setup device', async () => {
        device = await deviceFactory.create();
      });

      beforeEach('Setup path', () => {
        path = `/api/v1/panel/devices/${device.id}`;
      });

      it('return 200 response', (done) => {
        request()
          .get(path)
          .set(authHeader[0], authHeader[1])
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });

  // create
  describe('#create', () => {
    function createRequest(path: string, deviceAttrs: object) {
      return request()
        .post(path)
        .set(authHeader[0], authHeader[1])
        .send({ device: deviceAttrs });
    }

    context('when one device exists', () => {
      const path = '/api/v1/panel/devices';
      const deviceAttrs = { externalId: 'test' };

      it('return 200 response', (done) => {
        createRequest(path, deviceAttrs)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('return device', (done) => {
        createRequest(path, deviceAttrs)
          .end((err, res) => {
            expect(res.body.device).to.have.any.keys('id', 'externalId');
            done();
          });
      });

      context('when deviceAttrs not contains externalId', () => {
        beforeEach('Clean Database', () => {
          delete deviceAttrs.externalId;
        });

        it('return 422 response', (done) => {
          createRequest(path, deviceAttrs)
            .end((err, res) => {
              expect(res).to.have.status(422);
              done();
            });
        });
      });
    });
  });

  // Update
  describe('#update', () => {
    context('when one device exists', () => {
      let path: string;
      let device: any;
      const deviceAttrs = { externalDate: { test: 'test' } };

      beforeEach('Create device', async () => {
        device = await deviceFactory.create();
      });

      beforeEach('Build path', () => {
        path = `/api/v1/panel/devices/${device.id}`;
      });

      it('return 200 response', (done) => {
        request()
          .put(path)
          .set(authHeader[0], authHeader[1])
          .send({ device: deviceAttrs })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
});
