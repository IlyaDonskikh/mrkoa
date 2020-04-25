const { server, chai, expect } = require('../../../../setup');
const userFactory = require('../../../../factories/user');

describe("Devices Controller", () => {
  describe("#index", () => {
    let user;

    it("return 200 response", done => {
      const path = "/api/v1/panel/devices";

      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    context("when one user exists", () => {
      beforeEach('Setup', async function () {
        user = await userFactory();
      });

      it("device list include user", done => {
        const path = "/api/v1/panel/devices";

        chai
          .request(server)
          .get(path)
          .end((err, res) => {
            expect(res.body.devices[0].id).to.equal(user.id);
            done();
          });
      });
    });
  });
});
