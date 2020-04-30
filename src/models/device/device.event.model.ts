import {
  Sequelize, Model, DataTypes, BuildOptions,
} from 'sequelize';

export type ModelStatic = typeof Model & (new(values?: object, options?: BuildOptions) => Model);

export class DeviceEvent extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public deviceId!: number;
  public name!: string;
  public value!: number;
  public initiatedAt!: Date;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export const initModel = (sequelize: Sequelize) => {
  const tableName: string = 'device_events'

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
    }
  }, {
    sequelize,
    tableName: tableName,
  });
};
