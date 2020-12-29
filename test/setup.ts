import * as app from '../src/index';

const { db } = app.context;

afterAll(async () => {
  db.sequelize.close();
});
