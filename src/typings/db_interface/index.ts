import { Sequelize, Model, BuildOptions } from 'sequelize';
import { ModelStatic } from '../../models/device.model';

export interface DbInterface {
  sequelize: Sequelize;
  Sequelize: any;
}
