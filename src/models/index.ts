import { Sequelize } from 'sequelize';
import { DbInterface } from '../typings/db_interface';
import initDevice from './device.model';

require('dotenv').config();

const env = process.env.NODE_ENV;
const config = require('../../db/config.json')[env];

const createModels = (): DbInterface => {
  const sequelize = new Sequelize(config.database, config.username, config.password, config);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Device: initDevice(sequelize),
  };

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};

export default createModels;
