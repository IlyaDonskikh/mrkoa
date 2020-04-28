import { db, expect } from '../../setup';
import * as deviceFactory from '../../factories/user';
import CreateService from '../../../dist/services/device/create.service';

describe('Devices Services', () => {
  describe('Create', () => {
    function serviceCall(deviceAttrs: object) {
      const attrs = { attrs: deviceAttrs };

      return CreateService.call(attrs);
    }

    const deviceAttrs = { externalId: 'a' };

    // index
    describe('#call', () => {
      it('success', (done) => {
        serviceCall(deviceAttrs).then((value) => {
          expect(value.isSuccess()).to.be.true;

          done();
        });
      });

      it('return empty errors', (done) => {
        serviceCall(deviceAttrs).then((value) => {
          expect(value.errors.errors).to.eql({});

          done();
        });
      });

      context('when deviceAttrs not contains externalId', () => {
        beforeEach('Clean Database', () => {
          delete deviceAttrs.externalId;
        });

        it('failed', (done) => {
          serviceCall(deviceAttrs).then((value) => {
            expect(value.isFailed()).to.be.true;

            done();
          });
        });

        it('return errors', (done) => {
          serviceCall(deviceAttrs).then((value) => {
            expect(value.errors.errors).not.to.eql({});

            done();
          });
        });

        it('return externalId error', (done) => {
          serviceCall(deviceAttrs).then((value) => {
            const externalIdErrorsLength = value.errors.errors.externalId.length;

            expect(externalIdErrorsLength).to.be.eq(1);

            done();
          });
        });
      });

      context('when device with same externalId exists', () => {
        let device;

        beforeEach('Create device', async () => {
          device = await deviceFactory.create();
        });

        beforeEach('Update externalId attribute', () => {
          deviceAttrs.externalId = device.externalId;
        });

        it('failed', (done) => {
          serviceCall(deviceAttrs).then((value) => {
            expect(value.isFailed()).to.be.true;

            done();
          });
        });

        it('return externalId uniq error', (done) => {
          serviceCall(deviceAttrs).then((value) => {
            const externalIdErrors = value.errors.errors.externalId;

            expect(externalIdErrors).to.include('uniq');

            done();
          });
        });
      });
    });
  });
});
