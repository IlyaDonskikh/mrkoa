// The default test env is defined in the .mocharc.js

import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as app from '../dist/index';

import chaiHttp = require('chai-http');

const server = app.listen(3001);
const { db } = app.context;
const { expect } = chai;

chai.use(chaiHttp);

beforeEach('Clean Database', async () => db.sequelize.sync({ force: true })); // Upd to migrations

after(async () => {
  server.close();
});

function buildAuthHeaderBy(user) {
  const secret = process.env.NODE_APP_TOKEN;
  const token = jwt.sign({ userToken: user.token }, secret);

  return ['Authorization', `Bearer ${token}`];
}

function buildGatewayParticleAuthHeader() {
  return ['Authorization', `Bearer ${process.env.NODE_APP_GATEWAY_PARTICLE_TOKEN}`];
}

function request() {
  return chai.request(server);
}

export {
  request, expect, buildAuthHeaderBy, buildGatewayParticleAuthHeader,
};
