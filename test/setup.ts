// The default test env is defined in the .mocharc.js

import * as chai from 'chai';
import { Sequelize } from 'sequelize';
import * as app from '../src/index';
import * as sessionFactory from './factories/user/session.factory';

import chaiHttp = require('chai-http');

const server = app.listen(3001);
const { db } = app.context;
const { expect } = chai;

chai.use(chaiHttp);

beforeEach('Clean Database', async () => {
  // As alternative we can use sequelize.sync({ force: true })
  // It removes umzug and sequelize.drop() logic above, but
  // data structure will be based on models, not real db structure.

  const { models } = db.sequelize;

  // TODO: Truncate all tables in one request based on table_names

  const promises = Object.keys(models).map(async (modelKey: any) => {
    await models[modelKey].destroy({
      truncate: true,
      cascade: true,
    });
  });

  await Promise.all(promises);
});

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

export { request, expect, buildAuthHeaderBy };
