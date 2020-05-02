/* eslint import/no-cycle: off */

import {
  Sequelize, Model, DataTypes, Association,
} from 'sequelize';
import { DeviceEvent } from './device/event.model';

export class Device extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public externalId!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly events?: DeviceEvent[];

  public static associations: {
    events: Association<Device, DeviceEvent>;
  };
}

export const initModel = (sequelize: Sequelize) => {
  const tableName: string = 'devices';

  Device.init({
    id: {
      type: DataTypes.INTEGER, // you can omit the `new` but this is discouraged
      autoIncrement: true,
      primaryKey: true,
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'external_id',
    },
    externalData: {
      type: DataTypes.JSONB,
      defaultValue: {},
      field: 'external_data',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
  }, {
    sequelize,
    tableName,
  });
};

export const setupAssociations = () => {
  Device.hasMany(DeviceEvent, { as: 'events' });
};
