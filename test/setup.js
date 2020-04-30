process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../dist/index');

const server = app.listen(3001);
const { db } = app.context;
const { expect } = chai;

chai.use(chaiHttp);

beforeEach('Clean Database', () => db.sequelize.sync({ force: true })); // Upd to migrations

after(async () => {
  server.close();
});

function signIn(chai, method, path) {
  const token = process.env.NODE_APP_TOKEN;
  const request =
    chai.request(server)
        [method](path)
        .set('Authorization', 'Bearer ' + token);

  return request;
}

module.exports = {
  server, chai, expect, db, signIn,
};
