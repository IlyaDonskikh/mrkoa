const { server, chai, expect } = require('../../../../setup');
const deviceFactory = require('../../../../factories/user');

describe("Devices Controller", () => {

  // index
  describe("#index", () => {
    const path = "/api/v1/panel/devices";

    it("return 200 response", done => {
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("return empty devices list", done => {
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          expect(res.body.devices).to.eql([]);
          done();
        });
    });

    context("when one device exists", () => {
      let device;

      beforeEach('Setup device', async function () {
        device = await deviceFactory();
      });

      it("return device list include device", done => {
        chai
          .request(server)
          .get(path)
          .end((err, res) => {
            expect(res.body.devices[0].id).to.equal(device.id);
            done();
          });
      });
    });
  });
});
