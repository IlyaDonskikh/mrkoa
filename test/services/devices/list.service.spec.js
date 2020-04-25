const { db, expect } = require('../../setup');
const deviceFactory = require('../../factories/user');
const ListService = require('../../../dist/services/devices/list_service');

describe("Devices List Service", () => {

  // index
  describe("#call", () => {
    it("return status 200", done => {
      const service = new ListService.default(db);
      service.call().then(function(value) {
        const { status } = value;

        expect(status).to.eq(200)

        done()
      });
    });

    it("return empty list of devices", done => {
      const service = new ListService.default(db);
      service.call().then( (value) => {
        const { body } = value;

        expect(body.devices).to.eql([])

        done()
      });
    });

    context("when one device exists", () => {
      beforeEach('Setup device', async () => {
        await deviceFactory();
      });

      it("return one device", done => {
        const service = new ListService.default(db);
        service.call().then(function(value) {
          const expectedDeviceNumber = 1
          const { body } = value;

          expect(body.devices.length).to.equal(expectedDeviceNumber)

          done()
        });
      });
    });
  });
});
