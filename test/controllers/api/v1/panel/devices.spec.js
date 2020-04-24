const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../../../../../dist/index');
const server = app.listen(3001)
const expect = chai.expect;

chai.use(chaiHttp);

describe("Devices Controller", () => {
  after(() => {
    server.close();
  });

  it("return 200 response", done => {
    console.log(app)

    chai
      .request(server)
      .get("/api/v1/panel/devices")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
