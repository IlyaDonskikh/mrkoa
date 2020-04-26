import { db, expect } from '../../setup';
import deviceFactory from '../../factories/user';
import ListService from '../../../dist/services/device/list.service';

describe('Devices Services', () => {
  describe('List', () => {
    // index
    describe('#call', () => {
      it('return status 200', (done) => {
        const service = new ListService(db);
        service.call().then((value) => {
          const { status } = value;

          expect(status).to.eq(200);

          done();
        });
      });

      it('return empty list of devices', (done) => {
        const service = new ListService(db);
        service.call().then((value) => {
          const { body } = value;

          expect(body.devices).to.eql([]);

          done();
        });
      });

      context('when one device exists', () => {
        beforeEach('Setup device', async () => {
          await deviceFactory();
        });

        it('return one device', (done) => {
          const service = new ListService(db);
          service.call().then((value) => {
            const expectedDeviceNumber = 1;
            const { body } = value;

            expect(body.devices.length).to.equal(expectedDeviceNumber);

            done();
          });
        });
      });
    });
  });
});
