import { Sequelize } from 'sequelize';
import { UserSession } from './user/session.model';
import { User } from './user.model';

import 'dotenv/config';
import DBConfig from '../../db/config';

const env = process.env.NODE_ENV as 'test' | 'production' | 'development';
const config = DBConfig[env];
const models = [User, UserSession];

const sequelize = new Sequelize(config.url, config);

models.forEach((model) => {
  model.initModel(sequelize);
});

models.forEach((model) => {
  model.setupAssociations();
});

export { sequelize };
