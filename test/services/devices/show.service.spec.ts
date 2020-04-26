import { db, expect } from '../../setup';
import deviceFactory from '../../factories/user';
import ShowDevice from '../../../dist/services/device/show.service';

describe('Devices Services', () => {
  describe('Show', () => {
    // index
    describe('#call', () => {
      it('return status 404', (done) => {
        ShowDevice.call({ db: db, id: 0 }).then((value) => {
          const { status } = value;

          expect(status).to.eq(404);

          done();
        });
      });

      context('when one device exists', () => {
        let device;

        beforeEach('Setup device', async () => {
          device = await deviceFactory();
        });

        it('return device', (done) => {
          ShowDevice.call({ db: db, id: device.id }).then((value) => {
            const { status } = value;

            expect(status).to.eq(200);

            done();
          });
        });

        it('return device into the body', (done) => {
          ShowDevice.call({ db: db, id: device.id }).then((value) => {
            const { body } = value;

            expect(body.device.id).to.eq(device.id);

            done();
          });
        });
      });
    });
  });
});
