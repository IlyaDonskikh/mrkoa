process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../dist/index');
const jwt = require('jsonwebtoken');
const server = app.listen(3001);
const { db } = app.context;
const { expect } = chai;

chai.use(chaiHttp);

beforeEach('Clean Database', () => db.sequelize.sync({ force: true })); // Upd to migrations

after(async () => {
  server.close();
});

function buildAuthHeaderBy(user) {
  // Add user flow

  const secret = process.env.NODE_APP_TOKEN;
  const token = jwt.sign({ userToken: user.token }, secret);

  return ['Authorization', `Bearer ${token}`];
}

function request() {
  return chai.request(server);
}

module.exports = {
  request, expect, buildAuthHeaderBy,
};
