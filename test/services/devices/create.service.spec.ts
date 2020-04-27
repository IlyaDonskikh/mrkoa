import { db, expect } from '../../setup';
import deviceFactory from '../../factories/user';
import CreateService from '../../../dist/services/device/create.service';

describe('Devices Services', () => {
  describe('Create', () => {
    function serviceCall(deviceAttrs: object) {
      const attrs = { db: db, attrs: deviceAttrs }

      return CreateService.call(attrs)
    }

    let deviceAttrs = {
      'externalId': 'a'
    }

    // index
    describe('#call', () => {
      it('success', (done) => {
        serviceCall(deviceAttrs).then((value) => {
          expect(value.isSuccess()).to.eq(true);

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
            expect(value.isFailed()).to.eq(true);

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

            expect(externalIdErrorsLength).to.eql(1);

            done();
          });
        });
      });
    });
  });
});
