import { db, expect } from '../../setup';
import * as deviceFactory from '../../factories/user';
import UpdateService from '../../../dist/services/device/update.service';

describe('Devices Services', () => {
  describe('Update', () => {
    function serviceCall(id: number, deviceAttrs: object) {
      const attrs = { id: id, attrs: deviceAttrs }

      return UpdateService.call(attrs)
    }

    let device;
    let externalData = { test: 'test'}
    let deviceAttrs: any = { externalId: 'a', externalData: externalData }

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

      it('does not change externalId', (done) => {
        serviceCall(device.id, deviceAttrs).then((value) => {
          device.reload().then((value) => {
            expect(value.externalId).to.be.eq(device.externalId);

            done();
          });
        });
      });

      it('change externalData', (done) => {
        serviceCall(device.id, deviceAttrs).then((value) => {
          device.reload().then((value) => {
            expect(value.externalData).to.be.eql(externalData);

            done();
          });
        });
      });

      context('when externalData not an object', () => {
        let externalData = 'a';

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
          let deviceAttrs = { 'externalId': device.externalId }

          serviceCall(device.id, deviceAttrs).then((value) => {
            expect(value.isSuccess()).to.be.true;

            done();
          });
        });
      });
    });
  });
});
