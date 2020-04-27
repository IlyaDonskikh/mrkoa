import { server, chai, expect } from '../../../../setup';
import deviceFactory from '../../../../factories/user';

describe('Devices Controller', () => {
  // index
  describe('#index', () => {
    const path = '/api/v1/panel/devices';

    it('return 200 response', (done) => {
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('return empty devices list', (done) => {
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          expect(res.body.devices).to.eql([]);
          done();
        });
    });
  });

  // show
  describe('#show', () => {
    context('when one device exists', () => {
      let device;
      let path;

      beforeEach('Setup device', async () => {
        device = await deviceFactory();
      });

      beforeEach('Setup path', () => {
        path = '/api/v1/panel/devices/' + device.id;
      });

      it('return 200 response', (done) => {
        chai
          .request(server)
          .get(path)
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
      let path = '/api/v1/panel/devices';
      let deviceAttrs = { externalId: 'test' }

      it('return 200 response', (done) => {
        chai
          .request(server)
          .post(path)
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
          chai
            .request(server)
            .post(path)
            .send({ device: deviceAttrs })
            .end((err, res) => {
              expect(res).to.have.status(422);
              done();
            });
        });
      });
    });
  });
});
