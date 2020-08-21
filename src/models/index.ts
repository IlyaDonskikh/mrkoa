import { Sequelize } from 'sequelize';
import { glob } from 'glob';
import * as path from 'path';
import { DbInterface } from '../typings/db_interface';

require('dotenv').config();

const env = process.env.NODE_ENV;
const models: Array<any> = [];

const config = require('../../db/config.js')[env];

glob.sync(`${__dirname}/**/*.model.{js,ts}`).forEach((file) => {
  const model = require(path.resolve(file)); // eslint-disable-line
  models.push(model);
});

const createModels = (): DbInterface => {
  const sequelize = new Sequelize(config.url, config);

  models.forEach((model) => {
    model.initModel(sequelize);
  });

  models.forEach((model) => {
    model.setupAssociations();
  });

  const db: DbInterface = {
    sequelize,
    Sequelize,
  };

  return db;
};

export default createModels;
