// The default test env is defined in the .mocharc.js

import * as chai from 'chai';
import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';
import * as app from '../dist/index';
import * as sessionFactory from './factories/user/session.factory';

import chaiHttp = require('chai-http');

const server = app.listen(3001);
const { db } = app.context;
const { expect } = chai;
const umzug = new Umzug({
  migrations: {
    path: './db/migrations',
    params: [
      db.sequelize.getQueryInterface(),
      Sequelize,
    ],
  },
  storage: new SequelizeStorage({ sequelize: db.sequelize }),
});


chai.use(chaiHttp);

before('Migrate db', async () => {
  await umzug.up();
});

beforeEach('Clean Database', async () => {
  const { models } = db.sequelize;

  const promises = Object.keys(models).map(async (modelKey: any) => {
    await models[modelKey].destroy({
      truncate: true, cascade: true,
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

export {
  request, expect, buildAuthHeaderBy,
};
