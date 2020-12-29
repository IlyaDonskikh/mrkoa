import { db } from '../src/models';

afterAll(async () => {
  db.sequelize.close();
});
