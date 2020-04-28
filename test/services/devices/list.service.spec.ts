import { db, expect } from '../../setup';
import deviceFactory from '../../factories/user';
import ListService from '../../../dist/services/device/list.service';

describe('Devices Services', () => {
  describe('List', () => {
    // index
    describe('#call', () => {
      it('success', (done) => {
        ListService.call().then((value) => {
          expect(value.isSuccess()).to.be.true;

          done();
        });
      });

      it('return empty list of devices', (done) => {
        ListService.call().then((value) => {
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
          ListService.call().then((value) => {
            const expectedDeviceNumber = 1;
            const { body } = value;

            expect(body.devices.length).to.equal(expectedDeviceNumber);

            done();
          });
        });

        context('when second page', () => {
          it('return empty list of devices', (done) => {
            const page = 2

            ListService.call({ page: page }).then((value) => {
              const { body } = value;

              expect(body.devices).to.eql([]);

              done();
            });
          });
        });
      });
    });
  });
});
