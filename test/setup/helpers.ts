import * as app from '../../src/index';
const { db } = app.context;

const server = app.listen(3001);

if (db) {
  console.log('DB mode on');
}

export { server };
