// The default test env is defined in the .mocharc.js

import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as app from '../dist/index';
import * as sessionFactory from './factories/user/session.factory';

import chaiHttp = require('chai-http');

const server = app.listen(3001);
const { db } = app.context;
const { expect } = chai;

chai.use(chaiHttp);

beforeEach('Clean Database', async () => db.sequelize.sync({ force: true })); // Upd to migrations

after(async () => {
  server.close();
});

async function buildAuthTokenBy(user: any): Promise<string> {
  const session: any = await sessionFactory.create({ userId: user.id });

  return session.tokenJWT;
}

async function buildAuthHeaderBy(user: any): Promise<string[]> {
  const token: string = await buildAuthTokenBy(user);

  return ['Authorization', `Bearer ${token}`];
}

function request() {
  return chai.request(server);
}

export {
  request, expect, buildAuthHeaderBy,
};
