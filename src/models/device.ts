import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { SequelizeAttributes } from '../typings/sequelize_attributes';

class Device extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public externalId!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export const initDevice = (sequelize: Sequelize): Model<any, any> => {
  const device =
    Device.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
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
      }
    }, {
      sequelize,
      tableName: 'devices',
    });

  return device;
};
