import {
  server, chai, expect, signIn,
} from '../../../../setup';
import * as deviceFactory from '../../../../factories/device';

let request;

describe('Devices Controller', () => {
  // index
  describe('#index', () => {
    let path;

    beforeEach('Setup path', () => {
      path = '/api/v1/panel/devices';
    });

    context('when user not signed in', () => {
      it('return 422 response', (done) => {
        chai.request(server)
          .get(path)
          .end((err, res) => {
            expect(res).to.have.status(422);
            done();
          });
      });
    });

    context('when user signed in', () => {
      beforeEach('Sign in and setup request path', async () => {
        request = signIn(chai, 'get', path);
      });

      it('return 200 response', (done) => {
        request
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('return empty devices list', (done) => {
        request
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

      beforeEach('Sign in and setup request path', async () => {
        request = signIn(chai, 'get', path);
      });

      it('return 200 response', (done) => {
        request
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });

  // create
  describe('#create', () => {
    context('when one device exists', () => {
      const path = '/api/v1/panel/devices';
      const deviceAttrs = { externalId: 'test' };

      beforeEach('Sign in and setup request path', async () => {
        request = signIn(chai, 'post', path);
      });

      it('return 200 response', (done) => {
        request
          .send({ device: deviceAttrs })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      context('when deviceAttrs not contains externalId', () => {
        beforeEach('Clean Database', () => {
          delete deviceAttrs.externalId;
        });

        it('return 422 response', (done) => {
          request
            .send({ device: deviceAttrs })
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
      let path;
      let device;
      const deviceAttrs = { externalDate: { test: 'test' } };

      beforeEach('Create device', async () => {
        device = await deviceFactory.create();
      });

      beforeEach('Build path', () => {
        path = `/api/v1/panel/devices/${device.id}`;
      });

      beforeEach('Sign in and setup request path', async () => {
        request = signIn(chai, 'put', path);
      });

      it('return 200 response', (done) => {
        request
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
});
