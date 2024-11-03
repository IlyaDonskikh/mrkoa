import { Sequelize } from 'sequelize';
import { UserSession } from './user/session.model';
import { User } from './user.model';
import 'dotenv/config';

const env = process.env.NODE_ENV as 'test' | 'production' | 'development';

// eslint-disable-next-line  @typescript-eslint/no-require-imports
const config = require('../../db/config.js')[env];

const models = [User, UserSession];

const sequelize = new Sequelize(config.url, config);

models.forEach((model) => {
  model.initModel(sequelize);
});

models.forEach((model) => {
  model.setupAssociations();
});

export { sequelize };
