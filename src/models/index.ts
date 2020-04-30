import { Sequelize } from 'sequelize';
import { DbInterface } from '../typings/db_interface';
import { initModel } from './device.model';
import { glob } from 'glob';
import * as path from 'path';

require('dotenv').config();

const env = process.env.NODE_ENV;
const config = require('../../db/config.json')[env];

const createModels = (): DbInterface => {
  const sequelize = new Sequelize(config.database, config.username, config.password, config);

  glob.sync(__dirname + '/**/*.model.js').forEach((file) => {
    require(path.resolve(file)).initModel(sequelize)
  });

  const db: DbInterface = {
    sequelize,
    Sequelize,
  };

  return db;
};

export default createModels;
