import { db, expect } from '../../setup';
import * as deviceFactory from '../../factories/user';
import UpdateService from '../../../dist/services/device/update.service';

describe('Devices Services', () => {
  describe('Update', () => {
    function serviceCall(id: number, deviceAttrs: object) {
      const attrs = { id, attrs: deviceAttrs };

      return UpdateService.call(attrs);
    }

    let device;
    const externalData = { test: 'test' };
    const deviceAttrs: any = { externalId: 'a', externalData };

    beforeEach('Create device', async () => {
      device = await deviceFactory.create();
    });

    // index
    describe('#call', () => {
      it('success', (done) => {
        serviceCall(device.id, deviceAttrs).then((value) => {
          expect(value.isSuccess()).to.be.true;

          done();
        });
      });

      it('does not change externalId', async () => {
        const currentExternalId = device.externalId;

        await serviceCall(device.id, deviceAttrs)
        await device.reload()

        expect(device.externalId).to.be.eq(currentExternalId);
      });

      it('change externalData', async () => {
        await serviceCall(device.id, deviceAttrs)
        await device.reload()

        expect(device.externalData).to.be.eql(externalData);
      });

      context('when externalData not an object', () => {
        const externalData = 'a';

        beforeEach('change externalData', async () => {
          deviceAttrs.externalData = externalData;
        });

        it('fails', (done) => {
          serviceCall(device.id, deviceAttrs).then((value) => {
            expect(value.isFailed()).to.be.true;

            done();
          });
        });
      });

      context('when externalId is same', () => {
        it('success', (done) => {
          const deviceAttrs = { externalId: device.externalId };

          serviceCall(device.id, deviceAttrs).then((value) => {
            expect(value.isSuccess()).to.be.true;

            done();
          });
        });
      });
    });
  });
});
