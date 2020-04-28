import {
  Sequelize, Model, DataTypes, BuildOptions,
} from 'sequelize';

type ModelStatic = typeof Model & (new(values?: object, options?: BuildOptions) => Model);

export class Device extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public externalId!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export const initDevice = (sequelize: Sequelize): ModelStatic => {
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
    tableName: 'devices',
  });

  return Device;
};
