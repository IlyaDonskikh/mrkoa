import { db, expect } from '../../setup';
import deviceFactory from '../../factories/user';
import CreateService from '../../../dist/services/device/create.service';

describe('Devices Services', () => {
  describe('Create', () => {
    // index
    describe('#call', () => {
      it('return status 200', (done) => {
        const deviceAttrs = {
          'externalId': 'a'
        }
        const attrs = { db: db, attrs: deviceAttrs }

        CreateService.call(attrs).then((value) => {
          const { status } = value;

          expect(status).to.eq(200);

          done();
        });
      });

      context('when deviceAttrs is empty object', () => {
        it('return status 422', (done) => {
          const deviceAttrs = {}
          const attrs = { db: db, attrs: deviceAttrs }

          CreateService.call(attrs).then((value) => {
            const { status } = value;

            expect(status).to.eq(422);

            done();
          });
        });
      });
    });
  });
});
