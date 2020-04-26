import { db, expect } from '../../setup';
import deviceFactory from '../../factories/user';
import CreateService from '../../../dist/services/device/create.service';

describe('Devices Services', () => {
  describe('List', () => {
    // index
    describe('#call', () => {
      it('return status 200', (done) => {
        const attrs = {
          'externalId': 'a'
        }

        const service = new CreateService(db, attrs);
        service.call().then((value) => {
          const { status } = value;

          expect(status).to.eq(200);

          done();
        });
      });

      context('when attrs is empty object', () => {
        it('return status 422', (done) => {
          const attrs = {}

          const service = new CreateService(db, attrs);
          service.call().then((value) => {
            const { status } = value;

            expect(status).to.eq(422);

            done();
          });
        });
      });
    });
  });
});
