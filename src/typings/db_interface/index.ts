import { Sequelize, Model, BuildOptions } from 'sequelize';

type ModelStatic = typeof Model & (new(values?: object, options?: BuildOptions) => Model);

export interface DbInterface {
  sequelize: Sequelize;
  Sequelize: any;
  Device: ModelStatic;
}
