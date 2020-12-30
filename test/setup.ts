import { sequelize } from '../src/models';

afterAll(async () => {
  sequelize.close();
});
