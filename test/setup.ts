// The default test env is defined in the .mocharc.js

import * as chai from 'chai';
import * as sessionFactory from './factories/user/session.factory';

import chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

async function buildAuthTokenBy(user: any): Promise<string> {
  const session: any = await sessionFactory.create({ userId: user.id });

  return session.tokenJWT;
}

async function buildAuthHeaderBy(user: any): Promise<string[]> {
  const token: string = await buildAuthTokenBy(user);

  return ['Authorization', `Bearer ${token}`];
}

export { expect, buildAuthHeaderBy };
