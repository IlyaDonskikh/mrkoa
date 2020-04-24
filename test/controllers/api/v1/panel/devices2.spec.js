const { server, chai, expect } = require('../../../../setup');

describe("Devices Controller", () => {
  after(() => {
    server.close();
  });

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
});
