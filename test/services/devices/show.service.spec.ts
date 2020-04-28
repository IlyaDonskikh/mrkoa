import { db, expect } from '../../setup';
import deviceFactory from '../../factories/user';
import ShowDevice from '../../../dist/services/device/show.service';

describe('Devices Services', () => {
  describe('Show', () => {
    // index
    describe('#call', () => {
      it('return notFound as true', (done) => {
        ShowDevice.call({ id: 0 }).then((value) => {
          const { notFound } = value;

          expect(notFound).to.be.true;

          done();
        });
      });

      context('when one device exists', () => {
        let device;

        beforeEach('Setup device', async () => {
          device = await deviceFactory();
        });

        it('success', (done) => {
          ShowDevice.call({ id: device.id }).then((value) => {
            expect(value.isSuccess()).to.be.true;

            done();
          });
        });

        it('return device into the body', (done) => {
          ShowDevice.call({ id: device.id }).then((value) => {
            const { body } = value;

            expect(body.device.id).to.eq(device.id);

            done();
          });
        });
      });
    });
  });
});
