/* eslint-disable no-unused-expressions */

import { expect } from '../../setup';
import * as deviceFactory from '../../factories/device';
import * as deviceEventFactory from '../../factories/device.event';
import ListService from '../../../dist/services/device_event/list.service';

describe('Device Events Services', () => {
  describe('List', () => {
    let device;
    let deviceEvent;

    beforeEach('Setup device', async () => {
      device = await deviceFactory.create();
    });

    beforeEach('Setup device event', async () => {
      device = await deviceEventFactory.create({ deviceId: device.id });
    });

    describe('#call', () => {
      it('success', (done) => {
        ListService.call().then((value) => {
          expect(value.isSuccess()).to.be.true;

          done();
        });
      });

      context('when filters passed', () => {
        let filters;

        beforeEach('Setup device event', async () => {
          filters = {};
        });

        context('when filterByDeviceId passed', () => {
          beforeEach('Setup device event', async () => {
            filters = { filterByDeviceId: device.id };
          });

          it('success', (done) => {
            ListService.call({ filters }).then((value) => {
              expect(value.isSuccess()).to.be.true;

              done();
            });
          });

          it('return one device event', (done) => {
            ListService.call({ filters }).then((value) => {
              const expectedDeviceNumber = 1;
              const { body } = value;

              expect(body.deviceEvents.length).to.equal(expectedDeviceNumber);

              done();
            });
          });

          context('when device with filter id does not exists', () => {
            beforeEach('Setup device event', async () => {
              filters = { filterByDeviceId: 0 };
            });

            it('success', (done) => {
              ListService.call({ filters }).then((value) => {
                expect(value.isSuccess()).to.be.true;

                done();
              });
            });

            it('return zero device events', (done) => {
              ListService.call({ filters }).then((value) => {
                const expectedDeviceNumber = 0;
                const { body } = value;

                expect(body.deviceEvents.length).to.equal(expectedDeviceNumber);

                done();
              });
            });
          });
        });
      });
    });
  });
});
