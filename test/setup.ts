import { sequelize } from '../src/models';
import * as nock from 'nock';

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
