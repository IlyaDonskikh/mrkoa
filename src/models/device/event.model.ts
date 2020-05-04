/* eslint import/no-cycle: off */

import {
  Sequelize, Model, DataTypes, Association,
} from 'sequelize';

import { Device } from '../device.model';

export class DeviceEvent extends Model {
  public static timestampPaticleCode: string = 'LS';

  public static availableNames: Array<string> = ['AT', 'BT']; // List of particle event names

  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public deviceId!: number;

  public name!: string;

  public value!: number;

  public initiatedAt!: Date;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly device?: Device;

  // Associations
  public static associations: {
    device: Association<DeviceEvent, Device>;
  };

  // Scopes
  public static scopes = {
    filterByDeviceId(id) {
      return {
        include: [
          {
            model: Device,
            as: 'device',
            where: {
              id,
            },
          },
        ],
      };
    },
  };
}

export const initModel = (sequelize: Sequelize) => {
  const tableName: string = 'device_events';

  DeviceEvent.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    value: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    initiatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'initiated_at',
    },
    deviceId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'devices', key: 'id' },
      field: 'device_id',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    scopes: DeviceEvent.scopes,
    sequelize,
    tableName,
  });
};

export const setupAssociations = () => {
  DeviceEvent.belongsTo(Device, { foreignKey: 'device_id', as: 'device' });
};
