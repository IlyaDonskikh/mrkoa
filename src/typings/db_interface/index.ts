import { Sequelize } from 'sequelize';

export interface DbInterface {
  sequelize: Sequelize;
  Sequelize: any;
}
