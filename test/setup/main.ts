import * as app from '../../src/index';

const { db } = app.context;

beforeAll(async () => {
  const { models } = db.sequelize;
  // const transaction = await db.sequelize.transaction();
  // try {
  //   Object.keys(models).forEach(async (modelKey: any) => {
  //     await models[modelKey].destroy(
  //       {
  //         truncate: true,
  //         cascade: true,
  //       },
  //       { transaction },
  //     );
  //   });
  //   await transaction.commit();
  // } catch (error) {
  //   await transaction.rollback();
  // }
});

afterAll(async () => {
  db.sequelize.close();
});
