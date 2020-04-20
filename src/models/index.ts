import { Sequelize } from 'sequelize';
import { DbInterface } from '../typings/db_interface';
import { initDevice } from './device';

export const createModels = (): DbInterface => {
  const env = process.env.NODE_ENV || 'development';
  const config = require('../../db/config.json')[env];
  const sequelize = new Sequelize(config.database, config.username, config.password, config);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Device: initDevice(sequelize)
  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};

