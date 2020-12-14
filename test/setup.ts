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
  const { models } = db.sequelize;
  const transaction = await db.sequelize.transaction();

  // TODO: Truncate all tables in one request based on table_names

  try {
    Object.keys(models).forEach(async (modelKey: any) => {
      await models[modelKey].destroy(
        {
          truncate: true,
          cascade: true,
        },
        { transaction },
      );
    });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
  }
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
