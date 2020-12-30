import { sequelize } from '../src/models';
import * as nock from 'nock';

beforeAll(async () => {
  nock.cleanAll();
  nock.disableNetConnect();
});

afterAll(async () => {
  await sequelize.close();
});
