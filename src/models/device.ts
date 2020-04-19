import {
  Sequelize, Model, DataTypes, BuildOptions,
} from 'sequelize';

class Device extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public externalId!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}
