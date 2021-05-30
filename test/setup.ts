import { matchers } from 'jest-json-schema';
import * as nock from 'nock';

import { sequelize } from '../src/models';

expect.extend(matchers);

beforeAll(async () => {
  setNockSettings();
});

afterAll(async () => {
  await sequelize.close();
});

// private

function setNockSettings() {
  nock.cleanAll();
  nock.disableNetConnect();
  nock.enableNetConnect('127.0.0.1');
}
