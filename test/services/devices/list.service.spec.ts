import { db, expect } from '../../setup';
import deviceFactory from '../../factories/user';
import ListService from '../../../dist/services/device/list.service';

describe('Devices Services', () => {
  describe('List', () => {
    // index
    describe('#call', () => {
      it('return status 200', (done) => {
        ListService.call({ db: db }).then((value) => {
          const { status } = value;

          expect(status).to.eq(200);

          done();
        });
      });

      it('return empty list of devices', (done) => {
        ListService.call({ db: db }).then((value) => {
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
          ListService.call({ db: db }).then((value) => {
            const expectedDeviceNumber = 1;
            const { body } = value;

            expect(body.devices.length).to.equal(expectedDeviceNumber);

            done();
          });
        });

        context('when second page', () => {
          it('return empty list of devices', (done) => {
            const page = 2

            ListService.call({ db: db, page: page }).then((value) => {
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
