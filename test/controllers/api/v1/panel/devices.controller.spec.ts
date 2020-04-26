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
});
