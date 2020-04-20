import { Sequelize, Model } from 'sequelize';

export interface DbInterface {
  sequelize: Sequelize;
  Sequelize: any;
  Device: Model;
}
