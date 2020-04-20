import { DataTypeAbstract } from 'sequelize';

type SequelizeAttribute = string | DataTypeAbstract;

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute
};
